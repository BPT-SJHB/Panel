// 🔽 Angular & RxJS Imports
import { Component, OnInit, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// 🔽 PrimeNG UI Modules
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

// 🔽 App Services & Utilities
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { AppTitles } from 'app/constants/Titles';
import { CommonModule } from '@angular/common';

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
  ],
  providers: [ConfirmationService, DialogService],
  templateUrl: './user-profile-form.component.html',
  styleUrl: './user-profile-form.component.scss',
})
export class UserProfileFormComponent implements OnInit {
  // 🔽 Injected services
  private readonly userService = inject(UserManagementService);
  private readonly toast = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly dialogService = inject(DialogService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly userAuth = inject(UserAuthService);

  // 🔽 Signal to manage loading state
  readonly loading = signal(false);

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

  // 🔽 Table column definitions for user profile view
  readonly cols: ReadonlyArray<{ field: keyof UserProfile; col: string }> = [
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

  // 🔽 Subject to manage unsubscribe logic for observables
  private readonly destroy$ = new Subject<void>();

  // 🔽 Lifecycle hook: on component initialization
  ngOnInit(): void {
    this.loadUserInformation();

    // Listen to global loading changes
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.loading.set(val));
  }

  // 🔽 Lifecycle hook: clean up subscriptions
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 🔽 Load user profile info from backend
  private async loadUserInformation(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
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
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // ❗ Show confirmation dialog before reset password
  confirmResetPassword(): void {
    this.confirmationService.confirm({
      message: `آیا مطمئن هستید که می‌خواهید رمز عبور خود را تغییر دهید؟`,
      header: 'تغییر رمز عبور',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          this.loadingService.setLoading(true);
          await this.resetUserPassword();
        } finally {
          this.loadingService.setLoading(false);
        }
      },
    });
  }

  // 🔽 Trigger SMS activation for user (if not already active)
  async activateUserSms(): Promise<void> {
    const userId = this.userProfile().UserId;
    if (this.loading() || this.isUserSmsActivated || userId === -1) return;

    this.loadingService.setLoading(true);
    try {
      const res = await this.userService.ActivateUserSMS(userId);
      if (!checkAndToastError(res, this.toast)) return;

      this.toast.success('موفق', res.data.Message);
      this.userProfile.update((profile) => ({
        ...profile,
        SMSOwnerActive: 'فعال',
      }));
      this.isUserSmsActivated = true;
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // 🔽 Reset user password and open dialog with new credentials
  async resetUserPassword(): Promise<void> {
    const userId = this.userProfile().UserId;
    if (userId === -1) return;

    const res = await this.userService.ResetSoftwareUserPassword(userId);
    if (!checkAndToastError(res, this.toast)) return;

    const { Username, Password } = res.data!;
    this.dialogService.open(NewPasswordDialogComponent, {
      header: 'رمز عبور جدید',
      width: '20rem',
      modal: true,
      inputValues: { username: Username, password: Password },
    });
  }

  logout() {
    this.userAuth.logout();
  }
}
