import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenericInputComponent } from 'app/components/shared/inputs/number-input/generic-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/data/model/truck-driver-info.model';
import { TruckComposedInfo, TruckInfo } from 'app/data/model/truck-info.model';
import { Wallet } from 'app/data/model/wallet.model';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-driver-truck-wallet-form',
  imports: [ButtonModule, GenericInputComponent,ReactiveFormsModule],
  templateUrl: './driver-truck-wallet-form.component.html',
  styleUrl: './driver-truck-wallet-form.component.scss',
})
export class DriverTruckWalletFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private driverTruckManager = inject(Driver_TruckManagementService);

  addonWidth = '8rem';
  loading = false;

  mainSearchForm = this.fb.group({
    searchSmartCard: ['', ValidationSchema.smartCard],
  });

  truckComposedInfoForm = this.fb.group({
    truckId: ['', ValidationSchema.truckId],
    smartCard: ['', ValidationSchema.smartCard],
    licensePlateNumber: ['', ValidationSchema.licensePlateNumber],
    serialNumber:['',ValidationSchema.serialNumber],
    driverId: ['', ValidationSchema.driverId],
    nationalId: ['', ValidationSchema.nationalId],
    fullName: ['', ValidationSchema.fullName],
    turnId: [],
    turn: [],
    walletId: [],
    wallet: [],
  });

  // --- Public Methods ---

  async loadComposedForm() {
    if (this.mainSearchForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const truckInfo = await this.getTruckInfo(this.searchSmartCard.value);
      if (!truckInfo) return;

      const response = await this.driverTruckManager.GetComposedTruckInfo(
        truckInfo.TruckId
      );
      if (!this.isSuccessful(response)) return;

      this.populateComposedForm(response.data!);
    } finally {
      this.loading = false;
    }
  }

  async loadTruckInfo() {
    if (this.smartCard.invalid || this.loading) return;

    this.loading = true;
    try {
      const truckInfo = await this.getTruckInfo(this.smartCard.value);
      if (!truckInfo) return;

      this.populateTruckInfo(truckInfo);
    } finally {
      this.loading = false;
    }
  }

  async loadDriverInfo() {
    if (this.nationalId.invalid || this.loading) return;

    this.loading = true;
    try {
      const response = await this.driverTruckManager.GetDriverInfoFromAPI(
        this.nationalId.value
      );

      if (!this.isSuccessful(response)) return;

      this.populateDriverInfo(response.data!);
    } finally {
      this.loading = false;
    }
  }

  async setComposedInformation(): Promise<void> {
    if (this.nationalId.invalid || this.loading) return;

    this.loading = true;

    try {
      const { value: truckId } = this.truckId;
      const { value: driverId } = this.driverId;
      const { value: turnId } = this.turnId;
      const { value: walletId } = this.walletId;

      const response = await this.driverTruckManager.SetComposedTruckInfo(
        truckId,
        driverId,
        turnId,
        walletId
      );

      if (!this.isSuccessful(response)) return;

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'تغییرات با موفقیت ثبت شد.'
      );
    } finally {
      this.loading = false;
    }
  }

  async createNewWallet(): Promise<void> {
    const response = await this.driverTruckManager.GetVirtualWallet();
    if (!this.isSuccessful(response)) return;
    this.populateWalletInfo(response.data!);
  }

  // --- Private Methods ---

  private async getTruckInfo(smartCard: string): Promise<TruckInfo | null> {
    const response = await this.driverTruckManager.GetTruckInfoFromAPI(
      smartCard
    );
    if (!this.isSuccessful(response)) return null;
    return response.data!;
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error(
        'خطا',
        response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
      );
      return false;
    }
    return true;
  }

  private populateComposedForm(info: TruckComposedInfo) {
    this.populateTruckInfo(info.Truck);
    this.populateDriverInfo(info.TruckDriver!);
    this.populateWalletInfo(info.MoneyWallet!);
    this.turnId.setValue(info.Turn?.nEnterExitId);
    this.turn.setValue(info.Turn?.OtaghdarTurnNumber);
  }

  private populateTruckInfo(info: TruckInfo) {
    this.truckId.setValue(info.TruckId ?? -1);
    this.smartCard.setValue(info.SmartCardNo);
    this.licensePlateNumber.setValue(info.Pelak);
    this.serialNumber.setValue(info.Serial);
  }

  private populateDriverInfo(info?: TruckDriverInfo) {
    this.driverId.setValue(info?.DriverId ?? -1);
    this.fullName.setValue(info?.NameFamily);
    this.nationalId.setValue(info?.NationalCode);
  }

  private populateWalletInfo(info?: Wallet) {
    this.walletId.setValue(info?.MoneyWalletId ?? -1);
    this.wallet.setValue(info?.MoneyWalletCode);
  }

  // --- Form Control Getters ---
  get searchSmartCard(): FormControl {
    return this.mainSearchForm.get('searchSmartCard') as FormControl;
  }

  get truckId(): FormControl {
    return this.truckComposedInfoForm.get('truckId') as FormControl;
  }

  get smartCard(): FormControl {
    return this.truckComposedInfoForm.get('smartCard') as FormControl;
  }

  get licensePlateNumber(): FormControl {
    return this.truckComposedInfoForm.get('licensePlateNumber') as FormControl;
  }

  get serialNumber(): FormControl {
    return this.truckComposedInfoForm.get('serialNumber') as FormControl;
  }


  get driverId(): FormControl {
    return this.truckComposedInfoForm.get('driverId') as FormControl;
  }

  get nationalId(): FormControl {
    return this.truckComposedInfoForm.get('nationalId') as FormControl;
  }

  get fullName(): FormControl {
    return this.truckComposedInfoForm.get('fullName') as FormControl;
  }

  get turn(): FormControl {
    return this.truckComposedInfoForm.get('turn') as FormControl;
  }

  get turnId(): FormControl {
    return this.truckComposedInfoForm.get('turnId') as FormControl;
  }

  get walletId(): FormControl {
    return this.truckComposedInfoForm.get('walletId') as FormControl;
  }

  get wallet(): FormControl {
    return this.truckComposedInfoForm.get('wallet') as FormControl;
  }
}
