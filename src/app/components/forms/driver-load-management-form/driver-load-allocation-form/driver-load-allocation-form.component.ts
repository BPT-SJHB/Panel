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

  /** Load allocations from the service */
  private async fetchLoadAllocations() {
    if (this.loading()) return;

    await this.withLoading(async () => {
      const response = await this.loadService.GetLoadAllocationOfDriver();
      if (!checkAndToastError(response, this.toast)) return;

      this.loadAllocations.set(response.data);
    });
  }

  // 🎨 Get color class based on transaction color
  getRowColor(color: string): string {
    return (
      this.colorMap.get(color.toLowerCase()) ??
      'bg-surface-300 dark:bg-surface-500'
    );
  }

  /** Refresh loads when view is activated */
  onViewActivated(): void {
    this.withLoading(async () => {
      await this.fetchLoadAllocations();
    });
  }
}
