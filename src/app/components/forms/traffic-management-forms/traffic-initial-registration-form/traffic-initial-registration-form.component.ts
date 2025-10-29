import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';
import {
  SelectInputComponent,
  SelectOption,
} from 'app/components/shared/inputs/select-input/select-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';

@Component({
  selector: 'app-traffic-initial-registration-form',
  imports: [TextInputComponent, SelectInputComponent, ButtonComponent],
  templateUrl: './traffic-initial-registration-form.component.html',
  styleUrl: './traffic-initial-registration-form.component.scss',
})
export class TrafficInitialRegistrationFormComponent extends BaseLoading {
  // === Injected services ===
  private readonly fb = inject(FormBuilder);
  private readonly trafficService = inject(TrafficManagementService);

  // === Signals ===
  readonly trafficCardTypeOptions = signal<SelectOption<number>[]>([]);
  readonly trafficCardTempTypeOptions = signal<SelectOption<number>[]>([]);

  // === Constants ===
  readonly addonWith = '7rem';

  // === Form definition ===
  readonly registerForm = this.fb.group({
    cardNumber: this.fb.nonNullable.control(
      this.generateCardNumber(),
      ValidationSchema.trafficCard
    ),
    trafficCardTypeId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
    trafficCardTempTypeId: this.fb.control<number | null>(
      null,
      Validators.required
    ),
  });

  override ngOnInit(): void {
    super.ngOnInit();
    // you could preload data here if needed:
    this.loadCardSelections();
  }

  // === Helpers ===
  ctrl<T>(name: keyof typeof this.registerForm.controls): FormControl<T> {
    return this.registerForm.get(name) as FormControl<T>;
  }

  resetForm(): void {
    this.registerForm.reset({ cardNumber: this.generateCardNumber() });
  }

  async registerCard(): Promise<void> {
    if (this.loading() || this.registerForm.invalid) return;

    await this.withLoading(async () => {
      const cardNumber = this.ctrl<string>('cardNumber').value;
      const typeId = this.ctrl<number>('trafficCardTypeId').value;
      const tempTypeId = this.ctrl<number>('trafficCardTempTypeId').value;

      const response = await this.trafficService.RegisterTrafficCard(
        cardNumber,
        typeId,
        tempTypeId
      );
      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
      this.resetForm();
    });
  }

  // === Private utilities ===
  private generateCardNumber(): string {
    const chars: string[] = [];
    const randomChar = (min: number, max: number) =>
      String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);

    // Add letters (upper/lower) and digits
    for (let i = 0; i < 2; i++) chars.push(randomChar(65, 90)); // A–Z
    for (let i = 0; i < 2; i++) chars.push(randomChar(97, 122)); // a–z
    for (let i = 0; i < 2; i++) chars.push(randomChar(48, 57)); // 0–9

    // Shuffle characters and join
    return chars.sort(() => Math.random() - 0.5).join('');
  }

  private async loadCardSelections(): Promise<void> {
    await Promise.all([
      this.loadTrafficCardTypes(),
      this.loadTrafficCardTempTypes(),
    ]);
  }

  private async loadTrafficCardTypes(): Promise<void> {
    const response = await this.trafficService.GetTrafficCardTypes();
    if (!checkAndToastError(response, this.toast)) return;

    const options = response.data.map((tc) => ({
      label: tc.TrafficCardTypeTitle,
      value: tc.TrafficCardTypeId,
    }));
    this.trafficCardTypeOptions.set(options);
  }

  private async loadTrafficCardTempTypes(): Promise<void> {
    const response = await this.trafficService.GetTrafficCardTempTypes();
    if (!checkAndToastError(response, this.toast)) return;

    const options = response.data.map((tc) => ({
      label: tc.TrafficCardTempTypeTitle,
      value: tc.TrafficCardTempTypeId,
    }));
    this.trafficCardTempTypeOptions.set(options);
  }
}
