import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-input',
  imports: [CheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox-input.component.html',
  styleUrl: './checkbox-input.component.scss',
})
export class CheckboxInputComponent implements OnInit, OnChanges {
  @Input() control: FormControl = new FormControl(false);
  @Input() label: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputId: string = 'checkbox-input';

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
}
