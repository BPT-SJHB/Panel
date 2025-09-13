import { Component, inject, signal } from '@angular/core';

// ─── Services ──────────────────────────────────────────────
import { Driver_TruckManagementService } from 'app/services/driver-truck-management/driver-truck-management.service';
import { SequentialTurnManagementService } from 'app/services/sequential-turn-management/sequential-turn-management.service';
import { TurnManagementService } from 'app/services/turn-management/turn-management.service';

// ─── Utils ─────────────────────────────────────────────────
import { checkAndToastError } from 'app/utils/api-utils';

// ─── Models ────────────────────────────────────────────────
import { SequentialTurn } from 'app/services/sequential-turn-management/model/sequential-turn.model';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';

// ─── Base / Interfaces ─────────────────────────────────────
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { BaseLoading } from '../shared/component-base/base-loading';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from 'app/components/shared/button/button.component';

@Component({
  selector: 'app-register-turn-form',
  standalone: true,
  imports: [CardModule, ButtonComponent],
  templateUrl: './register-turn-form.component.html',
  styleUrls: ['./register-turn-form.component.scss'], // ✅ fixed styleUrl → styleUrls
})
export class RegisterTurnFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  // ─── Injected Services ───────────────────────────────────
  private truckDriverManagerService = inject(Driver_TruckManagementService);
  private sequentialTurnService = inject(SequentialTurnManagementService);
  private turnManagementService = inject(TurnManagementService);

  // ─── State ───────────────────────────────────────────────
  readonly truckInfo = signal<TruckInfo | null>(null);
  readonly sequentialTurns = signal<SequentialTurn[]>([]);

  // ─── Lifecycle Hook ──────────────────────────────────────
  onViewActivated(): void {
    this.initialize();
  }

  // ─── Private Methods ─────────────────────────────────────

  /**
   * Initializes the component by fetching user loader type and sequential turns.
   */
  private async initialize() {
    if (this.loading()) return;

    this.withLoading(async () => {
      // Get current user truck info
      this.truckInfo.set(await this.getUserLoaderTypeId());
      const loaderTypeId = this.truckInfo()?.LoaderTypeId;

      if (!loaderTypeId) {
        this.sequentialTurns.set([]);
        return;
      }

      // Fetch sequential turns
      const res =
        await this.sequentialTurnService.GetSequentialTurnWithLoaderType(
          loaderTypeId
        );

      if (!checkAndToastError(res, this.toast)) {
        this.sequentialTurns.set([]);
        return;
      }

      this.sequentialTurns.set(res.data);
    });
  }

  /**
   * Retrieves truck info for the current software user.
   */
  private async getUserLoaderTypeId(): Promise<TruckInfo | null> {
    const resTruck =
      await this.truckDriverManagerService.GetTruckInfoForSoftwareUser();

    if (!checkAndToastError(resTruck, this.toast)) return null;
    return resTruck.data;
  }

  /**
   * Submits a real-time turn registration for the selected sequential turn.
   */
  async submitRealTimeTurn(sequentialTurnId: number) {
    const truckInfo = this.truckInfo();
    if (this.loading() || !truckInfo) return;

    this.withLoading(async () => {
      const response = await this.turnManagementService.RealTimeTurnRegister(
        truckInfo.TruckId,
        sequentialTurnId
      );

      if (!checkAndToastError(response, this.toast)) return;

      this.toast.success('موفق', response.data.Message);
    });
  }
}
