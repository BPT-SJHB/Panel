import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { BaseLoading } from '../component-base/base-loading';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { WalletPaymentHistory } from 'app/services/wallet-management/model/wallet-payment-history.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';

@Component({
  selector: 'app-payment-record-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './wallet-payment-record-table.component.html',
  styleUrl: './wallet-payment-record-table.component.scss',
})
export class WalletPaymentRecordTableComponent
  extends BaseLoading
  implements OnViewActivated
{
  // 📥 Input signals for wallet type, wallet ID, and shared signal
  @Input() walletType = signal<'User' | 'Truck' | 'TruckerAssociation' | 'SMS' | 'None'>('None');
  @Input() walletId = signal<number | null>(null);
  @Input() shearedSignal = signal<number | null>(null);

  private readonly walletService = inject(WalletManagementService);

  // 📄 List of payment records
  readonly paymentHistory = signal<WalletPaymentHistory[]>([]);

  // 📊 Table column definitions
  readonly columns: ReadonlyArray<{ label: string; key: keyof WalletPaymentHistory }> = [
    { label: 'تاریخ', key: 'ShamsiDate' },
    { label: 'زمان', key: 'Time' },
    { label: 'مبلغ', key: 'Amount' },
    { label: 'کاربر', key: 'UserName' },
  ];

   // 🚀 Called when the component is activated (useful for view caching systems)
  onViewActivated(): void {
    // 🛠️ Set wallet ID from shared signal if available
    if (this.shearedSignal()) {
      this.walletId.set(this.shearedSignal());
    }
    this.initWalletAndData();
  }

  // 🧩 Fetch wallet ID (if needed) and then payment records
  private async initWalletAndData(): Promise<void> {
    if (!this.walletId()) {
      const walletId = await this.fetchWalletId();
      if (!walletId) return;
      this.walletId.set(walletId);
    }

    await this.fetchWalletTransactions();
  }

  // 🔎 Fetch wallet info and extract the wallet ID
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

  // 💰 Fetch payment transaction history based on wallet ID
  private async fetchWalletTransactions(): Promise<void> {
    if (!this.walletId()) return;

    try {
      this.loadingService.setLoading(true);
      const response = await this.walletService.GetWalletTransactions(this.walletId()!);
      if (!checkAndToastError(response, this.toast)) return;
      this.paymentHistory.set(response.data);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🔄 Choose appropriate API based on wallet type
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

  // 🧼 Wrapper for clarity
  private fetchWalletInfo(): Promise<ApiResponse<Wallet> | null> {
    return this.getWalletMethod();
  }
}
