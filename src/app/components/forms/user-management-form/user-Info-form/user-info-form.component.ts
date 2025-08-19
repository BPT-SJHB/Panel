import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';

import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';

import { UserManagementService } from 'app/services/user-management/user-management.service';

import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';
import { SoftwareUserInfo } from 'app/services/user-management/model/software-user-info.model';
import { ValidationSchema } from 'app/constants/validation-schema';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { AppTitles } from 'app/constants/Titles';

interface UserInfoForm {
  id: number | null;
  phone: string;
  name: string;
  userType: number;
  smsActive: boolean;
  userActive: boolean;
}

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    SelectInputComponent,
    ToggleSwitchInputComponent,
    TextInputComponent,
    SearchInputComponent,
    ButtonComponent,
  ],
  providers: [DialogService],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.scss',
})
export class UserInfoFormComponent extends BaseLoading implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userManager = inject(UserManagementService);
  private readonly dialogService = inject(DialogService);
  private readonly nonNullable = this.fb.nonNullable;

  // forms
  readonly userInfoForm = this.fb.group({
    id: this.fb.control<number | null>(null, ValidationSchema.id), // nullable
    phone: this.nonNullable.control('', ValidationSchema.mobile), // non-nullable
    name: this.nonNullable.control('', ValidationSchema.fullName),
    userType: this.nonNullable.control(0),
    smsActive: this.nonNullable.control(false),
    userActive: this.nonNullable.control(true),
  });

  readonly searchForm = this.fb.group({
    searchPhone: this.nonNullable.control('', ValidationSchema.mobile),
  });

  readonly appTitles = AppTitles;

  roles: { label: string; value: number }[] = [];

  /** ================================
   *  Life Cycle
   *  ================================ */
  override ngOnInit(): void {
    this.withLoading(() => this.loadUserTypes());
    super.ngOnInit();
  }

  /** ================================
   *  Public actions
   *  ================================ */

  fetchUserByPhone: (phone: string) => Promise<void> = async (
    phone: string
  ) => {
    if (this.searchForm.invalid || this.loading()) return;

    await this.withLoading(async () => {
      const response = await this.userManager.GetSoftwareUserInfo(phone);
      if (!checkAndToastError(response, this.toast)) return;

      this.populateForm(response.data);
    });
  };

  async activateUserSms(): Promise<void> {
    const id = this.getUserFormControl('id');
    const smsActive = this.getUserFormControl('smsActive');

    const canUserSendSms = id.invalid || smsActive.value;

    if (this.loading() || !canUserSendSms) return;

    await this.withLoading(async () => {
      const response = await this.userManager.ActivateUserSMS(id.value!);
      if (!checkAndToastError(response, this.toast)) return;

      smsActive.setValue(true);
      this.toast.success('موفق', response.data.Message);
    });
  }

  async resetUserPassword(): Promise<void> {
    const id = this.getUserFormControl('id');
    if (id.invalid || this.loading()) return;

    await this.withLoading(async () => {
      const response = await this.userManager.ResetSoftwareUserPassword(
        id.value!
      );
      if (!checkAndToastError(response, this.toast)) return;

      const { Username, Password } = response.data;
      this.showNewPasswordDialog(Username, Password);
    });
  }

  async registerUser(): Promise<void> {
    if (this.loading() && this.userInfoForm.invalid) return;

    await this.withLoading(async () => {
      const user = this.getSoftwareUser();
      const response = await this.userManager.RegisterNewSoftwareUser({
        ...user,
        UserId: 0,
      });
      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', 'اطلاعات با موفقیت ثبت شد.');
      this.resetUserInfoForm();
      this.resetSearchForm();

      this.populateForm({
        ...user,
        UserId: response.data.UserId,
      });
    });
  }

  async updateUserInfo(): Promise<void> {
    if (this.userInfoForm.invalid || this.loading()) return;

    await this.withLoading(async () => {
      const user = this.getSoftwareUser();
      const response = await this.userManager.EditSoftwareUser(user);
      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });
  }

  async sendWebsiteLink(): Promise<void> {
    const id = this.getUserFormControl('id');
    if (id.invalid || this.loading()) return;

    await this.withLoading(async () => {
      const response = await this.userManager.SendWebsiteLink(id.value!);
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
    });
  }

  async submitUserInfo(): Promise<void> {
    if (this.searchForm.valid) {
      await this.updateUserInfo();
    } else if (this.isFormValidExcept('id')) {
      await this.registerUser();
    }
  }

  resetUserInfoForm(): void {
    this.userInfoForm.reset({
      id: null,
      phone: '',
      name: '',
      userType: 0,
      smsActive: false,
      userActive: true,
    });
    this.userInfoForm.markAsPristine();
    this.userInfoForm.markAsUntouched();
  }

  /** ================================
   *  Private helpers
   *  ================================ */

  private async loadUserTypes(): Promise<void> {
    const response = await this.userManager.GetUserTypes();
    if (!checkAndToastError(response, this.toast)) return;

    this.roles =
      response.data?.map((type) => ({
        value: type.UTId,
        label: type.UTTitle,
      })) ?? [];
  }

  private getSoftwareUser(): SoftwareUserInfo {
    return {
      UserId: this.getUserFormControl('id').value ?? 0,
      MobileNumber: this.getUserFormControl('phone').value,
      UserName: this.getUserFormControl('name').value,
      UserTypeId: this.getUserFormControl('userType').value,
      SMSOwnerActive: this.getUserFormControl('smsActive').value,
      UserActive: this.getUserFormControl('userActive').value,
    };
  }

  private showNewPasswordDialog(username: string, password: string): void {
    this.dialogService.open(NewPasswordDialogComponent, {
      header: 'رمز عبور جدید',
      width: '20rem',
      modal: true,
      inputValues: { username, password },
    });
  }

  private populateForm(data: SoftwareUserInfo): void {
    this.userInfoForm.setValue({
      id: data.UserId,
      phone: data.MobileNumber ?? '',
      name: data.UserName ?? '',
      userType: data.UserTypeId ?? 0,
      smsActive: data.SMSOwnerActive ?? true,
      userActive: data.UserActive ?? false,
    });
  }

  private resetSearchForm(): void {
    this.searchForm.reset({ searchPhone: '' });
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
  }

  /** ================================
   *  Form control getters (typed access)
   *  ================================ */
  getUserFormControl<K extends keyof UserInfoForm>(
    name: K
  ): FormControl<UserInfoForm[K]> {
    const control = this.userInfoForm.get(name as string);
    if (!control) {
      throw new Error(`Control "${String(name)}" not found on userInfoForm`);
    }
    return control as FormControl<UserInfoForm[K]>;
  }

  get searchPhone(): FormControl<string> {
    return this.searchForm.controls.searchPhone as FormControl<string>;
  }

  isFormValidExcept(exceptControl: string): boolean {
    return Object.keys(this.userInfoForm.controls)
      .filter((key) => key !== exceptControl)
      .every((key) => this.getUserFormControl(key as keyof UserInfoForm).valid);
  }
}
