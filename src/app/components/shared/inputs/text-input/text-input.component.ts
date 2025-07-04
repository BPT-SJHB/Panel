import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

import {
  ErrorsValidation,
  getDefaultErrorMessage,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';

@Component({
  selector: 'app-text-input',
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
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements OnInit, OnChanges {
  
  @Input() control = new FormControl('');
  @Input() validationField: ValidationField | null = null;
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() icon: string = 'pi pi-user';
  @Input() label = '';
  @Input() addonWidth: string | null = null;
  @Input() buttonIcon = '';
  @Input() buttonDisabled = false;
  @Input() type: 'password' | 'text' | 'date' = 'text';
  @Input() datePickerPosition: 'top' | 'bottom' = 'bottom';

  @Output() clickButton = new EventEmitter<void>();
  @Output() input = new EventEmitter<any>();

  
  get firstErrorMessage(): string | null {
    const errors = this.control?.errors as ErrorsValidation;
    if (!this.validationField || !errors) return null;

    const rule = ValidationSchema[this.validationField];
    return getDefaultErrorMessage(rule.name,errors);
  }

  get isDisabled(): boolean {
    return this.control.disabled;
  }

  ngOnInit(): void {
    this.setDisabledState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  onFocusInput(input: HTMLInputElement): void {
    if (this.disabled) {
      input.blur();
    }
  }

  onBlurInput(_: HTMLInputElement): void {
    if (this.readOnly) {
      this.control.markAsUntouched();
    }
  }

  handleClick(): void {
    this.clickButton.emit();
  }
}
