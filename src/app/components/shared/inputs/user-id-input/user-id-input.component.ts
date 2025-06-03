import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-user-id-input',
  imports: [InputGroup, InputGroupAddon, ReactiveFormsModule, NgClass],
  templateUrl: './user-id-input.component.html',
  styleUrl: './user-id-input.component.scss'
})
export class UserIdInputComponent {
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = "کد کاربر"
  @Input() disabled: boolean = false;

  private _control = new FormControl('');

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  get control(): FormControl {
    return this._control;
  }

  onFocusInput(input: HTMLInputElement) {
    if (this.disabled) {
      input.blur();
    }
  }

}
