import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { CaptchaInputComponent } from '../inputs/captcha-input/captcha-input.component';
import { TextAreaInputComponent } from '../inputs/text-area-input/text-area-input.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-support-button',
  imports: [
    ScrollTopModule,
    ButtonModule,
    PopoverModule,
    CaptchaInputComponent,
    TextAreaInputComponent,
    DialogModule,
  ],
  templateUrl: './support-button.component.html',
  styleUrl: './support-button.component.scss',
})
export class SupportButtonComponent {
  dialog: boolean = false;
  visible: boolean = false;

  constructor(
    private auth: UserAuthService,
    private toast: ToastService,
    private router: Router
  ) {}
  async showDialog() {
    await this.auth.isLoggedIn();
    this.visible = true;
  }
  showTicketDialog() {
    this.dialog = true;
    this.visible = false;
  }

  submitTicket() {
    this.toast.success('تیکت ارسال شد', 'لطفا منتظر جواب همکاران ما باشد.');
    this.dialog = false;
  }

  copyToClipboard() {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
  }
}
