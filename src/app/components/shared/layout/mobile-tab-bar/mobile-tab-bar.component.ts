import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';

import { TabComponentKey } from 'app/constants/tab-component-registry';
import { createTab } from 'app/store/tab/tab.actions';
import { DEFAULT_MAIN_TAB_ID, TabData } from 'app/store/tab/tab.reducer';
import { BaseLoading } from 'app/components/forms/shared/component-base/base-loading';
import { ApiProcessesService } from 'app/services/api-processes/api-processes.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { uuidV4 } from 'app/utils/uuid';

@Component({
  selector: 'app-mobile-tab-bar',
  templateUrl: './mobile-tab-bar.component.html',
  styleUrl: './mobile-tab-bar.component.scss',
  standalone: true,
  imports: [ButtonModule, NgClass],
})
export class MobileTabBarComponent extends BaseLoading {
  selectedTab: TabComponentKey = TabComponentKey.Main;
  private store = inject(Store);
  private processesService = inject(ApiProcessesService);

  private readonly mainTab: TabData = {
    id: DEFAULT_MAIN_TAB_ID,
    title: 'صفحه اصلی',
    icon: 'pi pi-home',
    component: TabComponentKey.Main,
    closeable: false,
  };

  readonly tabs = signal<TabData[]>([
    {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'پروفایل',
      icon: 'pi pi-user',
      component: TabComponentKey.UserProfileManagement,
      closeable: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      title: 'کیف پول',
      icon: 'pi pi-wallet',
      component: TabComponentKey.UserWalletManagement,
      closeable: true,
    },
    {
      ...this.mainTab,
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      title: 'کالا',
      icon: 'pi pi-box',
      component: TabComponentKey.ProductTypesManagement,
      closeable: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000004',
      title: 'مدت سفر',
      icon: 'pi pi-clock',
      component: TabComponentKey.TravelTimeManagement,
      closeable: true,
    },
  ]);

  override ngOnInit(): void {
    this.loadTabs();
    super.ngOnInit();
  }

  private async loadTabs() {
    await this.withLoading(async () => {
      const response = await this.processesService.getTaskBarWebProcesses();
      if (!checkAndToastError(response, this.toast)) return;

      let tabData: TabData[] = response.data.flatMap((pg) =>
        pg.processes.map((p) => ({
          id: uuidV4(),
          title: p.title,
          icon: p.icon,
          component: p.id as TabComponentKey,
          closeable: true,
        }))
      );

      if (tabData.length > 4) tabData = tabData.slice(0, 4);
      // Insert main tab at the center
      const middle = Math.floor(tabData.length / 2);
      tabData.splice(middle, 0, this.mainTab);

      this.tabs.set(tabData);
    });
  }

  onClickTab(tab: TabData): void {
    this.selectedTab = tab.component;
    this.store.dispatch(createTab(tab));
  }

  isTabActive(tab: TabData): boolean {
    return tab.component === this.selectedTab;
  }
}
