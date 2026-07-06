import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { CaptchaInputComponent } from 'app/components/shared/inputs/captcha-input/captcha-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ButtonModule } from 'primeng/button';
import { BaseLoading } from '../shared/component-base/base-loading';
import { AppTitles } from 'app/constants/Titles';
import { ValidationSchema } from 'app/constants/validation-schema';
import { Dialog } from 'primeng/dialog';
import { OptInputComponent } from 'app/components/shared/inputs/opt-input/opt-input.component';
import { PanelGuardCaptchaFormComponent } from '../panel-guard-captcha-form/panel-guard-captcha-form.component';
import { interval, Subscription, takeUntil } from 'rxjs';
import { checkAndToastError } from 'app/utils/api-utils';
import { ErrorCodes } from 'app/constants/error-messages';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
    CaptchaInputComponent,
    Dialog,
    OptInputComponent,
    PanelGuardCaptchaFormComponent,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent extends BaseLoading implements OnInit {
  // ------------------------
  // ViewChild
  // ------------------------
  @ViewChild('captchaRef') captchaComponent!: CaptchaInputComponent;

  // ------------------------
  // Dependency Injection
  // ------------------------
  private fb = inject(FormBuilder);
  private readonly authService = inject(UserAuthService);
  private driver_truckService = inject(Driver_TruckManagementService);

  // ------------------------
  // Form Controls
  // ------------------------
  form = this.fb.group({
    phone: this.fb.nonNullable.control<string>('', ValidationSchema.mobile),
    nationalId: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.nationalId
    ),
    smartCard: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.smartCard
    ),
    sessionId: this.fb.nonNullable.control<string>('', ValidationSchema.id),
    captcha: this.fb.nonNullable.control<string>('', ValidationSchema.captcha),
  });

  optCodeCrl = this.fb.nonNullable.control('', ValidationSchema.optCode);
  forgetPasswordTitle: string = AppTitles.appBrokenTitle;

  // ------------------------
  // Signals (Reactive State)
  // ------------------------
  sentPhoneNumber = signal<string | null>(null); // stores phone number for OTP dialog
  isCaptchaGuardVisible = signal<boolean>(false);

  // ------------------------
  // Timer State
  // ------------------------
  otpCooldown = 0; // seconds
  remainingTime = signal(0); // seconds remaining for resend
  private timerSub?: Subscription;

  // ------------------------
  // Dialog State
  // ------------------------
  // Two-way bound in template, cannot be signal
  isDialogVisible = false;

  override ngOnInit(): void {
    super.ngOnInit();

    this.startOTPTimer();
  }
  // ------------------------
  // Form Submission
  // ------------------------
  async onSubmit() {
    if (this.loading() || this.form.invalid || this.remainingTime() > 0) return;

    await this.withLoading(async () => {
      const response = await this.userService.VerifyAnyUserByOTPCode(
        this.ctrl('sessionId').value,
        this.ctrl('phone').value,
        this.ctrl('captcha').value
      );

      if (!checkAndToastError(response, this.toast)) {
        this.resetForm();
        return;
      }

      this.markOTPRequested();
      this.startOTPTimer();
      this.isDialogVisible = true;
      this.sentPhoneNumber.set(this.ctrl('phone').value);
    });
  }

  // ------------------------
  // Form Control Helper
  // ------------------------
  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }

  // ------------------------
  // OTP Cooldown Logic
  // ------------------------

  markOTPRequested() {
    const key = `otp_timer`;
    localStorage.setItem(key, Date.now().toString());
  }

  startOTPTimer() {
    this.timerSub?.unsubscribe();

    const key = `otp_timer`;
    const last = localStorage.getItem(key);
    if (!last) return;

    const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
    const remaining = this.otpCooldown - elapsed;
    const initialTime = remaining > 0 ? remaining : 0;

    if (initialTime <= 0) return;

    this.remainingTime.set(remaining);
    this.timerSub = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.remainingTime() > 0) {
          this.remainingTime.set(this.remainingTime() - 1);
        } else {
          this.timerSub?.unsubscribe();
        }
      });
  }

  // ------------------------
  // Utility: format seconds for display
  // ------------------------
  formatSeconds(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} ثانیه`;
    }

    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const ss = s < 10 ? `0${s}` : s;

    return `${m}:${ss}`;
  }

  // ------------------------
  // OTP Verification
  // ------------------------
  verifyCode = async () => {
    const sessionId = this.ctrl('sessionId').value;
    if (this.loading() || this.optCodeCrl.invalid || !sessionId) return;

    await this.withLoading(async () => {
      const opt = this.optCodeCrl.value;
      const nationalId = this.ctrl('nationalId').value;
      const smartCard = this.ctrl('smartCard').value;

      const response = await this.driver_truckService.RegisterAnyUserByOTPCode(
        sessionId,
        opt,
        nationalId,
        smartCard
      );

      // need to fill captcha agian
      if (response.error?.code === ErrorCodes.NotAuthenticated) {
        this.isCaptchaGuardVisible.set(true);
        return;
      }

      this.isCaptchaGuardVisible.set(false);
      if (!checkAndToastError(response, this.toast)) {
        this.optCodeCrl.reset('');
        return;
      }

      this.toast.success('موفق', 'ثبت نام انجام شد');
      await this.authService.logout();
    });
  };

  // ------------------------
  // Reset Form and Refresh Captcha
  // ------------------------
  public async resetForm(): Promise<void> {
    this.form.reset();
    await this.captchaComponent.getCaptchaInformation();
  }
}
