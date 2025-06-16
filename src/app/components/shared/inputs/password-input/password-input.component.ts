import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { TextInputComponent } from '../text-input/text-input.component';
import { ValidationField } from 'app/constants/validation-schema';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    InputGroupModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    MessageModule,
    TextInputComponent,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() validationField: ValidationField | null = null;
  @Input() placeholder: string = 'رمز عبور';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = 'pi pi-user';
  @Input() label: string = '';
  @Input() addonWidth: string | null = null;

  hidePassword: boolean = true;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
