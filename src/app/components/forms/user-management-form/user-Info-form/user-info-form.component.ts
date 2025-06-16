import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { DialogModule } from 'primeng/dialog';
import { ValidationSchema } from 'app/constants/validation-schema';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectInputComponent,
    BinaryRadioInputComponent,
    DialogModule,
    TextInputComponent
  ],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.scss'
})
export class UserInfoFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private userManager: UserManagementService = inject(UserManagementService);
  private toast: ToastService = inject(ToastService);
  private loadingService = inject(LoadingService);
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
    this.loadUserTypes();
  }

  userInfoForm: FormGroup;
  searchForm: FormGroup;
  loading = false;
  roles: { label: string; value: number }[] = [];

  passwordDialogVisible: boolean = false;
  userNameDialog = "";
  newUserPasswordDialog = "";


  constructor() {
    this.searchForm = this.fb.group({
      searchPhone: ['',ValidationSchema.mobile]
    })

    this.userInfoForm = this.fb.group({
      id: ['0', ValidationSchema.id],
      phone: ['',ValidationSchema.mobile],
      name: ['', ValidationSchema.fullName],
      userType: [0],
      smsActive: [false],
      userActive: [true],
    });
  }

  async loadUserTypes(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      const response = await this.userManager.GetUserTypes();
      if (!this.isSuccessful(response)) return;

      this.roles = response.data?.map(type => ({
        value: type.UTId,
        label: type.UTTitle,
      })) ?? [];
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async fetchUserByPhone(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const response = await this.userManager.GetSoftwareUserInfo(this.searchPhone.value);
      if (!this.isSuccessful(response)) return;

      this.populateForm(response.data!);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async activateUserSms(): Promise<void> {
    if (this.id.value == '0' || this.smsActive.invalid || this.smsActive.value || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const response = await this.userManager.ActivateUserSMS(this.id.value);
      if (!this.isSuccessful(response)) return;
      this.smsActive.setValue(true);
      this.toast.success('موفق', response.data?.Message ?? 'عملیات موفق آمیز بود.');
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async resetUserPassword(): Promise<void> {
    if (this.id.value == '0' || this.loading)
      return;

    this.loadingService.setLoading(true);
    try {
      const response = await this.userManager.ResetSoftwareUserPassword(this.id.value);
      if (!this.isSuccessful(response)) return;

      const { Username, Password } = response.data!;
      this.toast.success('موفق', `رمز عبور کاربر ${Username} تغییر یافت.`);

      this.userNameDialog = Username;
      this.newUserPasswordDialog = Password;
      this.passwordDialogVisible = true;

    } finally {
      this.loadingService.setLoading(false);
    }

  }

  async registerUser(): Promise<void> {
    if (this.loading)
      return;

    this.id.setValue('0');
    if (this.userInfoForm.invalid) {
      this.id.setValue('');
      return;
    }

    this.loadingService.setLoading(true);
    try {
      const user = this.getSoftwareUser();
      const response = await this.userManager.RegisterNewSoftwareUser({ ...user, UserId: this.id.value });
      if (!this.isSuccessful(response)) return;

      this.toast.success('موفق', 'کاربر با موفقیت ثبت شد.');
      const softwareUser = this.getSoftwareUser();

      this.resetUserInfoForm();
      this.resetSearchFrom();

      this.populateForm({ ...softwareUser, UserId: response.data?.UserId ?? 0 });
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async updateUserInfo(): Promise<void> {
    if (this.userInfoForm.invalid || this.loading) return;

    const userInfo: SoftwareUserInfo = this.getSoftwareUser();

    this.loading = true;
    try {
      const response = await this.userManager.EditSoftwareUser(userInfo);
      if (!response.success) {
        this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
        return;
      }

      this.toast.success('موفق', 'ویرایش کاربر با موفقیت انجام شد.');
    } finally {
      this.loading = false;
    }
  }

  async sendWebsiteLink() {
    if (this.id.value == '0') {
      return;
    }
    this.loading = true;
    try {
      const response = await this.userManager.SendWebsiteLink(this.id.value);
      if (!response.success) {
        this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
        return;
      }

      this.toast.success('موفق', response.data?.Message ?? 'لینک سامانه با موفقیت ارسال گردید');
    } finally {
      this.loading = false;
    }

  }

  private getSoftwareUser(): SoftwareUserInfo {
    return {
      UserId: parseInt(this.id.value, 10),
      MobileNumber: this.phone.value,
      UserName: this.name.value,
      UserTypeId: this.userType.value,
      SMSOwnerActive: this.smsActive.value,
      UserActive: this.userActive.value,
    };
  }


  async submitUserInfo(): Promise<void> {
    if (this.id.value == '0') {
      await this.registerUser();
    } else {
      await this.updateUserInfo();
    }
  }

  resetUserInfoForm() {
    this.userInfoForm.reset();
    this.userInfoForm.markAsPristine();
    this.userInfoForm.markAsUntouched();

    this.userType.setValue(0);
    this.id.setValue('0');
    this.smsActive.setValue(false);
    this.userActive.setValue(true);
  }

  resetSearchFrom() {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
  }

  copyToClipboard(text: string) {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
    navigator.clipboard.writeText(text);
  }

  onCloseDialog() {
    this.userNameDialog = '';
    this.newUserPasswordDialog = '';
  }

  // Utility methods
  private populateForm(data: SoftwareUserInfo): void {
    const {
      UserId, MobileNumber, UserName,
      UserTypeId, SMSOwnerActive, UserActive,
    } = data;

    this.id.setValue(UserId);
    this.phone.setValue(MobileNumber);
    this.name.setValue(UserName);
    this.userType.setValue(UserTypeId);
    this.smsActive.setValue(SMSOwnerActive);
    this.userActive.setValue(UserActive);
  }

  private isSuccessful(response: ApiResponse<any>): boolean {
    if (!response.success || !response.data) {
      this.toast.error('خطا', response.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
      return false;
    }
    return true;
  }

  // Form control getters
  get searchPhone(): FormControl {
    return this.searchForm.get('searchPhone') as FormControl;
  }

  get id(): FormControl {
    return this.userInfoForm.get('id') as FormControl;
  }

  get phone(): FormControl {
    return this.userInfoForm.get('phone') as FormControl;
  }

  get name(): FormControl {
    return this.userInfoForm.get('name') as FormControl;
  }

  get userType(): FormControl {
    return this.userInfoForm.get('userType') as FormControl;
  }

  get smsActive(): FormControl {
    return this.userInfoForm.get('smsActive') as FormControl;
  }

  get userActive(): FormControl {
    return this.userInfoForm.get('userActive') as FormControl;
  }
}
