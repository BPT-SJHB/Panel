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
import { checkAndToastError } from 'app/utils/api-utils';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TicketErrorCodes } from 'app/constants/error-messages';

@Component({
  selector: 'app-ticket-guard-captcha-form',
  standalone: true,
  imports: [CaptchaInputComponent, DialogModule, ButtonComponent],
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
  dialogCaptchaVisible = signal<boolean>(false);

  // Services
  private readonly ticketService = inject(TicketServiceManagementService);
  private readonly fb = inject(FormBuilder);
  private readonly guard = signal<boolean>(false);
  // Form controls
  captchaId = this.fb.nonNullable.control<string>('', ValidationSchema.id);
  captchaAnswer = this.fb.nonNullable.control<string>(
    '',
    ValidationSchema.captcha
  );

  constructor() {
    super();

    // Keep dialog state in sync with activeCaptcha input
    effect(() => {
      this.dialogCaptchaVisible.set(this.activeCaptcha());
    });
  }

  async verifyCaptcha(): Promise<void> {
    if (this.guard() || this.captchaId.invalid || this.captchaAnswer.invalid)
      return;

    this.guard.set(true);
    const task = async () => {
      const response = await this.ticketService.VerifyCaptcha(
        this.captchaId.value,
        this.captchaAnswer.value
      );

      // Show toast if error occurred
      if (!checkAndToastError(response, this.toast)) {
        if (
          response.error?.code === TicketErrorCodes.CaptchaIncorrect ||
          response.error?.code === TicketErrorCodes.CaptchaExpired
        ) {
          this.captchaId.reset();
          this.captchaAnswer.reset();
          await this.captchaInput?.onRefreshClick();
        }

        return;
      }

      // Trigger passed action
      const actionFn = this.action();
      if (actionFn) await actionFn();
    };

    task().finally(() => this.guard.set(false));
  }

  onDialogHidden() {
    this.hiddenDialog.emit();
    this.captchaId.reset('');
    this.captchaAnswer.reset('');
  }
}
