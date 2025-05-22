import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PhoneInputComponent } from "../../shared/inputs/phone-input/phone-input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast-service/toast-service.service';

@Component({
  selector: 'app-forget-password-form',
  imports: [ButtonModule, PhoneInputComponent,ReactiveFormsModule],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss'
})
export class ForgetPasswordFormComponent {
forgetPasswordForm: FormGroup;
onSubmit(): void {
  if (this.forgetPasswordForm.valid) {
    const isSuccess = Math.random() < 0.5;
    if (isSuccess) {
      this.toast.success("موفق","رمز عبور شما ارسال گردید.It's default")
      this.forgetPasswordForm.reset();
    } else {
      this.toast.error("خطا","شماره تلفن مورد نظر در سامانه یافت نشد.It's default")
      this.forgetPasswordForm.reset();
    }
  }
}

  constructor(private fb: FormBuilder,private toast: ToastService) {
    this.forgetPasswordForm = this.fb.group({
      phone: ['',
        [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}")
      ]],
    });
  }

  get phone() {
    return this.forgetPasswordForm.get('phone') as FormControl;
  }

}
