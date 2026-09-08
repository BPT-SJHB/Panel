import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { ValidationSchema } from 'app/constants/validation-schema';
import { CaptchaInputComponent } from 'app/components/shared/inputs/captcha-input/captcha-input.component';
import { DialogModule } from 'primeng/dialog';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TicketErrorCodes } from 'app/constants/error-messages';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { OptInputComponent } from 'app/components/shared/inputs/opt-input/opt-input.component';
import { MinuteAndSecondPipe } from 'app/pipes/minute-and-second.pipe';
import { interval, Subscription, takeUntil } from 'rxjs';

const OTP_COOLDOWN_SECONDS = 120;

@Component({
  selector: 'app-ticket-guard-captcha-form',
  standalone: true,
  imports: [
    CaptchaInputComponent,
    DialogModule,
    ButtonComponent,
    TextInputComponent,
    OptInputComponent,
    MinuteAndSecondPipe,
  ],
  templateUrl: './ticket-guard-captcha-form.component.html',
  styleUrls: ['./ticket-guard-captcha-form.component.scss'],
})
export class TicketGuardCaptchaFormComponent extends BaseLoading {
  @ViewChild(CaptchaInputComponent) captchaInput?: CaptchaInputComponent;

  // Inputs
  readonly action = input<(() => void) | (() => Promise<void>)>(
    () => undefined
  );
  readonly activeCaptcha = input<boolean>(true);

  // Output
  readonly hiddenDialog = output<void>();

  // Signals
  captchaDialogVisible = signal<boolean>(false);
  otpDialogVisible = signal<boolean>(false);
  otpPhoneNumber = signal<string>('');
  remainingTime = signal<number>(0);

  // Timer
  private timerSub?: Subscription;

  // Services
  private readonly ticketService = inject(TicketServiceManagementService);
  private readonly fb = inject(FormBuilder);

  // Form controls
  captchaId = this.fb.nonNullable.control<string>('', ValidationSchema.id);
  captchaAnswer = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.captcha
  );
  phoneNumber = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.mobile
  );
  otpCode = this.fb.nonNullable.control('', ValidationSchema.optCode);

  constructor() {
    super();

    // Keep dialog state in sync with activeCaptcha input
    effect(() => {
      this.captchaDialogVisible.set(this.activeCaptcha());
    });
  }

  async verifyCaptchaAndSendOTP(): Promise<void> {
    if (
      this.loading() ||
      this.phoneNumber.invalid ||
      this.captchaId.invalid ||
      this.captchaAnswer.invalid
    )
      return;

    await this.withLoading(async () => {
      const captchaResponse = await this.ticketService.VerifyCaptcha(
        this.captchaId.value,
        this.captchaAnswer.value
      );

      if (!captchaResponse.success) {
        if (
          captchaResponse.error?.code === TicketErrorCodes.CaptchaIncorrect ||
          captchaResponse.error?.code === TicketErrorCodes.CaptchaExpired
        ) {
          this.resetCaptcha();
          await this.captchaInput?.onRefreshClick();
        }

        return;
      }

      const otpResponse = await this.ticketService.SendOTP(
        this.phoneNumber.value
      );

      if (!checkAndToastError(otpResponse, this.toast)) return;
      this.toast.success('موفق', otpResponse.data.message);
      this.otpPhoneNumber.set(this.phoneNumber.value);
      this.startOtpTimer();

      this.captchaDialogVisible.set(false);
      this.otpDialogVisible.set(true);
    });
  }

  onCaptchaDialogHide(): void {
    // Only emit hiddenDialog if not transitioning to OTP dialog
    if (!this.otpDialogVisible()) {
      this.hiddenDialog.emit();
      this.resetCaptcha();
      this.phoneNumber.reset('');
    }
  }

  onOtpDialogHide(): void {
    this.stopOtpTimer();
    this.remainingTime.set(0);
    this.hiddenDialog.emit();
    this.resetCaptcha();
    this.phoneNumber.reset('');
    this.resetOTPForm();
  }

  resetOTPForm(): void {
    this.otpCode.reset('');
  }

  private resetCaptcha(): void {
    this.captchaId.reset('');
    this.captchaAnswer.reset('');
  }

  private startOtpTimer(): void {
    this.stopOtpTimer();
    this.remainingTime.set(OTP_COOLDOWN_SECONDS);

    this.timerSub = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.remainingTime() > 0) {
          this.remainingTime.update((time) => time - 1);
        } else {
          this.stopOtpTimer();
        }
      });
  }

  private stopOtpTimer(): void {
    this.timerSub?.unsubscribe();
    this.timerSub = undefined;
  }

  verifyOTPCode = async (): Promise<void> => {
    if (this.loading() || this.otpCode.invalid) return;

    await this.withLoading(async () => {
      const otpValue = this.otpCode.value;
      const response = await this.ticketService.VerifyOTP(
        otpValue,
        this.otpPhoneNumber()
      );

      if (!checkAndToastError(response, this.toast)) {
        if (response.error?.code === TicketErrorCodes.TooManyRequests) {
          this.stopOtpTimer();
          this.otpDialogVisible.set(false);
        } else {
          this.otpCode.reset('');
        }
        return;
      }

      if (!response.data.valid) {
        this.toast.error('خطا', response.data.message);
        this.otpCode.reset('');
        return;
      }

      this.toast.success('موفق', response.data.message);
      this.stopOtpTimer();

      const actionFn = this.action();
      if (actionFn) await actionFn();

      this.otpDialogVisible.set(false);
    });
  };

  async retrySendOtp(): Promise<void> {
    if (this.loading() || this.remainingTime() > 0 || !this.otpPhoneNumber())
      return;

    await this.withLoading(async () => {
      const otpResponse = await this.ticketService.SendOTP(
        this.otpPhoneNumber()
      );

      if (!checkAndToastError(otpResponse, this.toast)) return;
      this.toast.success('موفق', otpResponse.data.message);
      this.resetOTPForm();
      this.startOtpTimer();
    });
  }
}
