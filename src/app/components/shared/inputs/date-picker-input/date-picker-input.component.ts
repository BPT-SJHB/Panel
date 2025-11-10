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
import {
  IDatepickerTheme,
  NgPersianDatepickerModule,
} from 'ng-persian-datepicker';

// 📐 Validation Utilities
import {
  ErrorsValidation,
  getDefaultErrorMessage,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';

const darkTheme: IDatepickerTheme = {
  border: '#393939',
  timeBorder: '#393939',

  background: '#222222',
  text: '#FFFFFF',

  hoverBackground: '#393939',
  hoverText: '#FFFFFF',

  disabledBackground: '#393939',
  disabledText: '#CCCCCC',

  selectedBackground: '#D68E3A',
  selectedText: '#FFFFFF',

  todayBackground: '#FFFFFF',
  todayText: '#2D2D2D',

  otherMonthBackground: 'rgba(0, 0, 0, 0)',
  otherMonthText: '#CCCCCC',
};

const lightTheme: IDatepickerTheme = {
  border: '#E0E0E0',
  timeBorder: '#E0E0E0',

  background: '#FFFFFF',
  text: '#000000',

  hoverBackground: '#F2F2F2',
  hoverText: '#000000',

  disabledBackground: '#F9F9F9',
  disabledText: '#AAAAAA',

  selectedBackground: '#D68E3A',
  selectedText: '#FFFFFF',

  todayBackground: '#2D2D2D',
  todayText: '#FFFFFF',

  otherMonthBackground: 'rgba(0, 0, 0, 0)',
  otherMonthText: '#AAAAAA',
};

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
    return this.control.disabled || this.readOnly;
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

  getDarkThemeIfEnabled(): IDatepickerTheme {
    const html = document.documentElement;
    return html.classList.contains('dark') ? darkTheme : lightTheme;
  }
}
