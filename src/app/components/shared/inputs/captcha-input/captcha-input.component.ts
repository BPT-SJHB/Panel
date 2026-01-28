import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { CaptchaService } from 'app/services/captcha-service/captcha.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import {
  ImageAddon,
  TextInputComponent,
} from '../text-input/text-input.component';
import { uuidV4 } from 'app/utils/uuid';

@Component({
  selector: 'app-captcha-input',
  imports: [
    InputGroupAddonModule,
    MessageModule,
    InputGroupModule,
    ReactiveFormsModule,
    ButtonModule,
    TextInputComponent,
  ],
  templateUrl: './captcha-input.component.html',
  styleUrl: './captcha-input.component.scss',
})
export class CaptchaInputComponent implements OnInit {
  private captchaService = inject(CaptchaService);
  private toast = inject(ToastService);
  private ticketService = inject(TicketServiceManagementService);

  readonly captchaDivId = uuidV4();
  readonly captchaServiceType = input<'default' | 'ticket'>('default');
  readonly sessionIdControl = input(new FormControl(''));
  readonly captchaInputControl = input(new FormControl(''));
  readonly imageAddon = signal<ImageAddon | null>(null);

  readonly disableRefresh = signal<boolean>(false);
  readonly icon = signal<string>('pi pi-spinner');

  ngOnInit(): void {
    this.getCaptchaInformation();
  }

  async getCaptchaInformation() {
    switch (this.captchaServiceType()) {
      case 'ticket':
        await this.getCaptchaTicketService();
        break;
      case 'default':
        await this.getDefaultCaptchaService();
        break;
      default:
        break;
    }
  }

  async getCaptchaTicketService() {
    const response = await this.ticketService.GetCaptcha();
    if (!checkAndToastError(response, this.toast)) {
      this.icon.set('pi pi-file-excel');
      return;
    }

    this.imageAddon.set({
      alt: 'کد امنیتی',
      src: 'data:image/png;base64,' + response.data.image,
    });

    this.sessionIdControl().setValue(response.data.id);
  }

  async getDefaultCaptchaService() {
    const captcha = await this.captchaService.getCaptcha();
    if (!checkAndToastError(captcha, this.toast)) {
      this.icon.set('pi pi-file-excel');
      return;
    }

    this.imageAddon.set({
      alt: 'کد امنیتی',
      src: 'data:image/png;base64,' + captcha.data.Captcha,
    });

    this.sessionIdControl().setValue(captcha.data.SessionId);
  }

  async onRefreshClick() {
    if (this.disableRefresh()) return;

    // add rotation class
    this.rotateRefreshIcon();
    this.disableRefresh.set(true);
    this.icon.set('pi pi-spinner');
    this.imageAddon.set(null);

    // remove rotation class after animation
    await this.getCaptchaInformation();
    setTimeout(() => {
      this.disableRefresh.set(false);
    }, 600);
  }

  rotateRefreshIcon(duration = 600): void {
    const container = document.getElementById(this.captchaDivId);
    if (!container) return;

    const refreshSpan =
      container.querySelector<HTMLSpanElement>('span.pi-refresh');
    if (!refreshSpan) return;

    const classes = ['rotate-360', 'transition-transform', 'duration-600'];

    // Add classes
    refreshSpan.classList.add(...classes);

    // Remove classes after duration
    setTimeout(() => {
      refreshSpan.classList.remove(...classes);
    }, duration);
  }
}
