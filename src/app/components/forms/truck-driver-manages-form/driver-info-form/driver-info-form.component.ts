import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { GenericInputComponent } from '../../../shared/inputs/number-input/generic-input.component';

import { ToastService } from 'app/services/toast-service/toast.service';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/data/model/truck-driver-info.model';
import { ValidationSchema } from 'app/constants/validation-schema';

@Component({
  selector: 'app-driver-info-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    GenericInputComponent,
  ],
  templateUrl: './driver-info-form.component.html',
  styleUrl: './driver-info-form.component.scss',
})
export class DriverInfoFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private driverTruckManager = inject(Driver_TruckManagementService);

  driverForm: FormGroup;
  searchForm: FormGroup;

  loading = false;
  addonWidth = '8rem';

  passwordDialogVisible = false;
  driverUserNameDialog = '';
  driverNewPasswordDialog = '';

  constructor() {
    this.searchForm = this.fb.group({
      searchNationalId: ['', ValidationSchema.nationalId],
    });

    this.driverForm = this.fb.group({
      driverId: ['', ValidationSchema.driverId],
      nationalId: ['', ValidationSchema.nationalId],
      fullName: ['', ValidationSchema.fullName],
      mobile: ['', ValidationSchema.mobile],
      fatherName: ['', ValidationSchema.fatherName],
      licenseNumber: ['', ValidationSchema.licenseNumber],
      smartCard: ['', ValidationSchema.smartCard],
      address: [''],
    });
  }

  async updateDriverMobileNumber(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const driverId = this.driverId.value;
      const mobile = this.mobile.value;
      const response =
        await this.driverTruckManager.RegisterNew_EditDriverMobileNumber(
          driverId,
          mobile
        );

      if (!this.isSuccessful(response)) return;

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'شماره تلفن راننده تغییر یافت.'
      );
    } finally {
      this.loading = false;
    }
  }

  async loadDriverInfoFromAPI(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const nationalId = this.searchNationalId.value;
      const response = await this.driverTruckManager.GetDriverInfoFromAPI(
        nationalId
      );

      if (!this.isSuccessful(response)) return;

      this.populateDriverForm(response.data as TruckDriverInfo);
    } finally {
      this.loading = false;
    }
  }

  async resetDriverPassword(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const driverId = this.driverId.value;
      const response = await this.driverTruckManager.ResetDriverPassword(
        driverId
      );

      if (!this.isSuccessful(response)) return;

      const { Username, Password } = response.data!;
      this.showDialog(Username, Password);
    } catch {
      this.toast.error('خطا', 'در بازنشانی رمز عبور مشکلی پیش آمد.');
    } finally {
      this.loading = false;
    }
  }

  async activateDriverSms(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const driverId = this.driverId.value;
      const response = await this.driverTruckManager.ActivateDriverSMS(
        driverId
      );

      if (!this.isSuccessful(response)) return;

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'سیستم پیامک با موفقیت فعال شد.'
      );
    } catch {
      this.toast.error('خطا', 'در فعال‌سازی سیستم پیامک مشکلی پیش آمد.');
    } finally {
      this.loading = false;
    }
  }

  async sendWebsiteLink(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loading = true;
    try {
      const driverId = this.driverId.value;
      const response = await this.driverTruckManager.SendWebsiteLink(driverId);

      if (!this.isSuccessful(response)) return;

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'لینک ورود با موفقیت ارسال شد.'
      );
    } catch {
      this.toast.error('خطا', 'در ارسال لینک ورود مشکلی پیش آمد.');
    } finally {
      this.loading = false;
    }
  }

  copyToClipboard(text: string) {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
    navigator.clipboard.writeText(text);
  }

  onCloseDialog() {
    this.driverUserNameDialog = '';
    this.driverNewPasswordDialog = '';
  }

  populateDriverForm(driverInfo: TruckDriverInfo): void {
    this.driverForm.patchValue({
      driverId: driverInfo.DriverId ?? '',
      nationalId: driverInfo.NationalCode ?? '',
      fullName: driverInfo.NameFamily ?? '',
      mobile: driverInfo.MobileNumber ?? '',
      fatherName: driverInfo.FatherName ?? '',
      licenseNumber: driverInfo.DrivingLicenseNo ?? '',
      smartCard: driverInfo.SmartCardNo ?? '',
      address: driverInfo.Address ?? '',
    });
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

  private showDialog(username: string, password: string) {
    this.driverNewPasswordDialog = password;
    this.driverUserNameDialog = username;
    this.passwordDialogVisible = true;
  }

  // Form control getters
  get searchNationalId(): FormControl {
    return this.searchForm.get('searchNationalId') as FormControl;
  }

  get driverId(): FormControl {
    return this.driverForm.get('driverId') as FormControl;
  }

  get nationalId(): FormControl {
    return this.driverForm.get('nationalId') as FormControl;
  }

  get fullName(): FormControl {
    return this.driverForm.get('fullName') as FormControl;
  }

  get mobile(): FormControl {
    return this.driverForm.get('mobile') as FormControl;
  }

  get fatherName(): FormControl {
    return this.driverForm.get('fatherName') as FormControl;
  }

  get licenseNumber(): FormControl {
    return this.driverForm.get('licenseNumber') as FormControl;
  }

  get smartCard(): FormControl {
    return this.driverForm.get('smartCard') as FormControl;
  }

  get address(): FormControl {
    return this.driverForm.get('address') as FormControl;
  }
}
