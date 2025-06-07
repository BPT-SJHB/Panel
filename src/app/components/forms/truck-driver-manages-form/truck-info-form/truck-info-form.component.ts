import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

import { ValidationSchema } from 'app/constants/validation-schema';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckInfo } from 'app/data/model/truck-info.model';
import { TruckNativenessInfo } from 'app/data/model/truck-nativeness-info.model';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';

import { GenericInputComponent } from 'app/components/shared/inputs/number-input/generic-input.component';

@Component({
  selector: 'app-truck-info-form',
  templateUrl: './truck-info-form.component.html',
  styleUrl: './truck-info-form.component.scss',
  imports: [
    NgPersianDatepickerModule,
    ButtonModule,
    ReactiveFormsModule,
    GenericInputComponent,
  ],
})
export class TruckInfoFormComponent {

  private fb = inject(FormBuilder);
  private truckService = inject(Driver_TruckManagementService);
  private toast = inject(ToastService);

  loading = false;
  addonWidth = '8rem';

  searchForm: FormGroup = this.fb.group({
    searchSmartCard: ['', ValidationSchema.smartCard],
  });

  truckInfoForm: FormGroup = this.fb.group({
    truckId: ['', ValidationSchema.truckId],
    licensePlateNumber: ['', ValidationSchema.licensePlateNumber],
    serialNumber: ['', ValidationSchema.serialNumber],
    smartCard: ['', ValidationSchema.smartCard],
    loaderType: ['', ValidationSchema.loaderType],
  });

  truckNativenessForm: FormGroup = this.fb.group({
    nativeness: ['', ValidationSchema.nativeness],
    truckNativenessExpiredDate: [Date.now(), ValidationSchema.truckNativenessExpiredDate],
  });


  async loadFormsInformation():Promise<void>{
    await this.loadTruckInfoFromAPI();
    await this.loadNativenessForm();
  }

  async loadTruckInfoFromAPI(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;

    try {
      this.loading = true;
      const response = await this.truckService.GetTruckInfoFromAPI(this.searchSmartCard.value);
      if (this.isSuccessful(response)) {
        this.populateTruckInfoForm(response.data!);
      }
    }  finally {
      this.loading = false;
    }
  }

  async loadNativenessForm(): Promise<void> {
    if (this.truckId.invalid  || this.loading) return;

    try {
      this.loading = true;
      const response = await this.truckService.GetTruckNativeness(this.truckId.value);
      if (!this.isSuccessful(response)) return;

      this.populateTruckNativenessForm(response.data!);

    } finally {
      this.loading = false;
    }
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
      return false;
    }
    return true;
  }

 async changeNativeness():Promise<void> {
    if (this.truckNativenessForm.invalid || this.loading) return;

    try {
      this.loading = true;

      const response = await this.truckService.ChangeTruckNativeness(this.truckId.value,this.truckNativenessExpiredDate.value);

      if (this.isSuccessful(response)) {
        this.populateTruckNativenessForm(response.data!);
      }
    } finally {
      this.loading = false;
    }

  }

  populateTruckInfoForm(truck: TruckInfo): void {
    this.truckInfoForm.patchValue({
      truckId: truck.TruckId ?? '',
      licensePlateNumber: truck.Pelak ?? '',
      serialNumber: truck.Serial ?? '',
      smartCard: truck.SmartCardNo ?? '',
      loaderType: truck.LoaderTypeId ?? '',
    });
  }

  populateTruckNativenessForm(info: TruckNativenessInfo): void {
    this.truckNativenessForm.patchValue({
      nativeness: info.TruckNativenessTypeTitle ?? '',
      truckNativenessExpiredDate: info.TruckNativenessExpireDate ?? '',
    });
  }

  getTruckInfoFromForm(): TruckInfo {
    return {
      TruckId: this.truckId.value ?? null,
      Pelak: this.licensePlateNumber.value ?? null,
      Serial: this.serialNumber.value ?? null,
      SmartCardNo: this.smartCard.value ?? null,
      LoaderTypeId: this.loaderType.value ?? null,
    };
  }

  getTruckNativenessInfoFromForm(): TruckNativenessInfo {
    return {
      TruckNativenessTypeTitle: this.nativeness.value ?? null,
      TruckNativenessExpireDate: this.truckNativenessExpiredDate.value ?? null,
    };
  }

  // Form Control Getters
  get searchSmartCard():FormControl {
    return this.searchForm.get('searchSmartCard') as FormControl;
  }

  get truckId(): FormControl {
    return this.truckInfoForm.get('truckId') as FormControl;
  }

  get licensePlateNumber(): FormControl {
    return this.truckInfoForm.get('licensePlateNumber') as FormControl;
  }

  get serialNumber(): FormControl {
    return this.truckInfoForm.get('serialNumber') as FormControl;
  }

  get smartCard(): FormControl {
    return this.truckInfoForm.get('smartCard') as FormControl;
  }

  get loaderType(): FormControl {
    return this.truckInfoForm.get('loaderType') as FormControl;
  }

  get nativeness(): FormControl {
    return this.truckNativenessForm.get('nativeness') as FormControl;
  }

  get truckNativenessExpiredDate(): FormControl {
    return this.truckNativenessForm.get('truckNativenessExpiredDate') as FormControl;
  }
}
