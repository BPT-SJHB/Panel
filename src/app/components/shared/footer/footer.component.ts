import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PopoverModule } from 'primeng/popover';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { UsernameInputComponent } from '../inputs/username-input/username-input.component';
import { PasswordInputComponent } from '../inputs/password-input/password-input.component';
import { CaptchaInputComponent } from '../inputs/captcha-input/captcha-input.component';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { TextAreaInputComponent } from '../inputs/text-area-input/text-area-input.component';
import { APP_ROUTES } from 'app/constants/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    CardModule,
    ButtonModule,
    DividerModule,
    PopoverModule,
    DialogModule,
    UsernameInputComponent,
    PasswordInputComponent,
    CaptchaInputComponent,
    TextareaModule,
    TextAreaInputComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  dialog: boolean = false;

  constructor(
    private auth: UserAuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  async showDialog() {
    this.dialog = true;
    if (!(await this.auth.isLoggedIn()).success) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }
  }

  submitTicket() {
    this.toast.success('تیکت ارسال شد', 'لطفا منتظر جواب همکاران ما باشد.');
    this.dialog = false;
  }

  copyToClipboard() {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
  }
}
