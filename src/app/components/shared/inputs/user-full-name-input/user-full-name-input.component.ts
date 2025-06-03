import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-user-full-name-input',
  imports: [InputGroupModule,InputGroupAddon,ReactiveFormsModule,NgClass,MessageModule],
  templateUrl: './user-full-name-input.component.html',
  styleUrl: './user-full-name-input.component.scss'
})
export class UserFullNameInputComponent {
  private _control = new FormControl('');
  
  @Input() placeholder:string = '';
  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  get control(): FormControl {
    return this._control;
  }
}
