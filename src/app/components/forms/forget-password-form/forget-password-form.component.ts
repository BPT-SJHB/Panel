import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PhoneInputComponent } from "../../shared/inputs/phone-input/phone-input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password-form',
  imports: [ButtonModule, PhoneInputComponent,ReactiveFormsModule],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss'
})
export class ForgetPasswordFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['',
        [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}")
      ]],
    });
  }

  get phone() {
    return this.form.get('phone') as FormControl;
  }

}
