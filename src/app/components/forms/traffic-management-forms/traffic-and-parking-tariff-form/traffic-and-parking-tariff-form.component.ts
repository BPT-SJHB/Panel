import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseLoading } from '../../shared/component-base/base-loading';
import { ValidationSchema } from 'app/constants/validation-schema';

import {
  SelectOption,
  SelectInputComponent,
} from 'app/components/shared/inputs/select-input/select-input.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { ToggleSwitchInputComponent } from 'app/components/shared/inputs/toggle-switch-input/toggle-switch-input.component';

import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';
import { RawTrafficCost } from 'app/services/traffic-management/model/raw-traffic-cost.model';
import { TrafficCardTypeCost } from 'app/services/traffic-management/model/traffic-card-type-cost.model';

import { checkAndToastError } from 'app/utils/api-utils';

@Component({
  selector: 'app-traffic-and-parking-tariff',
  standalone: true,
  imports: [
    SelectInputComponent,
    TextInputComponent,
    ButtonComponent,
    ToggleSwitchInputComponent,
  ],
  templateUrl: './traffic-and-parking-tariff-form.component.html',
  styleUrls: ['./traffic-and-parking-tariff-form.component.scss'],
})
export class TrafficAndParkingTariffFormComponent extends BaseLoading {
  // ---------------------------------------------------------------------------
  // Dependencies
  // ---------------------------------------------------------------------------
  private readonly fb = inject(FormBuilder);
  private readonly trafficService = inject(TrafficManagementService);

  // ---------------------------------------------------------------------------
  // State (Signals)
  // ---------------------------------------------------------------------------
  private readonly trafficsCosts = signal<Map<number, TrafficCardTypeCost>>(
    new Map()
  );
  readonly trafficCardTypeSelection = signal<SelectOption<number>[]>([]);
  readonly addonWidth = '5rem';

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------
  readonly tariffForm = this.fb.group({
    TrafficCardTypeId: this.fb.control<number | null>(
      null,
      ValidationSchema.id
    ),
    EntryBaseCost: this.fb.control<number | null>(
      null,
      ValidationSchema.EntryBaseCost
    ),
    NoCostStoppageDuration: this.fb.control<number | null>(
      null,
      ValidationSchema.NoCostStoppageDuration
    ),
    ExcessStoppageDuration: this.fb.control<number | null>(
      null,
      ValidationSchema.ExcessStoppageDuration
    ),
    ExcessStoppageCost: this.fb.control<number | null>(
      null,
      ValidationSchema.ExcessStoppageCost
    ),
    Active: this.fb.nonNullable.control(true),
  });

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------
  override ngOnInit(): void {
    super.ngOnInit();

    this.loadTrafficCardTypes();
    this.loadTrafficCost();

    this.ctrl<number | null>('TrafficCardTypeId')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (typeof value !== 'number') {
          this.resetForm();
          return;
        }

        const cost = this.trafficsCosts().get(value);
        if (cost) {
          const { TrafficCardTypeId: _, ...rest } = cost;
          this.tariffForm.patchValue(rest);
        } else {
          this.tariffForm.reset(
            {
              TrafficCardTypeId: value,
            },
            { emitEvent: false }
          );
        }
      });
  }

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  async registerTariffCost(): Promise<void> {
    if (this.tariffForm.invalid || this.loading()) return;

    await this.withLoading(async () => {
      const raw = this.tariffForm.getRawValue() as RawTrafficCost;
      const response = await this.trafficService.RegisterTrafficCost(raw);

      if (!checkAndToastError(response, this.toast)) return;

      await this.loadTrafficCost();
      this.resetForm();
      this.toast.success('موفق', response.data.Message);
    });
  }

  resetForm(): void {
    this.tariffForm.reset({}, { emitEvent: false });
  }

  // ---------------------------------------------------------------------------
  // Form Helpers
  // ---------------------------------------------------------------------------
  ctrl<T>(name: keyof typeof this.tariffForm.controls): FormControl<T> {
    return this.tariffForm.get(name) as FormControl<T>;
  }

  // ---------------------------------------------------------------------------
  // Data Loading
  // ---------------------------------------------------------------------------
  private async loadTrafficCardTypes(): Promise<void> {
    const response = await this.trafficService.GetTrafficCardTypes();
    if (!checkAndToastError(response, this.toast)) return;

    const options = response.data.map((tc) => ({
      label: tc.TrafficCardTypeTitle,
      value: tc.TrafficCardTypeId,
    }));

    this.trafficCardTypeSelection.set(options);
  }

  private async loadTrafficCost(): Promise<void> {
    const response = await this.trafficService.GetTrafficCosts();
    if (!checkAndToastError(response, this.toast)) return;

    const map = new Map<number, TrafficCardTypeCost>();
    response.data.forEach((cost) => map.set(cost.TrafficCardTypeId, cost));

    this.trafficsCosts.set(map);
  }
}
