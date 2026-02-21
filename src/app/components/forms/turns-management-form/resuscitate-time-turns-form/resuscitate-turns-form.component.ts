import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TurnsTruckInfoBaseFormComponent } from '../turns-truck-info-base-form/turns-truck-info-base-form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToastService } from 'app/services/toast-service/toast.service';
import { DatePickerInput } from 'app/components/shared/inputs/date-picker-input/date-picker-input.component';
import { TimePickerInput } from 'app/components/shared/inputs/time-picker-input/time-picker-input.component.component';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { FormButtonsSectionComponent } from 'app/components/shared/sections/form-buttons-section/form-buttons-section.component';

@Component({
  selector: 'app-real-time-turns-form',
  imports: [
    ButtonModule,
    TurnsTruckInfoBaseFormComponent,
    DatePickerInput,
    TimePickerInput,
    ButtonComponent,
    FormButtonsSectionComponent,
  ],
  templateUrl: './resuscitate-turns-form.component.html',
  styleUrl: './resuscitate-turns-form.component.scss',
})
export class ResuscitateTurnsFormComponent implements OnInit, OnDestroy {
  @ViewChild(TurnsTruckInfoBaseFormComponent)
  turnsBaseComponent!: TurnsTruckInfoBaseFormComponent;

  private loadingService = inject(LoadingService);
  private turnManagementService = inject(TurnManagementService);
  private destroy$ = new Subject<void>();
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  resuscitateTurnForm = this.fb.group({
    sequentialTurnId: ['', [Validators.required, Validators.min(0)]],
    truckId: ['', [Validators.required, Validators.min(0)]],
    date: [''],
    time: ['00:00:00'],
  });

  loading = false;

  // ♻️ Cleanup subscription
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 🚦 Listen to loading state on init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  async submitResuscitateTurnForm() {
    if (this.resuscitateTurnForm.invalid || this.loading) return;
    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagementService.ResuscitateReserveTurn(
        Number(this.truckId.value),
        Number(this.sequentialTurnId.value),
        this.date.value,
        this.time.value
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
      this.resetForm();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private resetForm() {
    this.turnsBaseComponent.resetTurnsBaseForm();
    this.resuscitateTurnForm.reset({
      truckId: '',
      sequentialTurnId: '',
      time: '00:00:00',
    });
  }

  get truckId(): FormControl {
    return this.resuscitateTurnForm.get('truckId') as FormControl;
  }
  get sequentialTurnId(): FormControl {
    return this.resuscitateTurnForm.get('sequentialTurnId') as FormControl;
  }
  get date(): FormControl {
    return this.resuscitateTurnForm.get('date') as FormControl;
  }
  get time(): FormControl {
    return this.resuscitateTurnForm.get('time') as FormControl;
  }
}
