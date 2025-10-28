import { Component, inject, signal, OnInit } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { TableConfig } from 'app/constants/ui/table.ui';
import {
  TableColumn,
  TableColumnType,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { TrafficReportInfo } from 'app/services/traffic-management/model/traffic-report-info.model';

@Component({
  selector: 'app-parking-traffic-records',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './parking-traffic-records.component.html',
  styleUrl: './parking-traffic-records.component.scss',
})
export class ParkingTrafficRecordsComponent
  extends BaseLoading
  implements OnInit
{
  private readonly trafficService = inject(TrafficManagementService);

  readonly trafficCardId = signal<number>(0);
  readonly trafficRecords = signal<TrafficReportInfo[]>([]);
  readonly tableUi = TableConfig;

  readonly columns: TableColumn<TrafficReportInfo>[] = [
    { field: 'EntryShamsiDate', header: 'تاریخ ورود' },
    { field: 'EntryTime', header: 'زمان ورود' },
    { field: 'EntryTrafficCardNo', header: 'شماره کارت ورود' },
    { field: 'EntrySoftwareUser', header: 'کاربر ورود' },
    { field: 'EntryCost', header: 'هزینه ورود', format: 'currency' },
    { field: 'ExitShamsiDate', header: 'تاریخ خروج' },
    { field: 'ExitTime', header: 'زمان خروج' },
    { field: 'ExitTrafficCardNo', header: 'شماره کارت خروج' },
    { field: 'ExitSoftwareUser', header: 'کاربر خروج' },
    { field: 'ExitCost', header: 'هزینه خروج', format: 'currency' },

    { field: 'EntryGateTitle', header: 'گیت ورود' },
    { field: 'ExitGateTitle', header: 'گیت خروج' },
    { field: 'FlagA', header: 'علامت', type: TableColumnType.BOOLEAN },
  ];

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadTrafficRecords();
  }

  private async loadTrafficRecords(): Promise<void> {
    await this.withLoading(async () => {
      const response = await this.trafficService.GetTrafficRecords(
        this.trafficCardId()
      );
      if (!checkAndToastError(response, this.toast)) return;
      this.trafficRecords.set(response.data);
    });
  }
}
