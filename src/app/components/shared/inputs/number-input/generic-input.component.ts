import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import {
  ErrorsValidation,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

@Component({
  selector: 'app-generic-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    NgClass,
    InputGroupModule,
    InputGroupAddonModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
})
export class GenericInputComponent {

  private _control = new FormControl(null);

  @Input() validationField: ValidationField | null = null;
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = 'pi pi-user';
  @Input() label: string = '';
  @Input() addonWidth: string | null = null;
  @Input() buttonIcon = '';
  @Input() buttonDisabled: boolean = false;
  @Input() type:"text" | "date" = "text"

  @Output() clickButton = new EventEmitter<void>();

  @Input()
  set control(value: FormControl) {
    this._control = value ?? new FormControl(null);
  }

  get control(): FormControl {
    return this._control;
  }

  get firstErrorMessage(): string | null {
    const errors = this.control?.errors as ErrorsValidation;
    if (!this.validationField || !errors) return null;

    const rule = ValidationSchema[this.validationField];
    return rule?.getErrorMessage(errors) ?? null;
  }

  onFocusInput(input: HTMLInputElement) {
    if (this.disabled) {
      input.blur();
    }

  }

  onBlurInput(_: HTMLInputElement) {
    if (this.readOnly) {
      this.control.markAsUntouched();
    }
  }

  handleClick() {
    console.log("click");
    this.clickButton.emit();
  }
}
