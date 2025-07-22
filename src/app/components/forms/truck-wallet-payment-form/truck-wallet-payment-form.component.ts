import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

// Validation schema for form inputs
import { ValidationSchema } from 'app/constants/validation-schema';

// Services for truck and wallet data handling
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { WalletManagementService } from 'app/services/wallet-management/wallet-management.service';

// Utilities
import { checkAndToastError } from 'app/utils/api-utils';

// Base class for loading state handling
import { BaseLoading } from '../shared/component-base/base-loading';

// Models
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';

// Shared UI components
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { WalletPaymentFormComponent } from '../wallet-payment-form/wallet-payment-form.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';

@Component({
  selector: 'app-truck-wallet-payment-form',
  standalone: true,
  imports: [
    SearchInputComponent,
    WalletPaymentFormComponent,
    TextInputComponent,
  ],
  templateUrl: './truck-wallet-payment-form.component.html',
  styleUrl: './truck-wallet-payment-form.component.scss',
})
export class TruckWalletPaymentFormComponent extends BaseLoading {
  @Input() readonly shearedSignal: any;
  // Injected services and utilities
  private fb = inject(FormBuilder);
  private truckService = inject(Driver_TruckManagementService);

  // Signals for wallet info
  readonly truckId = signal<number | null>(null);
  readonly walletType = signal<'Truck'>('Truck');

  // Reactive form for searching truck by Smart Card, ID, or License Plate
  private searchTruckForm = this.fb.group({
    Smart: ['', ValidationSchema.smartCard],
    TruckId: new FormControl<number | null>(null),
    LicensePlate: [''],
  });
  // Public method to search a truck by user query (SmartCard number or license plate)
  searchTruck = async (query: string) => {
    try {
      this.loadingService.setLoading(true);
      const response = await this.truckService.GetTruckInfoFromAPI(query);

      // Show error if API fails
      if (!checkAndToastError(response, this.toast)) {
        this.resetForms();
        return;
      }

      // Populate form with truck data
      this.populateTruckForm(response.data);

      // Fetch and assign wallet info
      this.truckId.set(response.data.TruckId);
    } finally {
      this.loadingService.setLoading(false);
    }
  };

  // Populate the search form with truck data
  private populateTruckForm(truck: TruckInfo) {
    this.searchTruckForm.patchValue({
      TruckId: truck.TruckId,
      LicensePlate: truck.Pelak,
      Smart: truck.SmartCardNo,
    });
  }


  // Reset wallet signal and form values
  private resetForms() {
    this.TruckId.reset(null);
    this.LicensePlate.reset('');
  }

  // Getters for form controls (typed for clarity and ease of use)
  get Smart() {
    return this.searchTruckForm.get('Smart') as FormControl<string>;
  }

  get TruckId() {
    return this.searchTruckForm.get('TruckId') as FormControl<number | null>;
  }

  get LicensePlate() {
    return this.searchTruckForm.get('LicensePlate') as FormControl<string>;
  }
}
