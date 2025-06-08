import { NgClass } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-binary-radio-input',
  imports: [FormsModule, RadioButtonModule, NgClass, ReactiveFormsModule],
  templateUrl: './binary-radio-input.component.html',
  styleUrl: './binary-radio-input.component.scss',
})
export class BinaryRadioInputComponent implements OnInit, OnChanges {
  private _control: FormControl = new FormControl(true);
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() radioName: string = 'radio-option';
  @Input() label: string = '';

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  private setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
