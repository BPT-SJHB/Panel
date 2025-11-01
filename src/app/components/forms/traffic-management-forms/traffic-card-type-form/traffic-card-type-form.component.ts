import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { FormBuilder, FormControl } from '@angular/forms';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';
import {
  SelectOption,
  SelectInputComponent,
} from 'app/components/shared/inputs/select-input/select-input.component';
import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';
import { TrafficCardType } from 'app/services/traffic-management/model/traffic-card-type.model';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-traffic-card-type-form-component',
  imports: [
    ButtonComponent,
    SelectInputComponent,
    TextInputComponent,
    ToggleSwitchInputComponent,
  ],
  templateUrl: './traffic-card-type-form.component.html',
  styleUrls: ['./traffic-card-type-form.component.scss'], // fixed
})
export class TrafficCardTypeFormComponent extends BaseLoading {
  private readonly fb = inject(FormBuilder);
  private readonly trafficService = inject(TrafficManagementService);

  readonly trafficCardTypeSelection = signal<SelectOption<number>[]>([]);
  readonly addonWidth = '5rem';

  readonly cardTypeForm = this.fb.group({
    TrafficSelectedCardTypeId: this.fb.control<number | null>(null),
    TrafficCardTypeId: this.fb.control<number | null>(
      null,
      ValidationSchema.id
    ),
    TrafficCardTypeTitle: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.title
    ),
    Active: this.fb.nonNullable.control<boolean>(true),
  });

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadTrafficCardTypes();
    this.ctrl('TrafficSelectedCardTypeId')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.ctrl('TrafficCardTypeId').setValue(value));
  }

  async editTrafficCardType(): Promise<void> {
    if (this.loading() || this.cardTypeForm.invalid) return;

    const cardType = this.cardTypeForm.getRawValue() as TrafficCardType;
    const response = await this.trafficService.EditTrafficCardType(cardType);

    if (!checkAndToastError(response, this.toast)) return;

    this.resetForm();
    await this.loadTrafficCardTypes();
    this.toast.success('موفق', response.data.Message);
  }

  async registerTrafficCardType(): Promise<void> {
    if (this.loading() || this.isFormInvalidExcept('TrafficCardTypeId')) return;

    const cardType = this.cardTypeForm.getRawValue() as TrafficCardType;
    const response = await this.trafficService.RegisterTrafficCardType(
      cardType.TrafficCardTypeTitle
    );

    if (!checkAndToastError(response, this.toast)) return;

    this.resetForm();
    await this.loadTrafficCardTypes();
    this.toast.success('موفق', response.data.Message);
  }

  ctrl<T>(name: keyof typeof this.cardTypeForm.controls): FormControl<T> {
    return this.cardTypeForm.get(name) as FormControl<T>;
  }

  isFormInvalidExcept(
    exceptControl: keyof typeof this.cardTypeForm.controls
  ): boolean {
    return !Object.keys(this.cardTypeForm.controls)
      .filter((key) => key !== exceptControl)
      .every((key) => this.cardTypeForm.get(key)?.valid);
  }

  private async loadTrafficCardTypes(): Promise<void> {
    const response = await this.trafficService.GetTrafficCardTypes();
    if (!checkAndToastError(response, this.toast)) return;

    const options = response.data.map((tc) => ({
      label: tc.TrafficCardTypeTitle,
      value: tc.TrafficCardTypeId,
    }));

    this.trafficCardTypeSelection.set(options);
  }

  resetForm(): void {
    this.cardTypeForm.reset({ Active: true }, { emitEvent: false });
  }
}
