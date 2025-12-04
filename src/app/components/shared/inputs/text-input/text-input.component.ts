import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  ElementRef,
  ViewChild,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { ToastService } from 'app/services/toast-service/toast.service';
import { formatCarPlate } from 'app/utils/format.utils';

export interface ImageAddon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgPersianDatepickerModule,
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
  readonly id = input<string | null>(null);
  readonly control = input(new FormControl());
  readonly validationField = input<ValidationField | null>(null);
  readonly placeholder = input('');
  readonly readOnly = input(false);
  readonly disabled = input(false);
  readonly icon = input('pi pi-user');
  readonly label = input('');
  readonly imageAddon = input<ImageAddon | null>(null);
  readonly addonWidth = input<string | null>(null);
  readonly buttonIcon = input('');
  readonly buttonDisabled = input(false);
  readonly buttonClass = input<string>('');
  readonly type = input<'password' | 'text' | 'number'>('text');
  readonly language = input<'fa' | 'en' | 'any'>('fa');
  readonly format = input<'none' | 'currency' | 'carPlate'>('none');
  readonly autocomplete = input<'on' | 'off'>('on');

  // ========= OUTPUTS =========
  readonly clickButton = output<void>();
  readonly input = output<HTMLInputElement>();
  readonly focus = output<HTMLInputElement>();
  readonly blur = output<HTMLInputElement>();
  readonly keydown = output<KeyboardEvent>();

  // ========= STATE =========
  validationMessage: string | null = null;
  private sub!: Subscription;
  private lastToastTime = 0; // timestamp of last toast shown
  private readonly separator = ',';

  // ========= LIFECYCLE HOOKS =========
  ngOnInit(): void {
    this.setDisabledState();

    // Subscribe to control changes for formatting
    this.sub = this.control().valueChanges.subscribe((value) => {
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
    const validation = this.validationField();

    if (!validation || !this.control().errors) return null;
    return getDefaultErrorMessage(
      ValidationSchema[validation].name,
      this.control().errors as ErrorsValidation
    );
  }

  get isDisabled(): boolean {
    return this.control().disabled;
  }

  getType(): string {
    return this.type() === 'number' ? 'text' : this.type();
  }

  // ========= STATE MANAGEMENT =========
  setDisabledState(): void {
    const isDisabled = this.disabled();
    if (isDisabled) this.control().disable({ emitEvent: false });
    else this.control().enable({ emitEvent: false });
  }

  // ========= EVENT HANDLERS =========
  onFocusInput(input: HTMLInputElement): void {
    if (this.disabled()) input.blur();
    this.focus.emit(input);
  }

  onBlurInput(input: HTMLInputElement): void {
    if (this.readOnly()) this.control().markAsUntouched();
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
    if (this.type() === 'number') {
      const raw = this.getNumberFromInput(value);
      const start = input.selectionStart ?? 0;

      if (raw !== input.value) {
        this.control().setValue(raw, { emitEvent: false });
        input.value = raw;
        const newPos = Math.min(raw.length, start);
        input.setSelectionRange(newPos, newPos);
      }
      return;
    }

    // --- language enforcement (text only) ---

    if (this.language() === 'fa') {
      // Allow Persian letters, Persian and English digits, spaces, and common symbols
      const allowedPattern =
        /^[\u0600-\u06FF\u06F0-\u06F9 0-9\s.,!?()[\]{}<>'"@#$%^&*_+=|\\/-]*$/;
      const isTextPersian = allowedPattern.test(input.value);

      if (!isTextPersian) {
        // Remove all disallowed characters
        input.value = input.value.replace(
          /[^\u0600-\u06FF\u06F0-\u06F9 0-9\s.,!?()[\]{}<>'"@#$%^&*_+=|\\/-]/g,
          ''
        );
      }

      // 🔢 Convert English digits (0–9) → Persian digits (۰–۹)
      input.value = input.value.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

      this.control().setValue(input.value, { emitEvent: false });

      if (canShowToast && !isTextPersian) {
        this.tost.warn('تغییر زبان', 'زبان کیبورد خود را فارسی کنید.');
        this.lastToastTime = now;
      }
    }

    if (this.language() === 'en') {
      // Allow English letters, English digits, spaces, and common symbols
      const englishRegex = /^[A-Za-z0-9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]*$/;
      if (!englishRegex.test(input.value)) {
        input.value = input.value.replace(
          /[^A-Za-z0-9\s.,!?(){}[\]<>;:'"@#$%^&*_+=|\\/-]/g,
          ''
        );
        this.control().setValue(input.value, { emitEvent: false });

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

    if (this.format() === 'currency') {
      const num = Number(this.getNumberFromInput(value));
      this.control().setValue(num.toString(), { emitEvent: false });
      inputEl.value = this.formatCurrency(num.toString());
    }

    if (this.format() === 'carPlate' && value.length >= 8) {
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
