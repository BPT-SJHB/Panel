import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-username-input',
  imports: [InputGroupModule,InputGroupAddon,ReactiveFormsModule,NgClass,MessageModule],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.scss'
})
export class UsernameInputComponent {
  private _control = new FormControl('');

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  get control(): FormControl {
    return this._control;
  }
}
