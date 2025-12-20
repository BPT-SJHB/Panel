import { Component, inject, input, signal, effect } from '@angular/core';
import { PasswordInputComponent } from '../../inputs/password-input/password-input.component';
import { TextInputComponent } from '../../inputs/text-input/text-input.component';
import { ButtonComponent } from '../../button/button.component';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  confirmPasswordValidator,
  ValidationSchema,
} from 'app/constants/validation-schema';
import { UserManagementService } from 'app/services/user-management/user-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { AppConfirmService } from 'app/services/confirm/confirm.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';

@Component({
  selector: 'app-personalize-password-dialog',
  imports: [PasswordInputComponent, TextInputComponent, ButtonComponent],
  templateUrl: './personalize-password-dialog.component.html',
  styleUrl: './personalize-password-dialog.component.scss',
})
export class PersonalizePasswordDialogComponent extends BaseLoading {
  /* -----------------------------------------------------------
   * Dependency injection
   * -----------------------------------------------------------
   */
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserManagementService);
  private readonly confirmService = inject(AppConfirmService);
  private readonly authService = inject(UserAuthService);
  private readonly dialogRef = inject(DynamicDialogRef);
  /* -----------------------------------------------------------
   * UI state
   * -----------------------------------------------------------
   */
  readonly confirmPasswordType = signal<'password' | 'text'>('password');
  readonly addonWidth = '6.5rem';
  /* -----------------------------------------------------------
   * Input from parent component
   * -----------------------------------------------------------
   * userId comes from outside (dialog opener)
   */
  readonly userId = input<null | number>(null);

  /* -----------------------------------------------------------
   * Reactive form definition
   * -----------------------------------------------------------
   */
  readonly form = this.fb.group(
    {
      userId: this.fb.control<null | number>(null, ValidationSchema.id),
      oldPassowrd: this.fb.nonNullable.control<string>(
        '',
        ValidationSchema.password
      ),
      newPassword: this.fb.nonNullable.control<string>(
        '',
        ValidationSchema.passwordCreation
      ),

      confirmPassword: this.fb.nonNullable.control<string>(
        '',
        ValidationSchema.confirmPassword
      ),
    },
    { validators: confirmPasswordValidator('newPassword', 'confirmPassword') }
  );

  constructor() {
    super();

    /* -----------------------------------------------------------
     * Sync input signal → form control
     * -----------------------------------------------------------
     * If parent updates the userId, the form stays in sync.
     */
    effect(() => {
      const id = this.userId();

      // Only update the form when we actually have a value
      if (id != null) {
        this.ctrl('userId').setValue(id);
      }
    });
  }

  /* -----------------------------------------------------------
   * Submit handler
   * -----------------------------------------------------------
   */

  confirmResetPassword(): void {
    if (this.form.invalid || this.loading()) return;

    this.confirmService.confirmResetPassword(async () => {
      await this.submitPersonalizePassword();
    });
  }

  private async submitPersonalizePassword() {
    await this.withLoading(async () => {
      const res = await this.userService.CustomSoftwareUserPassword(
        this.ctrl('userId').value,
        this.ctrl('oldPassowrd').value,
        this.ctrl('newPassword').value
      );

      if (!checkAndToastError(res, this.toast)) return;
      this.toast.success('موفق', res.data.Message);
      this.authService.logout();
      this.dialogRef.close();
    });
  }

  /* -----------------------------------------------------------
   * Helper for typed form control access
   * -----------------------------------------------------------
   */
  ctrl<T extends keyof typeof this.form.controls>(name: T) {
    return this.form.get(name) as FormControl;
  }
}
