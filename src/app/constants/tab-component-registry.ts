import { Type } from '@angular/core';
import { MainTabComponent } from 'app/components/tabs/main-tab/main-tab.component';
import { UserManagementTabComponent } from 'app/components/tabs/user-management-tab/user-management-tab.component';
import { TruckDriverManagementTabComponent } from 'app/components/tabs/truck-driver-management-tab/truck-driver-management-tab.component';

export enum TabComponentKey {
  Main = -1,
  UserManagement = 0,
  TruckDriverManagement = 1,
}

export const TabComponentRegistry: Record<TabComponentKey, Type<any>> = {
  [TabComponentKey.Main]: MainTabComponent,
  [TabComponentKey.UserManagement]: UserManagementTabComponent,
  [TabComponentKey.TruckDriverManagement]: TruckDriverManagementTabComponent, 
};