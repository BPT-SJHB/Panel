import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { LoadPermission } from 'app/services/report-management/model/load-permissions/load-permission.model';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { AppTitles } from 'app/constants/Titles';

@Component({
  selector: 'app-load-permissions-form',
  imports: [TableComponent, ButtonComponent],
  templateUrl: './load-permissions-form.component.html',
  styleUrl: './load-permissions-form.component.scss',
})
export class LoadPermissionsFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  readonly sharedSignal!: WritableSignal<LoadInfo | null>;

  private readonly reportService = inject(ReportsManagementService);

  readonly configTable: typeof TableConfig = {
    ...TableConfig,
    paginator: false,
  };
  readonly addonWidth = '8rem';
  readonly appTitle = AppTitles;

  readonly rows = signal<LoadPermission[]>([]);

  readonly columns: TableColumn<LoadPermission>[] = [
    { header: this.appTitle.tables.loads.loadId, field: 'LoadId' },
    { header: this.appTitle.tables.loads.product, field: 'GoodTitle' },
    { header: this.appTitle.tables.loads.sourceCity, field: 'LoadSourceCity' },
    { header: this.appTitle.tables.loads.targetCity, field: 'LoadTargetCity' },
    {
      header: this.appTitle.tables.loads.announcementGroup,
      field: 'AnnouncementTitle',
    },
    {
      header: this.appTitle.tables.loads.announcementSubGroup,
      field: 'AnnouncementSGTitle',
    },
    {
      header: this.appTitle.tables.loads.transportCompany,
      field: 'TransportCompany',
    },
    { header: this.appTitle.tables.loads.recipient, field: 'Recipient' },
    { header: this.appTitle.tables.loads.address, field: 'Address' },
    { header: this.appTitle.tables.loads.description, field: 'Description' },
    {
      header: this.appTitle.tables.loads.loadRegisteringUser,
      field: 'LoadRegisteringUser',
    },
    {
      header: this.appTitle.tables.loads.loadAllocationUser,
      field: 'LoadAllocationUser',
    },
    {
      header: this.appTitle.tables.loads.loadAllocationId,
      field: 'LoadAllocationId',
    },
    { header: this.appTitle.tables.loads.licensePlate, field: 'LicensePlate' },
    { header: this.appTitle.tables.loads.smartCardNo, field: 'SmartCardNo' },
    { header: this.appTitle.tables.loads.truckDriver, field: 'TruckDriver' },
    { header: this.appTitle.tables.loads.nationalCode, field: 'NationalCode' },
    { header: this.appTitle.tables.loads.mobileNumber, field: 'MobileNumber' },
    { header: this.appTitle.tables.loads.allocationDate, field: 'ShamsiDate' },
    { header: this.appTitle.tables.loads.allocationTime, field: 'Time' },
    {
      header: this.appTitle.tables.loads.sequentialTurn,
      field: 'SequentialTurn',
    },
    { header: this.appTitle.tables.loads.note, field: 'Note' },
    {
      header: this.appTitle.tables.loads.loadAllocationStatusTitle,
      field: 'LoadAllocationStatusTitle',
    },
    {
      header: this.appTitle.tables.loads.tptParamsJoint,
      field: 'TPTParamsJoint',
    },
  ];

  onViewActivated(): void {
    this.loadPermissions();
  }

  private async loadPermissions() {
    const loadinfo = this.sharedSignal();
    if (this.loading() || !loadinfo) return;
    await this.withLoading(async () => {
      const response = await this.reportService.GetLoadPermissions(
        loadinfo.LoadId
      );
      if (!checkAndToastError(response, this.toast)) {
        this.rows.set([]);
        return;
      }
      this.rows.set(response.data);
    });
  }

  printPermissions() {
    window.print();
  }
}
