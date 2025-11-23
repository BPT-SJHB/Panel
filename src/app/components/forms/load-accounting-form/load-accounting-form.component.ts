import { Component, computed, inject, signal } from '@angular/core';
import { OnViewActivated } from 'app/interfaces/on-view-activated.interface';
import { BaseLoading } from '../shared/component-base/base-loading';
import { ReportsManagementService } from 'app/services/report-management/reports-management.service';
import { LoadAccounting } from 'app/services/report-management/model/load/load-accounting.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { LoadInfo } from 'app/services/load-management/model/load-info.model';
import {
  TableColumn,
  TableComponent,
} from 'app/components/shared/table/table.component';
import { colorMap } from 'app/constants/ui/color.ui';

@Component({
  selector: 'app-load-accounting-form',
  imports: [TableComponent],
  templateUrl: './load-accounting-form.component.html',
  styleUrl: './load-accounting-form.component.scss',
})
export class LoadAccountingFormComponent
  extends BaseLoading
  implements OnViewActivated
{
  readonly sharedSignal = signal<LoadInfo | null>(null);
  readonly selectedLoadInfo = computed(() => this.sharedSignal());
  private reportService = inject(ReportsManagementService);
  readonly loadsAccounting = signal<LoadAccounting[]>([]);

  columns: TableColumn<LoadAccounting>[] = [
    {
      field: 'LoadId',
      header: 'شناسه بار',
    },
    {
      field: 'AccountingTitle',
      header: 'تراکنش',
    },
    {
      field: 'UserName',
      header: 'کاربر',
    },
    {
      field: 'Amount',
      header: 'تعداد',
    },
    {
      field: 'ShamsiDate',
      header: 'تاریخ',
    },
    {
      field: 'Time',
      header: 'زمان',
    },
  ];

  onViewActivated(): void {
    this.loadLoadsAccounting();
  }

  private async loadLoadsAccounting() {
    const loadId = this.selectedLoadInfo()?.LoadId;
    if (!loadId) return;

    await this.withLoading(async () => {
      const response = await this.reportService.GetLoadAccounting(loadId);
      if (!checkAndToastError(response, this.toast)) return;
      this.loadsAccounting.set(response.data);
    });
  }

  // 🎨 Get color class based on transaction color
  getRowColor = (row: LoadAccounting) => {
    return (
      colorMap.get(row.Color.toLowerCase()) ??
      'bg-surface-300 dark:bg-surface-500'
    );
  };
}
