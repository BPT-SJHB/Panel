import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {  InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-phone-input',
  imports: [NgClass,InputGroupAddon,InputGroupModule,ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent {
  private _control = new FormControl('');

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  get control(): FormControl {
    return this._control;
  }
}
