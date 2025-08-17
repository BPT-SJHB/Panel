import { Component, inject } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToastService } from 'app/services/toast-service/toast.service';
import { CaptchaInputComponent } from '../inputs/captcha-input/captcha-input.component';
import { TextAreaInputComponent } from '../inputs/text-area-input/text-area-input.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-support-button',
  imports: [
    ScrollTopModule,
    ButtonModule,
    PopoverModule,
    CaptchaInputComponent,
    TextAreaInputComponent,
    DialogModule,
    ButtonComponent,
  ],
  templateUrl: './support-button.component.html',
  styleUrl: './support-button.component.scss',
})
export class SupportButtonComponent {
  dialog = false;
  visible = false;

  private toast = inject(ToastService);

  contactList: { title: string; numbers: string[] }[] = [
    {
      title: 'انجمن صنفی کـارفرمایی کـامیونداران',
      numbers: ['03133869199', '09944433611'],
    },
    {
      title: 'انجمن صنفی شرکت‌های حمل و نقل',
      numbers: ['03134721839', '03133869114'],
    },
    {
      title: 'انـجـمـن صـنـفـی کـارگـری رانـنـدگـان',
      numbers: ['03133873858', '09134727572'],
    },
  ];

  async showDialog() {
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

  async copyToClipboard(text: string) {
    try {
      // Normal browsers
      await navigator.clipboard.writeText(text);
      this.toast.success('متن در کلیپبورد ذخیره شد', '');
    } catch (err) {
      // Mobile browsers
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = text;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      this.toast.success('متن در کلیپبورد ذخیره شد', '');
    }
  }
}
