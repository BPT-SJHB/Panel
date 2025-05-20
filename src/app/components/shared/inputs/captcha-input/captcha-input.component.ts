import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

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
export class CaptchaInputComponent {
  private _control = new FormControl('');

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  }

  get control(): FormControl {
    return this._control;
  }
}
