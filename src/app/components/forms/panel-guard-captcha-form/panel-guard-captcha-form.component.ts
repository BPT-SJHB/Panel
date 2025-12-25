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
import { BaseLoading } from '../shared/component-base/base-loading';
import { ValidationSchema } from 'app/constants/validation-schema';
import { CaptchaInputComponent } from 'app/components/shared/inputs/captcha-input/captcha-input.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from 'app/components/shared/button/button.component';

@Component({
  selector: 'app-panel-guard-captcha-form',
  standalone: true,
  imports: [CaptchaInputComponent, DialogModule, ButtonComponent],
  templateUrl: './panel-guard-captcha-form.component.html',
  styleUrls: ['./panel-guard-captcha-form.component.scss'],
})
export class PanelGuardCaptchaFormComponent extends BaseLoading {
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
  private readonly fb = inject(FormBuilder);
  private readonly guard = signal<boolean>(false);
  // Form controls
  sesstionId = input(
    this.fb.nonNullable.control<string>('', ValidationSchema.id)
  );
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

  async runTask(): Promise<void> {
    if (this.guard() || this.sesstionId().invalid || this.captchaAnswer.invalid)
      return;

    this.guard.set(true);
    const task = async () => {
      // Trigger passed action
      const actionFn = this.action();
      if (actionFn) await actionFn();
    };

    task().finally(() => this.guard.set(false));
  }

  onDialogHidden() {
    this.hiddenDialog.emit();
    this.captchaAnswer.reset('');
  }
}
