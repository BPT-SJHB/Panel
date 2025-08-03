import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputGroup,
    InputGroupAddon,
    NgClass,
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
})
export class SelectInputComponent<T> {
  @Input() options: { label: string; value: T }[] = [];
  @Input() control = new FormControl<T | null>(null);
  @Input() readOnly = false;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() icon: string = 'pi pi-user';
  @Input() label = '';
  @Input() addonWidth: string | null = null;

  compareFn(o1: any, o2: any): boolean {
    return o1 === o2;
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
}
