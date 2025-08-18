import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { LoadManagementService } from 'app/services/load-management/load-management.service';
import { LoadAllocationInfo } from 'app/services/load-management/model/load-allocation-info.model';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { checkAndToastError } from 'app/utils/api-utils';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-driver-load-allocation-form',
  templateUrl: './driver-load-allocation-form.component.html',
  imports: [CardModule],
  styleUrls: ['./driver-load-allocation-form.component.scss'],
})
export class DriverLoadAllocationFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly loadService = inject(LoadManagementService);

  /** Holds the list of load allocations for the driver */
  readonly loadAllocations = signal<LoadAllocationInfo[]>([]);

  /** Load allocations from the service */
  private async fetchLoadAllocations() {
    if (this.loading()) return;

    await this.withLoading(async () => {
      const response = await this.loadService.GetLoadAllocationOfDriver();
      if (!checkAndToastError(response, this.toast)) return;

      this.loadAllocations.set(response.data);
    });
  }

  /** Refresh loads when view is activated */
  onViewActivated(): void {
    this.withLoading(async () => {
      await this.fetchLoadAllocations();
    });
  }
}
