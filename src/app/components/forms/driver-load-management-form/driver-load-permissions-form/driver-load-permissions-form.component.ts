import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { LoadPermissionForDriver } from 'app/services/report-management/model/load-permissions/load-permission-for-driver.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';

@Component({
  selector: 'app-driver-load-permissions-form',
  templateUrl: './driver-load-permissions-form.component.html',
  imports: [CardModule],
  styleUrls: ['./driver-load-permissions-form.component.scss'],
})
export class DriverLoadPermissionsFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  private readonly reportService = inject(ReportsManagementService);

  readonly loadsPermissions = signal<LoadPermissionForDriver[]>([]);

  onViewActivated(): void {
    this.loadLoadPermissions();
  }

  async loadLoadPermissions() {
    if (this.loading()) return;
    await this.withLoading(async () => {
      const response = await this.reportService.GetLoadPermissionsForDriver();

      if (!checkAndToastError(response, this.toast)) {
        this.loadsPermissions.set([]);
        return;
      }
      this.loadsPermissions.set(
        Array.isArray(response.data) ? response.data : []
      );
    });
  }
}
