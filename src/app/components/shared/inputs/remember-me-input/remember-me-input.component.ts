import { Component, Input } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-remember-me-input',
  imports: [CheckboxModule,ReactiveFormsModule],
  templateUrl: './remember-me-input.component.html',
  styleUrl: './remember-me-input.component.scss'
})
export class RememberMeInputComponent {
  private _control = new FormControl(false);

  @Input()
  set control(value: FormControl) {
    this._control = value || new FormControl(false);
  }

  get control(): FormControl {
    return this._control;
  }
}
