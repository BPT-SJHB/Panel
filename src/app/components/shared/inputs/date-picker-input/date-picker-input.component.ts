// 📦 Angular Core Imports
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

// 🎯 UI Modules
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

// 📐 Validation Utilities
import {
  ErrorsValidation,
  getDefaultErrorMessage,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';

@Component({
  selector: 'app-date-picker-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    NgClass,
    InputGroupModule,
    InputGroupAddonModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './date-picker-input.component.html',
  styleUrl: './date-picker-input.component.scss',
})
export class DatePickerInput implements OnInit, OnChanges {
  // 📥 Inputs
  @Input() control = new FormControl<unknown>('');
  @Input() validationField: ValidationField | null = null;
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() icon = 'pi pi-calendar';
  @Input() label = '';
  @Input() addonWidth: string | null = null;
  @Input() datePickerPosition: 'top' | 'bottom' = 'bottom';

  // 🔍 Error message display
  get firstErrorMessage(): string | null {
    const errors = this.control?.errors as ErrorsValidation;
    if (!this.validationField || !errors) return null;

    const rule = ValidationSchema[this.validationField];
    return getDefaultErrorMessage(rule.name, errors);
  }

  // 🚫 Control disabled state
  get isDisabled(): boolean {
    return this.control.disabled;
  }

  // 🪄 Lifecycle: OnInit
  ngOnInit(): void {
    this.setDisabledState();
  }

  // 🔁 Lifecycle: OnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  // 🧩 Set control enabled/disabled based on input prop
  setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  // 👁‍🗨 Prevent focus on input if disabled
  onFocusInput(input: HTMLInputElement): void {
    if (this.disabled) {
      input.blur();
    }
  }

  // 🫣 Prevent marking as touched if readonly
  onBlurInput(_: HTMLInputElement): void {
    if (this.readOnly) {
      this.control.markAsUntouched();
    }
  }
}
