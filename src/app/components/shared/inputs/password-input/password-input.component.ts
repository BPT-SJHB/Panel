import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [InputGroupModule, ReactiveFormsModule,InputGroupAddonModule,NgClass],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  hidePassword = true;

  private _control = new FormControl('');

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl('');
  }

  get control(): FormControl {
    return this._control;
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
