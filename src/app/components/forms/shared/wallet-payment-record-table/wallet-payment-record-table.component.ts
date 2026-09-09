import { Component, inject, Input, signal } from '@angular/core';

import { BaseLoading } from '../component-base/base-loading';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { WalletPaymentHistory } from 'app/services/wallet-management/model/wallet-payment-history.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';

@Component({
  selector: 'app-payment-record-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './wallet-payment-record-table.component.html',
  styleUrl: './wallet-payment-record-table.component.scss',
})
export class WalletPaymentRecordTableComponent
  extends BaseLoading
  implements OnViewActivated
{
  // 📥 Input signals for wallet type, wallet ID, and shared signal
  @Input() walletType = signal<
    'User' | 'Truck' | 'TruckerAssociation' | 'SMS' | 'None'
  >('None');
  @Input() walletId = signal<number | null>(null);
  @Input() sharedSignal = signal<number | null>(null);

  private readonly walletService = inject(WalletManagementService);

  // 📄 List of payment records
  readonly paymentHistory = signal<WalletPaymentHistory[]>([]);
  readonly tableUi = TableConfig;

  // 📊 Table column definitions
  readonly columns: TableColumn<WalletPaymentHistory>[] = [
    {
      field: 'ShamsiDate',
      header: 'تاریخ',
    },
    {
      field: 'Time',
      header: 'زمان',
    },
    {
      field: 'Amount',
      header: 'ملبغ(ریال)',
      format: 'currency',
    },
    {
      field: 'UserName',
      header: 'کاربر',
    },
  ];

  // 🚀 Called when the component is activated (useful for view caching systems)
  onViewActivated(): void {
    // 🛠️ Set wallet ID from shared signal if available
    if (this.sharedSignal()) {
      this.walletId.set(this.sharedSignal());
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

      let response;
      if (this.walletType() === 'User') {
        response = await this.walletService.GetMyWalletPaymentRecords();
      } else {
        response = await this.walletService.GetWalletPaymentRecords(
          this.walletId()!
        );
      }

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
