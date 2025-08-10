import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';

import { TabComponentKey } from 'app/constants/tab-component-registry';
import { createTab } from 'app/store/tab/tab.actions';
import { DEFAULT_MAIN_TAB_ID, TabData } from 'app/store/tab/tab.reducer';

@Component({
  selector: 'app-mobile-tab-bar',
  templateUrl: './mobile-tab-bar.component.html',
  styleUrl: './mobile-tab-bar.component.scss',
  standalone: true,
  imports: [ButtonModule, NgClass],
})
export class MobileTabBarComponent {
  selectedTab: TabComponentKey = TabComponentKey.Main;
  private store = inject(Store);

  tabs = signal<TabData[]>([
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
      id: DEFAULT_MAIN_TAB_ID,
      title: 'صفحه اصلی',
      icon: 'pi pi-home',
      component: TabComponentKey.Main,
      closeable: true,
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

  onClickTab(tab: TabData): void {
    this.selectedTab = tab.component;
    this.store.dispatch(createTab(tab));
  }

  isTabActive(tab: TabData): boolean {
    return tab.component === this.selectedTab;
  }
}
