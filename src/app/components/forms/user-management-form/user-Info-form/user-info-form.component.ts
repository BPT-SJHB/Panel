import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';

import { SelectInputComponent } from 'app/components/shared/inputs/select-input/select-input.component';
import { BinaryRadioInputComponent } from 'app/components/shared/inputs/binary-radio-input/binary-radio-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { SearchInputComponent } from 'app/components/shared/inputs/search-input/search-input.component';

import { UserManagementService } from 'app/services/user-management/user-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';

import { NewPasswordDialogComponent } from 'app/components/shared/dialog/new-password-dialog/new-password-dialog.component';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ValidationSchema } from 'app/constants/validation-schema';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    SelectInputComponent,
    BinaryRadioInputComponent,
    TextInputComponent,
    SearchInputComponent,
  ],
  providers: [DialogService],
  templateUrl: './user-info-form.component.html',
  styleUrl: './user-info-form.component.scss',
})
export class UserInfoFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private userManager = inject(UserManagementService);
  private toast = inject(ToastService);
  private loadingService = inject(LoadingService);
  private dialogService = inject(DialogService);
  private destroy$ = new Subject<void>();

  userInfoForm: FormGroup;
  searchForm: FormGroup;
  roles: { label: string; value: number }[] = [];
  loading = false;

  constructor() {
    // Initialize the search and user info forms
    this.searchForm = this.fb.group({
      searchPhone: ['', ValidationSchema.mobile],
    });

    this.userInfoForm = this.fb.group({
      id: [0, ValidationSchema.id],
      phone: ['', ValidationSchema.mobile],
      name: ['', ValidationSchema.fullName],
      userType: [0],
      smsActive: [false],
      userActive: [true],
    });
  }

  // Lifecycle: on component init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.loading = val));

    this.loadUserTypes();
  }

  // Lifecycle: clean up on destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Load user types from the backend and format them for dropdown
  private async loadUserTypes(): Promise<void> {
    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.GetUserTypes();
      if (!this.isSuccessful(res)) return;

      this.roles =
        res.data?.map((type) => ({
          value: type.UTId,
          label: type.UTTitle,
        })) ?? [];
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // Fetch user info using phone number (called by search)
  fetchUserByPhone = async (phone: string) => {
    if (this.searchForm.invalid || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.GetSoftwareUserInfo(phone);
      if (!this.isSuccessful(res)) return;
      this.populateForm(res.data!);
    } finally {
      this.loadingService.setLoading(false);
    }
  };

  // Activate SMS access for a user
  async activateUserSms(): Promise<void> {
    if (
      this.id.value === 0 ||
      this.smsActive.invalid ||
      this.smsActive.value ||
      this.loading
    )
      return;

    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.ActivateUserSMS(this.id.value);
      if (!this.isSuccessful(res)) return;

      this.smsActive.setValue(true);
      this.toast.success('موفق', res.data?.Message ?? 'عملیات موفق آمیز بود.');
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // Reset the user's password and display in dialog
  async resetUserPassword(): Promise<void> {
    if (this.id.value === 0 || this.loading) return;

    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.ResetSoftwareUserPassword(
        this.id.value
      );
      if (!this.isSuccessful(res)) return;

      const { Username, Password } = res.data!;
      this.showNewPasswordDialog(Username, Password);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // Register a new user using form data
  async registerUser(): Promise<void> {
    if (this.loading && this.userInfoForm.invalid) return;

    this.loadingService.setLoading(true);
    try {
      const user = this.getSoftwareUser();
      const res = await this.userManager.RegisterNewSoftwareUser({
        ...user,
        UserId: 0,
      });
      if (!this.isSuccessful(res)) return;

      this.toast.success('موفق', 'کاربر با موفقیت ثبت شد.');
      this.resetUserInfoForm();
      this.resetSearchForm();

      this.populateForm({
        ...user,
        UserId: res.data?.UserId ?? 0,
      });
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // Update an existing user's information
  async updateUserInfo(): Promise<void> {
    if (this.userInfoForm.invalid || this.loading) return;

    const user = this.getSoftwareUser();
    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.EditSoftwareUser(user);
      if (!this.isSuccessful(res)) return;
      this.toast.success('موفق', res.data?.Message ?? '');
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  // Send the web login link to the user's phone
  async sendWebsiteLink(): Promise<void> {
    if (this.id.value === 0) return;

    this.loadingService.setLoading(true);
    try {
      const res = await this.userManager.SendWebsiteLink(this.id.value);
      if (!res.success) {
        this.toast.error(
          'خطا',
          res.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد'
        );
        return;
      }
      this.toast.success(
        'موفق',
        res.data?.Message ?? 'لینک سامانه با موفقیت ارسال گردید'
      );
    } finally {
      this.loadingService.setLoading(true);
    }
  }

  // Decide whether to register or update based on user ID
  async submitUserInfo(): Promise<void> {
    this.id.value === 0
      ? await this.registerUser()
      : await this.updateUserInfo();
  }

  // Extract user data from form into a SoftwareUserInfo object
  private getSoftwareUser(): SoftwareUserInfo {
    return {
      UserId: this.id.value,
      MobileNumber: this.phone.value,
      UserName: this.name.value,
      UserTypeId: this.userType.value,
      SMSOwnerActive: this.smsActive.value,
      UserActive: this.userActive.value,
    };
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

  // Populate form fields with existing user data
  private populateForm(data: SoftwareUserInfo): void {
    this.id.setValue(data.UserId);
    this.phone.setValue(data.MobileNumber);
    this.name.setValue(data.UserName);
    this.userType.setValue(data.UserTypeId);
    this.smsActive.setValue(data.SMSOwnerActive);
    this.userActive.setValue(data.UserActive);
  }

  // Check if response is valid and successful
  private isSuccessful(res: ApiResponse<any>): boolean {
    if (!res.success || !res.data) {
      this.toast.error('خطا', res.error?.message ?? 'خطای غیرمنتظره‌ای رخ داد');
      return false;
    }
    return true;
  }

  // Reset user form to default values
  resetUserInfoForm(): void {
    this.userInfoForm.reset();
    this.userInfoForm.markAsPristine();
    this.userInfoForm.markAsUntouched();
    this.id.setValue(0);
    this.userType.setValue(0);
    this.smsActive.setValue(false);
    this.userActive.setValue(true);
  }

  // Reset the phone search input form
  resetSearchForm(): void {
    this.searchForm.reset();
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();
  }

  // Getter for searchPhone control
  get searchPhone(): FormControl {
    return this.searchForm.get('searchPhone') as FormControl;
  }

  // Getter for ID control
  get id(): FormControl {
    return this.userInfoForm.get('id') as FormControl;
  }

  // Getter for phone control
  get phone(): FormControl {
    return this.userInfoForm.get('phone') as FormControl;
  }

  // Getter for name control
  get name(): FormControl {
    return this.userInfoForm.get('name') as FormControl;
  }

  // Getter for user type control
  get userType(): FormControl {
    return this.userInfoForm.get('userType') as FormControl;
  }

  // Getter for SMS activation control
  get smsActive(): FormControl {
    return this.userInfoForm.get('smsActive') as FormControl;
  }

  // Getter for user activation control
  get userActive(): FormControl {
    return this.userInfoForm.get('userActive') as FormControl;
  }
}
