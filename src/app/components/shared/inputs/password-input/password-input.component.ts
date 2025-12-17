import { Component, input, output, signal } from '@angular/core';
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
  readonly control = input(new FormControl<string | null>(''));
  readonly validationField = input<ValidationField | null>('password');
  readonly placeholder = input('رمز عبور');
  readonly readOnly = input(false);
  readonly disabled = input(false);
  readonly icon = input('pi pi-user');
  readonly label = input('');
  readonly addonWidth = input<string | null>(null);
  readonly hidePassword = signal(true);

  readonly togglePasswordVisibility = output<boolean>();

  togglePassword(): void {
    this.hidePassword.update((hp) => !hp);
    this.togglePasswordVisibility.emit(this.hidePassword());
  }
}
