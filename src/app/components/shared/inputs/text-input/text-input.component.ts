import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { Subscription } from 'rxjs';
import {
  ErrorsValidation,
  getDefaultErrorMessage,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';
import { uuidV4 } from 'app/utils/uuid';
import { ToastService } from 'app/services/toast-service/toast.service';
import { formatCarPlate } from 'app/utils/format.utils';

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
export class TextInputComponent implements OnInit, OnChanges, OnDestroy {
  // ========= VIEW CHILD =========
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  // ========= SERVICES =========
  private tost = inject(ToastService);

  // ========= INPUTS =========
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
  @Input() type: 'password' | 'text' | 'number' = 'text';
  @Input() language: 'fa' | 'en' | 'any' = 'fa';
  @Input() format: 'none' | 'currency' | 'carPlate' = 'none';

  // ========= OUTPUTS =========
  @Output() clickButton = new EventEmitter<void>();
  @Output() input = new EventEmitter<HTMLInputElement>();
  @Output() focus = new EventEmitter<HTMLInputElement>();
  @Output() blur = new EventEmitter<HTMLInputElement>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();

  // ========= STATE =========
  validationMessage: string | null = null;
  private sub!: Subscription;
  private lastToastTime = 0; // timestamp of last toast shown
  private readonly separator = ',';

  // ========= LIFECYCLE HOOKS =========
  ngOnInit(): void {
    this.setDisabledState();

    // Subscribe to control changes for formatting
    this.sub = this.control.valueChanges.subscribe((value) => {
      this.applyFormat(value?.toString() ?? '');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // ========= GETTERS =========
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

  getType(): string {
    return this.type === 'number' ? 'text' : this.type;
  }

  // ========= STATE MANAGEMENT =========
  setDisabledState(): void {
    this.disabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });
  }

  // ========= EVENT HANDLERS =========
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

  valueChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.sanitizeInput(target);
    this.applyFormat(target.value);
    this.input.emit(target);
  }

  // ========= INPUT SANITIZATION =========
  private sanitizeInput(input: HTMLInputElement): void {
    const now = Date.now();
    const canShowToast = now - this.lastToastTime > 4000;

    const value = input.value;
    // --- number type ---
    if (this.type === 'number') {
      const raw = this.getNumberFromInput(value);
      const start = input.selectionStart ?? 0;

      if (raw !== input.value) {
        this.control.setValue(raw, { emitEvent: false });
        input.value = raw;
        const newPos = Math.min(raw.length, start);
        input.setSelectionRange(newPos, newPos);
      }
      return;
    }

    // --- language enforcement (text only) ---
    if (this.language === 'fa') {
      // Allow Persian letters, Persian digits, spaces, and common symbols
      const persianRegex =
        /^[\u0600-\u06FF\u06F0-\u06F9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]*$/;
      if (!persianRegex.test(input.value)) {
        input.value = input.value.replace(
          /[^\u0600-\u06FF\u06F0-\u06F9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]/g,
          ''
        );
        this.control.setValue(input.value, { emitEvent: false });

        if (canShowToast) {
          this.tost.warn('تغییر زبان', 'زبان کیبورد خود را فارسی کنید.');
          this.lastToastTime = now;
        }
      }
    }

    if (this.language === 'en') {
      // Allow English letters, English digits, spaces, and common symbols
      const englishRegex = /^[A-Za-z0-9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]*$/;
      if (!englishRegex.test(input.value)) {
        input.value = input.value.replace(
          /[^A-Za-z0-9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]/g,
          ''
        );
        this.control.setValue(input.value, { emitEvent: false });

        if (canShowToast) {
          this.tost.warn('تغییر زبان', 'زبان کیبورد خود را انگلیسی کنید.');
          this.lastToastTime = now;
        }
      }
    }
  }

  // ========= FORMATTING =========
  private applyFormat(value: string): void {
    const inputEl = this.inputRef?.nativeElement;
    if (!inputEl) return;

    if (this.format === 'currency') {
      const num = Number(this.getNumberFromInput(value));
      this.control.setValue(num, { emitEvent: false });
      inputEl.value = this.formatCurrency(num.toString());
    }

    if (this.format === 'carPlate' && value.length >= 8) {
      const plate = value.slice(0, -2);
      const serial = value.slice(-2);
      inputEl.value = this.formatCurrency(formatCarPlate(plate, serial));
    }
  }

  private formatCurrency(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
  }

  private getNumberFromInput(value: string): string {
    let raw = '';
    for (const ch of value) {
      if (ch >= '0' && ch <= '9') {
        // English digits
        raw += ch;
      } else if (ch >= '۰' && ch <= '۹') {
        // Persian digits → convert to English
        raw += String.fromCharCode(
          ch.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0)
        );
      }
    }
    return raw;
  }
}
