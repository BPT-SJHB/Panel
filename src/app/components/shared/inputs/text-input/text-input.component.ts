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
import { uuidV4 } from 'app/utils/uuid';

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

  @Input() id = uuidV4();
  @Input() control = new FormControl();
  @Input() validationField: ValidationField | null = null;
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() icon = 'pi pi-user';
  @Input() label = '';
  @Input() addonWidth: string | null = null;
  @Input() buttonIcon = '';
  @Input() buttonDisabled = false;
  @Input() type: 'password' | 'text' = 'text';

  @Output() clickButton = new EventEmitter<void>();
  @Output() input = new EventEmitter<HTMLInputElement>();
  @Output() focus = new EventEmitter<HTMLInputElement>();
  @Output() blur = new EventEmitter<HTMLInputElement>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();

  get firstErrorMessage(): string | null {
    if (!this.validationField || !this.control?.errors) return null;
    return getDefaultErrorMessage(
      ValidationSchema[this.validationField].name,
      this.control.errors as ErrorsValidation
    );
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
    this.disabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });
  }

  onFocusInput(input: HTMLInputElement): void {
    if (this.disabled) input.blur();
    this.focus.emit(input);
  }

  onBlurInput(input: HTMLInputElement): void {
    if (this.readOnly) this.control.markAsUntouched();
    this.blur.emit(input);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  handleClick(): void {
    this.clickButton.emit();
  }

  valueChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.input.emit(target);
  }
}
