// 📦 Angular & RxJS Core Imports
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// 🎯 PrimeNG UI Modules
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

// 📐 Validation Utilities
import {
  ErrorsValidation,
  getDefaultErrorMessage,
  ValidationField,
  ValidationSchema,
} from 'app/constants/validation-schema';

@Component({
  selector: 'app-time-picker-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    MessageModule,
    ButtonModule
],
  templateUrl: './time-picker-input.component.html',
  styleUrl: './time-picker-input.component.scss',
})
export class TimePickerInput implements OnInit, OnChanges, OnDestroy {
  // 📥 Inputs
  @Input() control = new FormControl<any>('');
  @Input() validationField: ValidationField | null = null;
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() label: string | undefined;

  // 🕒 Internal time controls
  hour = new FormControl('00');
  minutes = new FormControl('00');
  second = new FormControl('00');

  // 🔁 Cleanup subject for subscriptions
  private destroy$ = new Subject<void>();

  // 🔐 Prevent recursive update loops
  private isInternalUpdate = false;

  // 🧾 Show first validation error (if any)
  get firstErrorMessage(): string | null {
    const errors = this.control?.errors as ErrorsValidation;
    if (!this.validationField || !errors) return null;

    const rule = ValidationSchema[this.validationField];
    return getDefaultErrorMessage(rule.name, errors);
  }

  // ❌ Expose whether parent control is disabled
  get isDisabled(): boolean {
    return this.control.disabled;
  }

  // 🚀 On component init
  ngOnInit(): void {
    this.setDisabledState();

    // ✅ Enforce valid time ranges
    this.enforceTimeRange(this.hour, 0, 23);     // Hours: 00–23
    this.enforceTimeRange(this.minutes, 0, 59);  // Minutes: 00–59
    this.enforceTimeRange(this.second, 0, 59);   // Seconds: 00–59

    // 🔄 Sync parent → internal controls
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (this.isInternalUpdate) return;

        const time = String(value).split(':');
        if (time.length === 3) {
          this.hour.setValue(time[0], { emitEvent: false });
          this.minutes.setValue(time[1], { emitEvent: false });
          this.second.setValue(time[2], { emitEvent: false });
        }
      });
  }

  // 🔄 Handle @Input() changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  // 🧹 Cleanup on destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 🧭 Enable/disable parent control based on @Input()
  private setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  // 👁️ Blur input on focus if disabled
  onFocusInput(input: HTMLInputElement): void {
    if (this.disabled) {
      input.blur();
    }
  }

  // 🧽 Format and prevent touch on readonly
  onBlurInput(control: FormControl): void {
    if (this.readOnly) {
      this.control.markAsUntouched();
      return;
    }

    const val = String(Number(control.value) || '0').padStart(2, '0');
    control.setValue(val, { emitEvent: false });
  }

  // 🚦 Limit value range for a control (e.g., 0–59)
  private enforceTimeRange(
    control: FormControl,
    min: number,
    max: number
  ): void {
    control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      let num = Number(value);

      if (isNaN(num)) {
        control.setValue(min, { emitEvent: false });
        return;
      }

      if (num < min) {
        control.setValue(min, { emitEvent: false });
      } else if (num > max) {
        control.setValue(max, { emitEvent: false });
      }

      this.updateParentControl();
    });
  }

  // ⏫ Auto increment/decrement interval logic
  private changeIntervalId: any = null;

  startContinuousChange(
    control: FormControl,
    min: number,
    max: number,
    mode: 'increment' | 'decrement'
  ) {
    // Start immediately
    if (mode === 'increment') this.increment(control, min, max);
    else this.decrement(control, min, max);

    // Continue every 200ms
    this.changeIntervalId = setInterval(() => {
      if (mode === 'increment') this.increment(control, min, max);
      else this.decrement(control, min, max);
    }, 200);
  }

  stopContinuousChange() {
    if (this.changeIntervalId) {
      clearInterval(this.changeIntervalId);
      this.changeIntervalId = null;
    }
  }

  // ➕ Increase time value
  increment(control: FormControl, min: number, max: number) {
    let val = Number(control.value);
    if (isNaN(val)) val = min;
    else if (val >= max) val = 0;
    else val++;

    control.setValue(String(val).padStart(2, '0'), { emitEvent: false });
    this.updateParentControl();
  }

  // ➖ Decrease time value
  decrement(control: FormControl, min: number, max: number) {
    let val = Number(control.value);
    if (isNaN(val)) val = min;
    else if (val <= min) val = max;
    else val--;

    control.setValue(String(val).padStart(2, '0'), { emitEvent: false });
    this.updateParentControl();
  }

  // 🔄 Sync internal → parent control
  private updateParentControl() {
    const h = String(this.hour.value).padStart(2, '0');
    const m = String(this.minutes.value).padStart(2, '0');
    const s = String(this.second.value).padStart(2, '0');

    const timeString = `${h}:${m}:${s}`;

    this.isInternalUpdate = true;
    this.control.setValue(timeString, { emitEvent: false });
    this.isInternalUpdate = false;
  }
}
