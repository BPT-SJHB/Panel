import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UsernameInputComponent } from '../../shared/inputs/username-input/username-input.component';
import { PasswordInputComponent } from '../../shared/inputs/password-input/password-input.component';
import { RememberMeInputComponent } from '../../shared/inputs/remember-me-input/remember-me-input.component';
import { CaptchaInputComponent } from '../../shared/inputs/captcha-input/captcha-input.component';
import { ToastService } from '../../../services/toast-service.service';
import { GetCaptchaService } from '../../../services/GetCaptchaService/get-captcha.service';
import { IGetCaptchaApiResult } from '../../../services/GetCaptchaService/IGetCaptchaApiResult';

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

  constructor(private fb: FormBuilder,private toast: ToastService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captcha: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  async ngOnInit(): Promise<void> {
    this.getCaptchaResult = await this.call_get_captcha();
  }

  async call_get_captcha(): Promise<IGetCaptchaApiResult | undefined> {
    await this.getCaptchaService.GetApiResult();
    return this.getCaptchaService.GetApiResult();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const isSuccess = Math.random() < 0.5;
      if (isSuccess) {
        this.toast.success('موفق', 'ورود موفقیت آمیز بود.');
        this.loginForm.reset();
      } else {
        this.toast.error('خطا', 'نام کاربری یا رمز عبور اشتباه است.');
        this.loginForm.reset();
      }
    }
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  get captcha() {
    return this.loginForm.get('captcha') as FormControl;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe') as FormControl;
  }
}
