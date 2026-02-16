import {
  Component,
  inject,
  Input,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TurnsTruckInfoBaseFormComponent } from '../turns-truck-info-base-form/turns-truck-info-base-form.component';
import { FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';
import { FormButtonsSectionComponent } from 'app/components/shared/sections/form-buttons-section/form-buttons-section.component';

@Component({
  selector: 'app-real-time-turns-form',
  imports: [
    ButtonModule,
    TurnsTruckInfoBaseFormComponent,
    ButtonComponent,
    FormButtonsSectionComponent,
  ],
  templateUrl: './real-time-turns-form.component.html',
  styleUrl: './real-time-turns-form.component.scss',
})
export class RealTimeTurnsFormComponent implements OnDestroy, OnInit {
  @ViewChild(TurnsTruckInfoBaseFormComponent)
  turnsBaseComponent!: TurnsTruckInfoBaseFormComponent;

  private loadingService = inject(LoadingService);
  private turnManagementService = inject(TurnManagementService);
  private destroy$ = new Subject<void>();
  private toast = inject(ToastService);

  readonly appTitle = AppTitles;

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
