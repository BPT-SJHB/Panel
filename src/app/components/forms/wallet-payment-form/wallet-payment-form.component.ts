import { Component, effect, inject, Input, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';

import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { BaseLoading } from '../shared/component-base/base-loading';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';
import { WalletDefaultAmount } from 'app/services/wallet-management/model/wallet-default-amount.model';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { ButtonComponent } from "app/components/shared/button/button.component";

@Component({
  selector: 'app-wallet-payment-form',
  standalone: true,
  imports: [CardModule, TextInputComponent, ButtonComponent],
  templateUrl: './wallet-payment-form.component.html',
  styleUrl: './wallet-payment-form.component.scss',
})
export class WalletPaymentFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  // 📥 Input: type of wallet to load info for
  @Input() walletType = signal<
    | 'User'
    | 'Truck'
    | 'TruckerAssociation'
    | 'SMS'
    | 'TransportCompony'
    | 'None'
  >('None');

  @Input() walletId = signal<number | null>(null);
  @Input() truckId = signal<number | null>(null);
  @Input() transportComponyId = signal<number | null>(null);

  // sharedWalletId
  @Input() shearedSignal = signal<number | null>(null);

  // 🛠 Services
  private readonly walletService = inject(WalletManagementService);

  // 📝 Form Controls
  readonly amount = new FormControl<number | null>(null, [
    Validators.required,
    Validators.pattern(/^[0-9]+$/),
    Validators.min(1000),
    Validators.max(300000),
  ]);

  // 📊 Reactive State Signals
  readonly defaultAmounts = signal<WalletDefaultAmount[]>([]);
  readonly userWallet = signal<Wallet | null>(null);

  constructor() {
    effect(() => {
      this.shearedSignal.set(this.walletId());
      if (!this.truckId() && !this.transportComponyId()) return;
      this.onViewActivated();
    });
    super();
  }

  override ngOnInit(): void {
    this.loadDefaultPaymentAmounts();
  }

  onViewActivated() {
    this.loadWalletDetails();
  }

  // 🔎 Fetch predefined default payment amounts
  private async loadDefaultPaymentAmounts(): Promise<void> {
    try {
      this.loadingService.setLoading(true);
      const response = await this.walletService.GetWalletDefaultAmounts();
      if (!checkAndToastError(response, this.toast)) return;

      this.defaultAmounts.set(
        response.data.map((amount) => ({
          Amount: amount.Amount,
          AmountTitle: amount.Amount.toLocaleString(),
        }))
      );
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🧾 Fetch wallet details based on walletType
  private async loadWalletDetails(): Promise<void> {
    try {
      this.loadingService.setLoading(true);
      const response = await this.fetchWalletInfo();
      if (!response || !checkAndToastError(response, this.toast)) return;
      this.shearedSignal.set(response.data.MoneyWalletId);
      this.userWallet.set(response.data);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🔄 Refresh wallet balance (e.g. after payment)
  async refreshWalletBalance(): Promise<void> {
    const walletId = this.userWallet()?.MoneyWalletId;
    if (!walletId) return;
    try {
      this.loadingService.setLoading(true);
      const response = await this.walletService.GetWalletBalance(walletId);
      if (!checkAndToastError(response, this.toast)) return;
      this.userWallet.update((wallet) => ({
        ...wallet!,
        Balance: response.data.Balance,
      }));
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 💰 Trigger a payment request and open the payment URI
  async paymentMoney(): Promise<void> {
    if (this.amount.invalid) return;

    try {
      this.loadingService.setLoading(true);
      const response = await this.walletService.SendPaymentRequest(
        this.amount.value!
      );
      if (!checkAndToastError(response, this.toast)) return;

      const url = response.data.PaymentURI + response.data.Authority;
      this.redirectToWithNoHeader(url);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private redirectToWithNoHeader(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.rel = 'noreferrer';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 🔄 Select wallet info fetching method based on walletType
  private getWalletMethod(): Promise<ApiResponse<Wallet> | null> {
    switch (this.walletType()) {
      case 'User':
        return this.walletService.GetUserWalletInfo();

      case 'Truck':
        const truckId = this.truckId();
        if (!truckId) return Promise.resolve(null);
        return this.walletService.GetTruckWalletInfo(truckId);

      case 'TransportCompony':
        const transportComponyId = this.transportComponyId();
        
        if (!transportComponyId) return Promise.resolve(null);
        return this.walletService.GetTransportCompanyWallet(transportComponyId);

      case 'TruckerAssociation':
        return this.walletService.GetTruckerAssociationWalletInfo();

      case 'SMS':
        return this.walletService.GetSmsWalletInfo();

      default:
        return Promise.resolve(null);
    }
  }

  // Wrapper to maintain naming clarity
  private fetchWalletInfo(): Promise<ApiResponse<Wallet> | null> {
    return this.getWalletMethod();
  }
}
