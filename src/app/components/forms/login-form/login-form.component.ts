import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UsernameInputComponent } from '../../shared/inputs/username-input/username-input.component';
import { PasswordInputComponent } from '../../shared/inputs/password-input/password-input.component';
import { RememberMeInputComponent } from '../../shared/inputs/remember-me-input/remember-me-input.component';
import { CaptchaInputComponent } from '../../shared/inputs/captcha-input/captcha-input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    UsernameInputComponent,
    PasswordInputComponent,
    RememberMeInputComponent,
    CaptchaInputComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captcha: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get captcha() {
    return this.form.get('captcha') as FormControl;
  }

  get rememberMe() {
    return this.form.get('rememberMe') as FormControl;
  }
}
