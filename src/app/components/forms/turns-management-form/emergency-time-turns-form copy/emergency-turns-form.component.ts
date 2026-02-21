import {
  Component,
  inject,
  Input,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TurnsTruckInfoBaseFormComponent } from '../turns-truck-info-base-form/turns-truck-info-base-form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToastService } from 'app/services/toast-service/toast.service';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { FormButtonsSectionComponent } from 'app/components/shared/sections/form-buttons-section/form-buttons-section.component';

@Component({
  selector: 'app-real-time-turns-form',
  imports: [
    ButtonModule,
    TurnsTruckInfoBaseFormComponent,
    TextInputComponent,
    ButtonComponent,
    FormButtonsSectionComponent,
  ],
  templateUrl: './emergency-turns-form.component.html',
  styleUrl: './emergency-turns-form.component.scss',
})
export class EmergencyTurnsFormComponent implements OnDestroy, OnInit {
  @ViewChild(TurnsTruckInfoBaseFormComponent)
  turnsBaseComponent!: TurnsTruckInfoBaseFormComponent;

  private loadingService = inject(LoadingService);
  private turnManagementService = inject(TurnManagementService);
  private destroy$ = new Subject<void>();
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  emergencyTurnForm = this.fb.group({
    sequentialTurnId: ['', [Validators.required, Validators.min(0)]],
    truckId: ['', [Validators.required, Validators.min(0)]],
    descriptions: ['', ValidationSchema.description],
  });

  loading = false;

  // ♻️ Cleanup subscription`
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

  async submitEmergencyTurn() {
    if (this.emergencyTurnForm.invalid || this.loading) return;
    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagementService.EmergencyTurnRegister(
        this.truckId.value,
        this.sequentialTurnId.value,
        this.descriptions.value
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
    this.emergencyTurnForm.reset({
      truckId: '',
      sequentialTurnId: '',
      descriptions: '',
    });
  }

  get truckId(): FormControl {
    return this.emergencyTurnForm.get('truckId') as FormControl;
  }
  get sequentialTurnId(): FormControl {
    return this.emergencyTurnForm.get('sequentialTurnId') as FormControl;
  }

  get descriptions(): FormControl {
    return this.emergencyTurnForm.get('descriptions') as FormControl;
  }
}
