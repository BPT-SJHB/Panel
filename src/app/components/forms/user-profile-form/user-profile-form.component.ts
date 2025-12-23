// 🔽 Angular & RxJS Imports
import { Component, OnInit, inject, signal } from '@angular/core';

// 🔽 PrimeNG UI Modules
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

// 🔽 App Services & Utilities
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { AppTitles } from 'app/constants/Titles';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { BaseLoading } from '../shared/component-base/base-loading';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { PersonalizePasswordDialogComponent } from 'app/components/shared/dialog/personalize-password-dialog/personalize-password-dialog.component';

// 🔽 Interfaces
interface UserProfile {
  UserId: number;
  UserName: string;
  UserTypeTitle: string;
  MobileNumber: string;
  UserActive: string;
  SMSOwnerActive: string;
  walletId: number;
  walletCode: string;
  balance: number;
}

@Component({
  selector: 'app-user-profile-form',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    ConfirmDialogModule,
    ButtonComponent,
    CommonModule,
    Dialog,
  ],
  providers: [DialogService],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss',
})
export class UserProfileFormComponent extends BaseLoading implements OnInit {
  // 🔽 Injected services
  private readonly userService = inject(UserManagementService);
  private readonly dialogService = inject(DialogService);
  private readonly userAuth = inject(UserAuthService);
  private readonly confirmService = inject(AppConfirmService);

  // 🔽 Signal to manage and track user profile state
  readonly userProfile = signal<UserProfile>({
    UserId: -1,
    UserName: '',
    UserTypeTitle: '',
    MobileNumber: '',
    UserActive: '',
    SMSOwnerActive: '',
    walletId: -1,
    walletCode: '',
    balance: 0,
  });

  readonly appTitle = AppTitles;

  // 🔽 User's SMS activation status (separate boolean flag)
  isUserSmsActivated = true;
  isChangePasswordDialogVisible = false;

  // 🔽 Table column definitions for user profile view
  readonly cols: readonly { field: keyof UserProfile; col: string }[] = [
    { field: 'UserId', col: 'کد کاربری' },
    { field: 'UserName', col: 'نام کاربری' },
    { field: 'UserTypeTitle', col: 'نوع کاربر' },
    { field: 'MobileNumber', col: 'شماره همراه' },
    { field: 'UserActive', col: 'وضعیت کاربر' },
    { field: 'SMSOwnerActive', col: 'وضعیت پیامک' },
    { field: 'walletId', col: 'کد کیف پول' },
    { field: 'walletCode', col: 'شرح کیف پول' },
    { field: 'balance', col: 'موجودی حساب' },
  ];

  // 🔽 Lifecycle hook: on component initialization
  override ngOnInit(): void {
    super.ngOnInit();
    this.loadUserInformation();
  }

  // 🔽 Load user profile info from backend
  private async loadUserInformation(): Promise<void> {
    await this.withLoading(async () => {
      const res = await this.userService.GetSoftwareUserProfile();
      if (!checkAndToastError(res, this.toast)) return;

      const user = res.data.RawSoftwareUser;
      const wallet = res.data.MoneyWallet;
      this.userProfile.set({
        UserId: user.UserId,
        UserName: user.UserName ?? '-',
        UserTypeTitle: user.UserTypeTitle ?? '-',
        MobileNumber: user.MobileNumber ?? '-',
        UserActive: user.UserActive ? 'فعال' : 'غیرفعال',
        SMSOwnerActive: user.SMSOwnerActive ? 'فعال' : 'غیرفعال',
        walletId: wallet.MoneyWalletId,
        walletCode: wallet.MoneyWalletCode ?? '-',
        balance: wallet.Balance ?? 0,
      });

      this.isUserSmsActivated = !!user.SMSOwnerActive;
    });
  }

  // ❗ Show confirmation dialog before reset password
  confirmResetPassword(): void {
    this.confirmService.confirmResetPassword(async () => {
      await this.resetUserPassword();
    });
  }

  // 🔽 Trigger SMS activation for user (if not already active)
  async activateUserSms(): Promise<void> {
    const userId = this.userProfile().UserId;
    if (this.loading() || this.isUserSmsActivated || userId === -1) return;

    await this.withLoading(async () => {
      const res = await this.userService.ActivateUserSMS(userId);
      if (!checkAndToastError(res, this.toast)) return;

      this.toast.success('موفق', res.data.Message);
      this.userProfile.update((profile) => ({
        ...profile,
        SMSOwnerActive: 'فعال',
      }));
      this.isUserSmsActivated = true;
    });
  }

  // 🔽 Reset user password and open dialog with new credentials
  async resetUserPassword(): Promise<void> {
    const userId = this.userProfile().UserId;
    if (userId === -1) return;

    let { password, username } = { password: '', username: '' };
    await this.withLoading(async () => {
      const res = await this.userService.ResetSoftwareUserPassword(userId);
      if (!checkAndToastError(res, this.toast)) return;
      password = res.data.Password;
      username = res.data.Username;
    });
    if (!password || !username) return;
    this.isChangePasswordDialogVisible = false;
    this.dialogService.open(NewPasswordDialogComponent, {
      header: 'رمز عبور جدید',
      width: '20rem',
      modal: true,
      closable: true,
      inputValues: { username, password },
    });
  }

  openPersonalizePasswordForm() {
    const userId = this.userProfile().UserId;
    if (userId === -1) return;

    this.isChangePasswordDialogVisible = false;
    this.dialogService.open(PersonalizePasswordDialogComponent, {
      header: 'شخصی سازی رمز عبور',
      width: '25rem',
      modal: true,
      closable: true,
      inputValues: { userId: userId },
    });
  }

  logout() {
    this.userAuth.logout();
  }
}
