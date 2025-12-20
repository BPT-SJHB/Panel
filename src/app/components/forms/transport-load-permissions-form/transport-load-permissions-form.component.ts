import { Component, inject, signal } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { BaseLoading } from '../shared/component-base/base-loading';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadPermissionForCompany } from 'app/services/report-management/model/load-permissions/load-permission-for-company.model';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';

type TransportLoadPermissionsRow = LoadPermissionForCompany & {
  fullPlate: string;
};

@Component({
  selector: 'app-transport-load-permissions-form',
  imports: [TableComponent],
  templateUrl: './transport-load-permissions-form.component.html',
  styleUrl: './transport-load-permissions-form.component.scss',
})
export class TransportLoadPermissionsFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  readonly reportService = inject(ReportsManagementService);
  readonly loadPermissions = signal<TransportLoadPermissionsRow[]>([]);
  readonly columns: TableColumn<TransportLoadPermissionsRow>[] = [
    { field: 'LoadAllocationId', header: 'شناسه تخصیص بار' },
    { field: 'fullPlate', header: 'ناوگان' },
    { field: 'TruckSmartCardNo', header: 'هوشمند' },
    { field: 'Driver', header: 'راننده' },
    { field: 'TruckDriverNationalCode', header: 'کد ملی' },
    { field: 'TruckDriverDrivingLicenseNo', header: 'گواهینامه' },
    { field: 'TruckDriverTel', header: 'تلفن راننده' },
    { field: 'LoadAllocationDateTime', header: 'زمان مجوز' },
    { field: 'LoadId', header: 'شناسه بار' },
    { field: 'SourceCityTitle', header: 'مبدا' },
    { field: 'TargetCityTitle', header: 'مقصد' },
    { field: 'ProductTitle', header: 'کالا' },
    { field: 'LoadDescription', header: 'توضیحات بار' },
    { field: 'SoftwareUserAllocater', header: 'کاربر تخصیص  بار' },
  ];

  onViewActivated(): void {
    this.loadLoadPermissions();
  }

  private async loadLoadPermissions() {
    await this.withLoading(async () => {
      const response =
        await this.reportService.GetLatestLoadPermissionsForCompany();
      if (!checkAndToastError(response, this.toast)) return;

      const rows: TransportLoadPermissionsRow[] = response.data.map((d) => ({
        ...d,
        fullPlate: `${d.Serial} - ${d.Pelak}`,
      }));

      this.loadPermissions.set(rows);
    });
  }
}
