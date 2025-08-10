import { Component, effect, inject, Input, signal } from '@angular/core';

import { TableModule } from 'primeng/table';

import { BaseLoading } from '../component-base/base-loading';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { WalletTransaction } from 'app/services/wallet-management/model/wallet-transaction.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { TableConfig } from 'app/constants/ui/table.ui';

@Component({
  selector: 'app-wallet-transactions-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './wallet-transactions-table.component.html',
  styleUrl: './wallet-transactions-table.component.scss',
})
export class WalletTransactionsTableComponent
  extends BaseLoading
  implements OnViewActivated
{
  // 📦 Input signals to determine wallet type, ID, and optionally get ID from shared signal
  @Input() walletType = signal<
    | 'User'
    | 'TransportCompony'
    | 'Truck'
    | 'TruckerAssociation'
    | 'SMS'
    | 'None'
  >('None');
  @Input() walletId = signal<number | null>(null);
  @Input() shearedSignal = signal<number | null>(null);

  private readonly walletService = inject(WalletManagementService);

  // 🔁 Transaction list
  readonly transactions = signal<WalletTransaction[]>([]);
  tableUi = TableConfig;
  // 📊 Table column definitions
  readonly columns: ReadonlyArray<{
    label: string;
    key: keyof WalletTransaction;
  }> = [
    { label: 'تراکنش', key: 'TransactionTitle' },
    { label: 'تاریخ', key: 'ShamsiDate' },
    { label: 'زمان', key: 'Time' },
    { label: 'موجودی', key: 'CurrentBalance' },
    { label: 'مبلغ', key: 'Amount' },
    { label: 'باقیمانده', key: 'Reminder' },
    { label: 'کاربر', key: 'UserName' },
  ];

  // 🎨 Background color mapping for transaction rows

  readonly colorMap: ReadonlyMap<string, string> = new Map([
    ['black', 'bg-black text-white'],
    ['white', 'bg-white text-black'],
    ['red', 'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100'],
    [
      'green',
      'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100',
    ],
    [
      'yellow',
      'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100',
    ],
    ['blue', 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100'],
    [
      'orange',
      'bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-orange-100',
    ],
    [
      'purple',
      'bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-100',
    ],
    ['pink', 'bg-pink-100 dark:bg-pink-600 text-pink-800 dark:text-pink-100'],
    [
      'brown',
      'bg-amber-100 dark:bg-amber-700 text-amber-800 dark:text-amber-100',
    ],
    ['gray', 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'],
    ['cyan', 'bg-cyan-100 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-100'],
    ['lime', 'bg-lime-100 dark:bg-lime-700 text-lime-800 dark:text-lime-100'],
    ['teal', 'bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-100'],
    [
      'indigo',
      'bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100',
    ],
  ]);

  // 🎨 Get color class based on transaction color
  getRowColor(color: string): string {
    return (
      this.colorMap.get(color.toLowerCase()) ??
      'bg-surface-300 dark:bg-surface-500'
    );
  }

  // 🔁 Called when component is activated (used in cached/dynamic views)
  onViewActivated() {
    // If there's a shared signal passed in, use that for wallet ID
    if (this.shearedSignal()) {
      this.walletId.set(this.shearedSignal());
    }

    this.initWalletAndTransactions();
  }

  // 📥 Initialize wallet ID (if needed) and fetch transactions
  private async initWalletAndTransactions(): Promise<void> {
    if (!this.walletId()) {
      const walletId = await this.fetchWalletId();
      if (!walletId) return;
      this.walletId.set(walletId);
    }
    await this.fetchTransactions();
  }

  // 🔍 Try to fetch wallet info and extract the ID
  private async fetchWalletId(): Promise<number | undefined> {
    try {
      this.loadingService.setLoading(true);
      const response = await this.fetchWalletInfo();
      if (!response || !checkAndToastError(response, this.toast)) return;
      return response.data.MoneyWalletId;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 📄 Fetch wallet transactions using the ID
  private async fetchTransactions(): Promise<void> {
    if (!this.walletId()) return;

    try {
      this.loadingService.setLoading(true);
      const response = await this.walletService.GetWalletTransactions(
        this.walletId()!,
      );
      if (!checkAndToastError(response, this.toast)) {
        this.transactions.set([]);
        return;
      }
      this.transactions.set(response.data);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🔀 Decide which service method to call based on wallet type
  private getWalletMethod(): Promise<ApiResponse<Wallet> | null> {
    switch (this.walletType()) {
      case 'User':
        return this.walletService.GetUserWalletInfo();
      case 'TruckerAssociation':
        return this.walletService.GetTruckerAssociationWalletInfo();
      case 'SMS':
        return this.walletService.GetSmsWalletInfo();
      default:
        return Promise.resolve(null);
    }
  }

  // 📦 Wrapper for fetching wallet info with clear naming
  private fetchWalletInfo(): Promise<ApiResponse<Wallet> | null> {
    return this.getWalletMethod();
  }
}
