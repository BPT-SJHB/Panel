import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseLoading } from '../../shared/component-base/base-loading';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';

import { ValidationSchema } from 'app/constants/validation-schema';
import { checkAndToastError } from 'app/utils/api-utils';

import {
  SelectOption,
  SelectInputComponent,
} from 'app/components/shared/inputs/select-input/select-input.component';

import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { Dialog } from 'primeng/dialog';
import { TrafficCardType } from 'app/services/traffic-management/model/traffic-card-type.model';

@Component({
  selector: 'app-traffic-card-type-form-component',
  imports: [
    ButtonComponent,
    SelectInputComponent,
    TextInputComponent,
    ToggleSwitchInputComponent,
    Dialog,
  ],
  templateUrl: './traffic-card-type-form.component.html',
  styleUrls: ['./traffic-card-type-form.component.scss'],
})
export class TrafficCardTypeFormComponent extends BaseLoading {
  /* --------------------------------------------------------------------------
   * Injected Services
   * -------------------------------------------------------------------------- */
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(TrafficManagementService);

  /* --------------------------------------------------------------------------
   * State & Signals
   * -------------------------------------------------------------------------- */
  readonly trafficCardTypeSelection = signal<SelectOption<number>[]>([]);
  isFormVisible = false;
  addonWidth = '6rem';
  /* --------------------------------------------------------------------------
   * Forms
   * -------------------------------------------------------------------------- */
  readonly editTitleTrafficForm = this.fb.nonNullable.control(
    '',
    ValidationSchema.title
  );

  readonly cardTypeForm = this.fb.group({
    TrafficSelectedCardTypeId: this.fb.control<number | null>(null),
    TrafficCardTypeId: this.fb.control<number | null>(
      null,
      ValidationSchema.id
    ),
    TrafficCardTypeTitle: this.fb.nonNullable.control(
      '',
      ValidationSchema.title
    ),
    Active: this.fb.nonNullable.control(true),
  });

  /* --------------------------------------------------------------------------
   * Lifecycle
   * -------------------------------------------------------------------------- */
  override ngOnInit(): void {
    super.ngOnInit();
    this.loadTrafficCardTypes();

    this.ctrl('TrafficSelectedCardTypeId')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        this.ctrl('TrafficCardTypeId').setValue(id);
      });
  }

  /* --------------------------------------------------------------------------
   * Actions
   * -------------------------------------------------------------------------- */
  async editTrafficCardType(): Promise<void> {
    if (this.loading() || this.cardTypeForm.invalid) return;

    const response = await this.service.EditTrafficCardType(
      this.cardTypeForm.getRawValue() as TrafficCardType
    );

    if (!checkAndToastError(response, this.toast)) return;

    this.resetForm();
    await this.reloadList(response.data.Message);
  }

  async registerTrafficCardType(): Promise<void> {
    if (this.loading() || this.editTitleTrafficForm.invalid) return;

    const response = await this.service.RegisterTrafficCardType(
      this.editTitleTrafficForm.value
    );

    if (!checkAndToastError(response, this.toast)) return;

    this.editTitleTrafficForm.reset();
    this.isFormVisible = false;

    await this.reloadList(response.data.Message);
  }

  onNew(): void {
    this.editTitleTrafficForm.reset();
    this.isFormVisible = true;
  }

  /* --------------------------------------------------------------------------
   * Helpers
   * -------------------------------------------------------------------------- */
  ctrl<T>(name: keyof typeof this.cardTypeForm.controls): FormControl<T> {
    return this.cardTypeForm.get(name) as FormControl<T>;
  }

  private async reloadList(message: string): Promise<void> {
    await this.loadTrafficCardTypes();
    this.toast.success('موفق', message);
  }

  /* --------------------------------------------------------------------------
   * Data Loading
   * -------------------------------------------------------------------------- */
  private async loadTrafficCardTypes(): Promise<void> {
    const response = await this.service.GetTrafficCardTypes();
    if (!checkAndToastError(response, this.toast)) return;

    this.trafficCardTypeSelection.set(
      response.data.map((tc) => ({
        label: tc.TrafficCardTypeTitle,
        value: tc.TrafficCardTypeId,
      }))
    );
  }

  /* --------------------------------------------------------------------------
   * Form Reset
   * -------------------------------------------------------------------------- */
  resetForm(): void {
    this.cardTypeForm.reset({ Active: true }, { emitEvent: false });
  }
}
