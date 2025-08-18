import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { LoadPermission } from 'app/services/report-management/model/load/load-permission.model';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { ButtonComponent } from 'app/components/shared/button/button.component';

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
  readonly shearedSignal!: WritableSignal<LoadInfo | null>;

  private readonly reportService = inject(ReportsManagementService);

  readonly configTable: typeof TableConfig = {
    ...TableConfig,
    paginator: false,
  };
  readonly addonWidth = '10rem';

  readonly rows = signal<LoadPermission[]>([]);

  readonly columns: TableColumn<LoadPermission>[] = [
    { header: 'شناسه بار', field: 'LoadId' },
    { header: 'عنوان کالا', field: 'GoodTitle' },
    { header: 'شهر مبدا', field: 'LoadSourceCity' },
    { header: 'شهر مقصد', field: 'LoadTargetCity' },
    { header: 'گروه اعلام بار', field: 'AnnouncementTitle' },
    { header: 'زیرگروه اعلام بار', field: 'AnnouncementSGTitle' },
    { header: 'شرکت حمل', field: 'TransportCompany' },
    { header: 'گیرنده', field: 'Recipient' },
    { header: 'آدرس', field: 'Address' },
    { header: 'توضیحات', field: 'Description' },
    { header: 'کاربر ثبت کننده بار', field: 'LoadRegisteringUser' },
    { header: 'کاربر تخصیص بار', field: 'LoadAllocationUser' },
    { header: 'شناسه تخصیص بار', field: 'LoadAllocationId' },
    { header: 'پلاک خودرو', field: 'LicensePlate' },
    { header: 'شماره کارت هوشمند', field: 'SmartCardNo' },
    { header: 'راننده', field: 'TruckDriver' },
    { header: 'کد ملی راننده', field: 'NationalCode' },
    { header: 'شماره موبایل', field: 'MobileNumber' },
    { header: 'تاریخ', field: 'ShamsiDate' },
    { header: 'زمان', field: 'Time' },
    { header: 'نوبت متوالی', field: 'SequentialTurn' },
    { header: 'یادداشت', field: 'Note' },
    { header: 'وضعیت تخصیص بار', field: 'LoadAllocationStatusTitle' },
    { header: 'پارامترهای موثر', field: 'TPTParamsJoint' },
  ];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadPermissions();
  }

  onViewActivated(): void {
    this.loadPermissions();
  }

  private async loadPermissions() {
    if (this.loading() || !this.shearedSignal()) return;
    await this.withLoading(async () => {
      const response = await this.reportService.GetLoadPermissions(
        this.shearedSignal()!.LoadId
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
