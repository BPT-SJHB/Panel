import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordInputComponent } from 'app/components/shared/inputs/password-input/password-input.component';
import { CaptchaInputComponent } from 'app/components/shared/inputs/captcha-input/captcha-input.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { CryptographyService } from 'app/services/cryptography-service/cryptography.service';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { APP_ROUTES } from 'app/constants/routes';
import { appTitles } from 'app/constants/Titles';
import { TextInputComponent } from '../../shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { CheckboxInputComponent } from '../../shared/inputs/checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CaptchaInputComponent,
    TextInputComponent,
    PasswordInputComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private userAuth = inject(UserAuthService);
  private cryptography = inject(CryptographyService);
  private router = inject(Router);

  @ViewChild('captchaRef') captchaComponent!: CaptchaInputComponent;
  hrefForgetPassword: string = APP_ROUTES.AUTH.FORGET_PASSWORD;
  loginTitle: string = appTitles.appBrokenTitle;
  loginForm = this.fb.group({
    username: ['', ValidationSchema.username],
    password: ['', ValidationSchema.password],
    sessionId: ['', [Validators.required]],
    captcha: ['', [Validators.required]],
    rememberMe: [true],
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;
    const loginResult = await this.userAuth.login({
      username: this.cryptography.SHA256(formValue.username!),
      password: this.cryptography.SHA256(formValue.password!),
      rememberMe: formValue?.rememberMe!,
      sessionId: formValue?.sessionId!,
      captcha: formValue?.captcha!,
    });

    if (loginResult.success || !loginResult.error) {
      this.toast.success('موفق', 'ورود موفقیت آمیز بود.');
      this.router.navigate([APP_ROUTES.DASHBOARD.HOME]);
      return;
    }

    this.toast.error('خطا', loginResult.error?.message);
    await this.resetLoginForm();
  }

  public async resetLoginForm(): Promise<void> {
    this.password.reset();
    this.username.reset();
    this.captcha.reset();
    this.sessionId.reset();
    await this.captchaComponent.getCaptchaInformation();
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  get sessionId() {
    return this.loginForm.get('sessionId') as FormControl;
  }

  get captcha() {
    return this.loginForm.get('captcha') as FormControl;
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe') as FormControl;
  }
}
