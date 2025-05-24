import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { CaptchaService } from 'app/services/captcha-service/captcha.service';
import { ToastService } from 'app/services/toast-service/toast.service';

@Component({
  selector: 'app-captcha-input',
  imports: [
    InputGroupAddonModule,
    MessageModule,
    InputGroupModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './captcha-input.component.html',
  styleUrl: './captcha-input.component.scss',
})


export class CaptchaInputComponent implements OnInit {
  @Input() sessionIdControl: FormControl = new FormControl('');
  @Input() captchaInputControl: FormControl = new FormControl('');
  imageData = '';
  disableRefresh = false;

  constructor(private captchaService: CaptchaService, private toast: ToastService) {

  }

  ngOnInit(): void {
    this.getCaptchaInformation();
  }


  async getCaptchaInformation() {
    const captcha = await this.captchaService.getCaptcha();
    if (!captcha.success || !captcha.data) {
      this.toast.error('خطا', captcha.error?.message ?? "");
      console.log(captcha.error?.details);
      return;
    }

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
