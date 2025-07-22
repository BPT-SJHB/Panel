import { Component, effect, inject, Input, signal } from '@angular/core';

import { TableModule } from 'primeng/table';

import { BaseLoading } from '../component-base/base-loading';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { WalletTransaction } from 'app/services/wallet-management/model/wallet-transaction.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';

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
    ['black', 'surface-300'],
    ['white', 'surface-0'],
    ['red', 'bg-red-300'],
    ['green', 'bg-green-300'],
    ['yellow', 'bg-yellow-300'],
    ['blue', 'bg-blue-300'],
    ['orange', 'bg-orange-100'],
    ['purple', 'bg-purple-100'],
    ['pink', 'bg-pink-100'],
    ['brown', 'bg--surface-200'],
    ['gray', 'bg-surface-100'],
    ['cyan', 'bg-cyan-100'],
    ['lime', 'bg-lime-100'],
    ['teal', 'bg-teal-100'],
    ['indigo', 'bg-indigo-100'],
  ]);

  // 🎨 Get color class based on transaction color
  getRowColor(color: string): string {
    return this.colorMap.get(color.toLowerCase()) ?? 'surface-300';
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
        this.walletId()!
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
