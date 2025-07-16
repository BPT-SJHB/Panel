import { Component, inject, Input, ViewChild } from '@angular/core';
import { TurnsTruckInfoBaseFormComponent } from '../turns-truck-info-base-form/turns-truck-info-base-form.component';
import { FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToastService } from 'app/services/toast-service/toast.service';

@Component({
  selector: 'app-real-time-turns-form',
  imports: [ButtonModule, TurnsTruckInfoBaseFormComponent],
  templateUrl: './real-time-turns-form.component.html',
  styleUrl: './real-time-turns-form.component.scss',
})
export class RealTimeTurnsFormComponent {
  @ViewChild(TurnsTruckInfoBaseFormComponent)
  turnsBaseComponent!: TurnsTruckInfoBaseFormComponent;

  private loadingService = inject(LoadingService);
  private turnManagementService = inject(TurnManagementService);
  private destroy$ = new Subject<void>();
  private toast = inject(ToastService);

  sequentialTurnId = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);
  truckId = new FormControl('', [Validators.required, Validators.min(0)]);
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

  async submitRealTimeTurn() {
    if (
      this.sequentialTurnId.invalid ||
      this.sequentialTurnId.invalid ||
      this.loading
    )
      return;
    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagementService.RealTimeTurnRegister(
        Number(this.truckId.value),
        Number(this.sequentialTurnId.value)
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
      this.turnsBaseComponent.resetTurnsBaseForm();
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}
