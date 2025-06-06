import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneInputComponent } from 'app/components/shared/inputs/phone-input/phone-input.component';
import { ButtonModule } from 'primeng/button';
import { UserTypeInputComponent } from 'app/components/shared/inputs/user-type-input/user-type-input.component';
import { UserIdInputComponent } from 'app/components/shared/inputs/user-id-input/user-id-input.component';
import { SmsActiveInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { UserFullNameInputComponent } from "app/components/shared/inputs/user-full-name-input/user-full-name-input.component"
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PhoneInputComponent,
    UserFullNameInputComponent,
    UserTypeInputComponent,
    UserIdInputComponent,
    SmsActiveInputComponent,
    DialogModule
  ],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.scss'
})
export class UserInfoFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private userManager: UserManagementService = inject(UserManagementService);
  private toast: ToastService = inject(ToastService);

  userInfoForm: FormGroup;
  searchForm: FormGroup;
  loading = false;
  roles: { label: string; value: number }[] = [];

  passwordDialogVisible: boolean = false;
  userNameDialog = "";
  newUserPasswordDialog = "";


  constructor() {
    this.searchForm = this.fb.group({
      searchPhone: ['',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}')
        ]
      ]
    })

    this.userInfoForm = this.fb.group({
      id: ['0', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}')
      ]],
      name: ['', Validators.required],
      userType: [0],
      smsActive: [false],
      userActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadUserTypes();
  }

  async loadUserTypes(): Promise<void> {
    this.setLoading(true);
    try {
      const response = await this.userManager.GetUserTypes();
      if (!this.isSuccessful(response)) return;

      this.roles = response.data?.map(type => ({
        value: type.UTId,
        label: type.UTTitle,
      })) ?? [];
    } finally {
      this.setLoading(false);
    }
  }

  async fetchUserByPhone(): Promise<void> {
    if (this.searchForm.invalid || this.loading) return;

    this.setLoading(true);
    try {
      const response = await this.userManager.GetSoftwareUserInfo(this.searchPhone.value);
      if (!this.isSuccessful(response)) return;

      this.populateForm(response.data!);
    } finally {
      this.setLoading(false);
    }
  }

  async activateUserSms(): Promise<void> {
    if (this.id.value == '0' || this.smsActive.invalid || this.smsActive.value || this.loading) return;

    this.setLoading(true);
    try {
      const response = await this.userManager.ActivateUserSMS(this.id.value);
      if (!this.isSuccessful(response)) return;
      this.smsActive.setValue(true);
      this.toast.success('موفق', response.data?.Message ?? 'عملیات موفق آمیز بود.');
    } finally {
      this.setLoading(false);
    }
  }

  async resetUserPassword(): Promise<void> {
    if (this.id.value == '0' || this.loading)
      return;

    this.setLoading(true);
    try {
      const response = await this.userManager.ResetSoftwareUserPassword(this.id.value);
      if (!this.isSuccessful(response)) return;

      const { Username, Password } = response.data!;
      this.toast.success('موفق', `رمز عبور کاربر ${Username} تغییر یافت.`);

      this.userNameDialog = Username;
      this.newUserPasswordDialog = Password;
      this.passwordDialogVisible = true;

    } finally {
      this.setLoading(false);
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

    this.setLoading(true);
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
      this.setLoading(false);
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

  private setLoading(state: boolean): void {
    this.loading = state;
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
