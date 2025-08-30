import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { TransportCompaniesManagementService } from 'app/services/transport-company-management/transport-companies-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { BaseLoading } from '../shared/component-base/base-loading';

import { WalletPaymentFormComponent } from '../wallet-payment-form/wallet-payment-form.component';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { TransportCompany } from 'app/services/transport-company-management/model/transport-company-info.model';

@Component({
  selector: 'app-transport-companies-wallet-payment-form',
  standalone: true,
  imports: [WalletPaymentFormComponent, SearchAutoCompleteComponent],
  templateUrl: './transport-companies-wallet-payment-form.component.html',
  styleUrl: './transport-companies-wallet-payment-form.component.scss',
})
export class TransportCompaniesWalletPaymentFormComponent extends BaseLoading {
  // --- Inputs ---
  @Input() readonly sharedSignal!: WritableSignal<number | null>;

  // --- Services & Signals ---
  private transportComponyService = inject(TransportCompaniesManagementService);
  readonly walletType = signal<'TransportCompony'>('TransportCompony');
  readonly transportComponyId = signal<number | null>(null);

  // --- Methods ---
  // Search transport companies for autocomplete
  searchTransportCompony = async (query: string) => {
    const response =
      await this.transportComponyService.GetTransportCompaniesInfo(query);
    if (!checkAndToastError(response, this.toast)) return [];
    return response.data;
  };

  // Set selected transport company ID
  async onTransportComponySelect(tcInfo: TransportCompany) {
    this.transportComponyId.set(tcInfo.TCId);
  }
}
