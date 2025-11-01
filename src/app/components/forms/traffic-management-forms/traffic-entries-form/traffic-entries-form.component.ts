import { Component, inject, signal } from '@angular/core';
import { BaseLoading } from '../../shared/component-base/base-loading';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';
import { mockTrafficInfo } from 'app/services/traffic-management/mock/traffic-info.mock';
import { TrafficInfo } from 'app/services/traffic-management/model/traffic-info.model';
import { checkAndToastError } from 'app/utils/api-utils';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { colorMap } from 'app/constants/ui/color.ui';
import { ButtonComponent } from 'app/components/shared/button/button.component';

@Component({
  selector: 'app-traffic-entries-form',
  imports: [CommonModule, PanelModule, ButtonComponent],
  templateUrl: './traffic-entries-form.component.html',
  styleUrl: './traffic-entries-form.component.scss',
})
export class TrafficEntriesFormComponent extends BaseLoading {
  trafficService = inject(TrafficManagementService);
  readonly trafficInfo = signal<TrafficInfo>(mockTrafficInfo);

  async watchEntryGate() {
    const trafficGateId = 1;
    const trafficCardNo = 'ABcDEf0';
    const trafficPic = mockTrafficInfo.TrafficPicture ?? '';
    const response = await this.trafficService.RegisterTraffic(
      trafficGateId,
      trafficCardNo,
      trafficPic
    );

    if (!checkAndToastError(response, this.toast)) return;
    if (this.trafficInfo().EntryExit === 'Entry') {
      response.data.EntryExit = 'Exit';
      response.data.EntryExitColor = 'Red';
    }
    this.trafficInfo.set(response.data);
  }

  getColor(color: string): string {
    return (
      colorMap.get(color.toLowerCase()) ?? 'bg-surface-300 dark:bg-surface-500'
    );
  }
}
