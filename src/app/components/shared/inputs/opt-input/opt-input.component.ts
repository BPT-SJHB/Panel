import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-opt-input',
  imports: [NgOtpInputComponent, ReactiveFormsModule],
  templateUrl: './opt-input.component.html',
  styleUrl: './opt-input.component.scss',
})
export class OptInputComponent {
  readonly control = input(new FormControl<string | null>(''));
  readonly length = input<number>(6);
}
