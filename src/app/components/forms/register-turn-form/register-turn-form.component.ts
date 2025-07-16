import { Component, inject, OnInit } from '@angular/core';
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { Subject, takeUntil } from 'rxjs';
import { SearchAutoCompleteComponent } from 'app/components/shared/inputs/search-auto-complete/search-auto-complete.component';
import { FormControl, Validators } from '@angular/forms';
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { Button } from 'primeng/button';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';

@Component({
  selector: 'app-register-turn-form',
  imports: [SearchAutoCompleteComponent, Button],
  templateUrl: './register-turn-form.component.html',
  styleUrl: './register-turn-form.component.scss',
})
export class RegisterTurnFormComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private destroy$ = new Subject<void>();
  private truckDriverManagerService = inject(Driver_TruckManagementService);
  private sequentialTurnService = inject(SequentialTurnManagementService);
  private turnManagementService = inject(TurnManagementService);
  private truckInfo?: TruckInfo;

  loading = true;
  sequentialTurnTitle = new FormControl('', [Validators.required]);
  sequentialTurnId = new FormControl(-1, [Validators.min(0)]);

  // Lifecycle: on component init
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.loading = val));
  }

  private async getUserLoaderTypeId(): Promise<TruckInfo | undefined> {
    const resTruck =
      await this.truckDriverManagerService.GetTruckInfoForSoftwareUser();
    if (!checkAndToastError(resTruck, this.toast)) return;
    return resTruck.data;
  }

  // 🔍 Autocomplete for sequential turns
  searchSequentialTurnWithLoaderType = async (_: string) => {
    this.truckInfo = await this.getUserLoaderTypeId();
    const loaderTypeId = this.truckInfo?.LoaderTypeId;

    if (!loaderTypeId) return [];

    const res =
      await this.sequentialTurnService.GetSequentialTurnWithLoaderType(
        loaderTypeId
      );
    if (!checkAndToastError(res, this.toast)) return [];
    return res.data!;
  };

  // Lifecycle: clean up on destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ❌ Reset control value when input is cleared
  onAutoCompleteChange(controller: FormControl<any>) {
    controller.setValue('');
  }

  // ✅ On sequential turn selection
  async onSelectSequentialTurn(sequentialTurn: SequentialTurn) {
    this.sequentialTurnId.setValue(sequentialTurn.SeqTurnId);
  }

  async submitRealTimeTurn() {
    if (!this.truckInfo || this.sequentialTurnId.invalid || this.loading)
      return;

    try {
      this.loadingService.setLoading(true);
      const response = await this.turnManagementService.RealTimeTurnRegister(
        this.truckInfo.TruckId,
        Number(this.sequentialTurnId.value)
      );

      if (!checkAndToastError(response, this.toast)) return;
      this.toast.success('موفق', response.data.Message);
      this.resetForm();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  private resetForm() {
    this.sequentialTurnId.reset(-1);
    this.sequentialTurnTitle.reset('');
    this.truckInfo = undefined;
  }
}
