import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from 'app/services/toast-service/toast.service';
import { appTitles } from 'app/constants/Titles';
import { ValidationSchema } from 'app/constants/validation-schema';
import { TextInputComponent } from "../../shared/inputs/text-input/text-input.component";

@Component({
  selector: 'app-forget-password-form',
  imports: [ButtonModule,  ReactiveFormsModule, TextInputComponent],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss',
})
export class ForgetPasswordFormComponent {
  forgetPasswordForm: FormGroup;
  forgetPasswordTitle: string = appTitles.appBrokenTitle;
  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const isSuccess = Math.random() < 0.5;
      if (isSuccess) {
        this.toast.success('موفق', "رمز عبور شما ارسال گردید.It's default");
        this.forgetPasswordForm.reset();
      } else {
        this.toast.error(
          'خطا',
          "شماره تلفن مورد نظر در سامانه یافت نشد.It's default"
        );
        this.forgetPasswordForm.reset();
      }
    }
  }

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.forgetPasswordForm = this.fb.group({
      phone: ['', ValidationSchema.mobile],
    });
  }

  get phone() {
    return this.forgetPasswordForm.get('phone') as FormControl;
  }
}
