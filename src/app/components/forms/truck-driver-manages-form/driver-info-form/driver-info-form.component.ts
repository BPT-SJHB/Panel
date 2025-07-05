import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextInputComponent } from '../../../shared/inputs/text-input/text-input.component';

import { ToastService } from 'app/services/toast-service/toast.service';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/data/model/truck-driver-info.model';
import { ValidationSchema } from 'app/constants/validation-schema';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { Subject, takeUntil } from 'rxjs';
import { SearchInputComponent } from '../../../shared/inputs/search-input/search-input.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';

@Component({
  selector: 'app-driver-info-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    TextInputComponent,
    SearchInputComponent,
  ],
  providers:[DialogService],
  templateUrl: './driver-info-form.component.html',
  styleUrl: './driver-info-form.component.scss',
})
export class DriverInfoFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private driverTruckManager = inject(Driver_TruckManagementService);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();
  private dialogService = inject(DialogService);
  driverForm: FormGroup;
  searchForm: FormGroup;

  loading = false;
  addonWidth = '8rem';

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

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

    this.loadingService.setLoading(true);
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
      this.loadingService.setLoading(false);
    }
  }

  loadDriverInfoFromAPI: (query: string) => Promise<TruckDriverInfo | null> =
    async (nationalId) => {
      if (this.searchForm.invalid || this.loading) return null;

      this.loadingService.setLoading(true);
      try {
        const response = await this.driverTruckManager.GetDriverInfoFromAPI(
          nationalId
        );

        if (!this.isSuccessful(response)) return null;
        return response.data!;
      } finally {
        this.loadingService.setLoading(false);
      }
    };

  onSearchDriver(driver: TruckDriverInfo[]) {
    if (driver.length === 0) return;
    this.populateDriverForm(driver[0]);
  }

  async resetDriverPassword(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const driverId = this.driverId.value;
      const response = await this.driverTruckManager.ResetDriverPassword(
        driverId
      );

      if (!this.isSuccessful(response)) return;

      const { Username, Password } = response.data!;
      console.log(Username);
      
      this.showNewPasswordDialog(Username, Password);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async activateDriverSms(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
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
      this.loadingService.setLoading(false);
    }
  }

  async sendWebsiteLink(): Promise<void> {
    if (this.driverForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
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
      this.loadingService.setLoading(false);
    }
  }

  copyToClipboard(text: string) {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
    navigator.clipboard.writeText(text);
  }

  // Open dialog showing new username and password
  private showNewPasswordDialog(username: string, password: string): void {
    this.dialogService.open(NewPasswordDialogComponent, {
      header: 'رمز عبور جدید',
      width: '20rem',
      modal: true,
      inputValues: { username, password },
    });
  }

  private populateDriverForm(driverInfo: TruckDriverInfo): void {
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
