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
import { Dialog } from 'primeng/dialog';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { PasswordInputComponent } from 'app/components/shared/inputs/password-input/password-input.component';
import { TicketErrorCodes } from 'app/constants/error-messages';
import { checkAndToastError } from 'app/utils/api-utils';

@Component({
  selector: 'app-ticket-guard-login-form',
  standalone: true,
  imports: [
    CaptchaInputComponent,
    Dialog,
    ButtonComponent,
    TextInputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './ticket-guard-login-form.component.html',
  styleUrls: ['./ticket-guard-login-form.component.scss'],
})
export class TicketGuardLoginFormComponent extends BaseLoading {
  @ViewChild(CaptchaInputComponent) captchaInput?: CaptchaInputComponent;

  // Inputs & Outputs
  readonly action = input<(() => void) | (() => Promise<void>)>(
    () => undefined
  );
  readonly activeLogin = input<boolean>(false);
  readonly hiddenDialog = output<void>();

  // Signals
  readonly loginDialogVisible = signal<boolean>(false);

  // Services
  private readonly ticketService = inject(TicketServiceManagementService);
  private readonly fb = inject(FormBuilder);

  // Form Controls
  readonly username = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.mobile
  );
  readonly password = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.password
  );
  readonly captchaId = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.id
  );
  readonly captchaAnswer = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.captcha
  );

  constructor() {
    super();
    effect(() => {
      this.loginDialogVisible.set(this.activeLogin());
    });
  }

  get isFormInvalid(): boolean {
    return (
      this.username.invalid ||
      this.password.invalid ||
      this.captchaId.invalid ||
      this.captchaAnswer.invalid
    );
  }

  async login(): Promise<void> {
    if (this.loading() || this.isFormInvalid) return;

    await this.withLoading(async () => {
      // 1. Verify Captcha
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

      // 2. Perform Login with Credentials
      const loginResponse = await this.ticketService.LoginTicketWithPassword(
        this.username.value,
        this.password.value
      );

      if (!checkAndToastError(loginResponse, this.toast)) {
        this.resetCaptcha();
        this.password.reset('');
        await this.captchaInput?.onRefreshClick();
        return;
      }

      this.toast.success('موفق', 'ورود با موفقیت انجام شد');
      this.loginDialogVisible.set(false);
      this.hiddenDialog.emit();

      const actionFn = this.action();
      if (actionFn) {
        await actionFn();
      }
    });
  }

  onDialogHide(): void {
    this.hiddenDialog.emit();
    this.resetCaptcha();
    this.password.reset('');
  }

  private resetCaptcha(): void {
    this.captchaId.reset('');
    this.captchaAnswer.reset('');
  }
}
