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

  passwordDialogVisible = false;
  driverUserNameDialog = '';
  driverNewPasswordDialog = '';
  addonWidth = '8rem';

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
      address: ['', []],
    });
  }

  async updateDriverMobileNumber(): Promise<void> {
    console.log('click');

    if (this.driverForm.invalid || this.loading) return;
    this.loading = true;

    try {
      const driverInfo = this.getDriverInfoFromForm();
      const response =
        await this.driverTruckManager.RegisterNew_EditDriverMobileNumber(
          driverInfo.DriverId,
          driverInfo.MobileNumber!
        );

      if (!this.isSuccessful(response)) return;
      console.log(response.data);

      this.toast.success(
        'موفق',
        response.data?.Message ?? 'شماره تلفن راننده  تغییر یافت.'
      );
    } catch {
      this.toast.error('خطا', 'در بروزرسانی شماره همراه راننده مشکلی پیش آمد.');
    } finally {
      this.loading = false;
    }
  }

  async loadDriverInfoFromOutdoorApi(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;
    this.loading = true;

    try {
      const response = await this.driverTruckManager.GetDriverInfoFromAPI(
        this.searchNationalId.value
      );

      if (!this.isSuccessful(response)) return;
      this.populateDriverForm(response.data as TruckDriverInfo);
    } catch {
      this.toast.error(
        'خطا',
        'در دریافت اطلاعات از سامانه بیرونی مشکلی پیش آمد.'
      );
    } finally {
      this.loading = false;
    }
  }

  async loadDriverInfoFromLocalApi(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;
    this.loading = true;

    try {
      const response = await this.driverTruckManager.GetDriverInfoFromAPI(
        this.searchNationalId.value
      );

      if (!this.isSuccessful(response)) return;
      this.populateDriverForm(response.data as TruckDriverInfo);
    } catch {
      this.toast.error(
        'خطا',
        'در دریافت اطلاعات از سامانه محلی مشکلی پیش آمد.'
      );
    } finally {
      this.loading = false;
    }
  }

  async resetDriverPassword(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;
    this.loading = true;

    try {
      const driverInfo = this.getDriverInfoFromForm();
      const response = await this.driverTruckManager.ResetDriverPassword(
        driverInfo.DriverId
      );

      if (!this.isSuccessful(response)) return;

      this.driverNewPasswordDialog = response.data?.Password ?? '';
      this.driverUserNameDialog = response.data?.Username ?? '';
      this.passwordDialogVisible = true;
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
      const driverInfo = this.getDriverInfoFromForm();
      const response = await this.driverTruckManager.ActivateDriverSMS(
        driverInfo.DriverId
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
      const driverInfo = this.getDriverInfoFromForm();
      const response = await this.driverTruckManager.SendWebsiteLink(
        driverInfo.DriverId
      );

      if (!this.isSuccessful(response)) return;
      this.toast.success(
        'موفق',
        response.data?.Message ?? 'لینک سامانه با موفقیت ارسال شد.'
      );
    } catch {
      this.toast.error('خطا', 'در ارسال لینک سامانه مشکلی پیش آمد.');
    } finally {
      this.loading = false;
    }
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

  private populateDriverForm(data: TruckDriverInfo): void {
    this.driverForm.patchValue({
      driverId: data.DriverId ?? '',
      nationalId: data.NationalCode ?? '',
      fullName: data.NameFamily ?? '',
      mobile: data.MobileNumber ?? '',
      fatherName: data.FatherName ?? '',
      licenseNumber: data.DrivingLicenseNo ?? '',
      smartCard: data.SmartCardNo ?? '',
      address: data.Address ?? '',
    });
  }

  private getDriverInfoFromForm(): TruckDriverInfo {
    const formValue = this.driverForm.value;

    return {
      DriverId: formValue.driverId || null,
      NationalCode: formValue.nationalId || null,
      NameFamily: formValue.fullName || null,
      MobileNumber: formValue.mobile || null,
      FatherName: formValue.fatherName || null,
      DrivingLicenseNo: formValue.licenseNumber || null,
      SmartCardNo: formValue.smartCard || null,
      Address: formValue.address || null,
    };
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

  get searchNationalId(): FormControl {
    return this.searchForm.get('searchNationalId') as FormControl;
  }

  onCloseDialog(): void {
    this.driverNewPasswordDialog = '';
    this.driverUserNameDialog = '';
  }

  copyToClipboard(text: string): void {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
    navigator.clipboard.writeText(text);
  }
}
