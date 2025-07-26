import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-binary-radio-input',
  imports: [
    FormsModule,
    RadioButtonModule,
    NgClass,
    ReactiveFormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './binary-radio-input.component.html',
  styleUrl: './binary-radio-input.component.scss',
})
export class BinaryRadioInputComponent
  implements OnInit, OnChanges, AfterViewInit
{
  private _control: FormControl = new FormControl(true);
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() radioName: string = 'radio-option';
  @Input() label: string = '';

  private readonly baseStyles = {
    root: {
      width: '3.5rem',
      height: '2rem',
      shadow: '0 4px 8px rgba(0,0,0,0.4)',
      borderColor: 'var(--p-surface-400)',
      borderWidth: '1px',
      borderStyle: 'solid',
      checkedHoverBackground: 'var(--p-emerald-500)',
    },
    handle: {
      size: '1.5rem',
      // For dark theme
      checkedBackground: 'var(--p-stone-50)',
      checkedHoverBackground: 'var(--p-stone-50)',
    },
  };

  private readonly shadowColors = {
    active: '0 4px 8px var(--p-green-500)',
    inactive: '0 4px 8px rgba(0,0,0,0.4)',
  };

  customToggleSwitchTokens = signal(this.baseStyles);

  preventIfReadonly(event: Event): void {
    if (this.readonly) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl(true);
  }

  get control(): FormControl {
    return this._control;
  }

  ngOnInit(): void {
    this.setDisabledState();
    this.setShadowColor(this.control.value);
  }

  ngAfterViewInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.setShadowColor(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  private setShadowColor(status: boolean) {
    this.customToggleSwitchTokens.update((currentTokens) => ({
      ...currentTokens,
      root: {
        ...currentTokens.root,
        shadow: status ? this.shadowColors.active : this.shadowColors.inactive,
      },
    }));
  }

  private setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
