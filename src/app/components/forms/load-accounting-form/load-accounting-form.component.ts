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
      header: 'مبلغ',
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

  readonly colorMap: ReadonlyMap<string, string> = new Map([
    ['black', 'bg-black text-white dark:bg-gray-900 dark:text-white'],
    ['white', 'bg-white text-black dark:bg-gray-800 dark:text-white'],
    ['red', 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'],
    [
      'green',
      'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
    ],
    [
      'yellow',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100',
    ],
    ['blue', 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'],
    [
      'orange',
      'bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-orange-100',
    ],
    [
      'purple',
      'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
    ],
    ['pink', 'bg-pink-100 text-pink-800 dark:bg-pink-600 dark:text-pink-100'],
    [
      'brown',
      'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
    ],
    ['gray', 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'],
    ['cyan', 'bg-cyan-100 text-cyan-800 dark:bg-cyan-700 dark:text-cyan-100'],
    ['lime', 'bg-lime-100 text-lime-800 dark:bg-lime-700 dark:text-lime-100'],
    ['teal', 'bg-teal-100 text-teal-800 dark:bg-teal-700 dark:text-teal-100'],
    [
      'indigo',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100',
    ],
  ]);

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
      this.colorMap.get(row.Color.toLowerCase()) ??
      'bg-surface-300 dark:bg-surface-500'
    );
  };
}
