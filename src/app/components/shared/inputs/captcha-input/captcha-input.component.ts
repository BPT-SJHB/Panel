import { NgClass } from '@angular/common';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { CaptchaService } from 'app/services/captcha-service/captcha.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { checkAndToastError } from 'app/utils/api-utils';

@Component({
  selector: 'app-captcha-input',
  imports: [
    InputGroupAddonModule,
    MessageModule,
    InputGroupModule,
    ReactiveFormsModule,
    NgClass,
    ButtonModule,
  ],
  templateUrl: './captcha-input.component.html',
  styleUrl: './captcha-input.component.scss',
})
export class CaptchaInputComponent implements OnInit {
  private captchaService = inject(CaptchaService);
  private toast = inject(ToastService);
  private ticketService = inject(TicketServiceManagementService);

  readonly captchaServiceType = input<'default' | 'ticket'>('default');
  @Input() sessionIdControl: FormControl = new FormControl('');
  @Input() captchaInputControl: FormControl = new FormControl('');

  imageData = '';
  disableRefresh = false;

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
    if (!checkAndToastError(response, this.toast)) return;

    this.imageData = 'data:image/png;base64,' + response.data.image;
    this.sessionIdControl.setValue(response.data.id);
  }

  async getDefaultCaptchaService() {
    const captcha = await this.captchaService.getCaptcha();
    if (!checkAndToastError(captcha, this.toast)) return;

    this.imageData = 'data:image/png;base64,' + captcha.data.imageData;
    this.sessionIdControl.setValue(captcha.data.sessionId);
  }

  async onRefreshClick() {
    if (this.disableRefresh) return;

    this.disableRefresh = true;
    await this.getCaptchaInformation();

    setTimeout(() => {
      this.disableRefresh = false;
    }, 1000);
  }
}
