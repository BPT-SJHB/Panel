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
import { UsernameInputComponent } from '../../shared/inputs/username-input/username-input.component';
import { PasswordInputComponent } from '../../shared/inputs/password-input/password-input.component';
import { RememberMeInputComponent } from '../../shared/inputs/remember-me-input/remember-me-input.component';
import { CaptchaInputComponent } from '../../shared/inputs/captcha-input/captcha-input.component';
import { ToastService } from '../../../services/toast-service/toast-service.service';
import { CryptographyService } from '../../../services/cryptography-service/cryptography.service';
import { UserAuthService } from '../../../services/user-auth-service/user-auth.service';
import { APP_ROUTES } from '../../../constants/routes';

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
      captchaId: ['', [Validators.required]],
      captchaValue: ['', [Validators.required]],
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
      captcha: {
        id: formValue.captchaId,
        value: formValue.captchaValue,
      },
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

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  get captchaId() {
    return this.loginForm.get('captchaId') as FormControl;
  }

  get captchaValue() {
    return this.loginForm.get('captchaValue') as FormControl;
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe') as FormControl;
  }


  public async resetLoginForm(){
    this.password.reset();
    this.username.reset();
    // کپچای جدید
    this.captchaValue.reset();
    this.captchaValue.reset();
    await this.captchaComponent.getCaptchaInformation();
  }
}
