import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UsernameInputComponent } from 'app/components/shared/inputs/username-input/username-input.component';
import { PasswordInputComponent } from 'app/components/shared/inputs/password-input/password-input.component';
import { RememberMeInputComponent } from 'app/components/shared/inputs/remember-me-input/remember-me-input.component';
import { CaptchaInputComponent } from 'app/components/shared/inputs/captcha-input/captcha-input.component';
import { ToastService } from 'app/services/toast-service/toast.service';
import { CryptographyService } from 'app/services/cryptography-service/cryptography.service';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { APP_ROUTES } from 'app/constants/routes';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    UsernameInputComponent,
    PasswordInputComponent,
    RememberMeInputComponent,
    CaptchaInputComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hrefForgetPassword:string = APP_ROUTES.AUTH.FORGET_PASSWORD;
  @ViewChild('captchaRef') captchaComponent!: CaptchaInputComponent;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private userAuth: UserAuthService,
    private cryptography: CryptographyService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      sessionId: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;

    const loginResult = await this.userAuth.login({
      username: await this.cryptography.SHA256(formValue.username),
      password: await this.cryptography.SHA256(formValue.password),
      rememberMe: formValue.rememberMe,
      sessionId: formValue.sessionId,
      captcha: formValue.captchaValue,
    });

    if (loginResult.success || !loginResult.error) {
      this.toast.success('موفق', 'ورود موفقیت آمیز بود.');
      this.router.navigate([APP_ROUTES.DASHBOARD.HOME]);
      return;
    }


    this.toast.error('خطا', loginResult.error?.message);
    console.log(loginResult.error.details);
    await this.resetLoginForm();
  }

  public async resetLoginForm() {
    this.password.reset();
    this.username.reset();
    this.captcha.reset();
    this.sessionId.reset();

    // این خط، تابعی از کامپوننت کپچا را فراخوانی می‌کند تا یک تصویر جدید کپچا به همراه sessionId جدید تولید شود.
    // این کار زمانی انجام می‌شود که کاربر رمز عبور اشتباه وارد کرده تا از حملات brute-force جلوگیری شود.
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
