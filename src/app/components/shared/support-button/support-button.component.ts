import { Component, inject, signal } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToastService } from 'app/services/toast-service/toast.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../button/button.component';
import { copyTextAndToast } from 'app/utils/copy-text';
import { AppTitles } from 'app/constants/Titles';
import { TicketGuardCaptchaFormComponent } from 'app/components/forms/tickets-management-form/ticket-guard-captcha-form/ticket-guard-captcha-form.component';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';

@Component({
  selector: 'app-support-button',
  imports: [
    ScrollTopModule,
    ButtonModule,
    PopoverModule,
    DialogModule,
    ButtonComponent,
    TicketGuardCaptchaFormComponent,
  ],
  templateUrl: './support-button.component.html',
  styleUrl: './support-button.component.scss',
})
export class SupportButtonComponent {
  readonly AppTitle = AppTitles;
  private toast = inject(ToastService);
  private readonly router = inject(Router);
  readonly activeCaptcha = signal<boolean>(false);
  readonly captchaAction = signal<() => void>(() => undefined);
  readonly APP_ROUTS = APP_ROUTES;
  dialog = false;
  visible = false;

  readonly contactList = signal<{ title: string; numbers: string[] }[]>([
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
  ]);

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
    copyTextAndToast(text, this.toast);
  }

  redirectUrl(route: string) {
    this.captchaAction.set(() => {
      const url = this.router.serializeUrl(this.router.createUrlTree([route]));
      window.open(url, '_blank');
      this.activeCaptcha.set(false);
      this.dialog = false;
      this.visible = false;
    });
    this.activeCaptcha.set(true);
  }
}
