import { Type } from '@angular/core';
import { MainViewComponent } from 'app/components/shared/main-view/main-view.component';
import { UserInfoFormComponent } from 'app/components/forms/user-management-form/user-Info-form/user-info-form.component';
import { TruckInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/truck-info-form/truck-info-form.component';
import { DriverInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-info-form/driver-info-form.component';
import { UsersMenuAccessFormComponent } from 'app/components/forms/user-management-form/users-menu-access-form/users-menu-access-form.component';
import { DriverTruckWalletFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-truck-wallet-form/driver-truck-wallet-form.component';
import { FactoriesAndFreightFormComponent } from 'app/components/forms/factories-production-centers-form/factories-production-centers-form.component';
import { LoadCapacitorFormComponent } from 'app/components/forms/load-capacitor-form/load-capacitor-form.component';

export enum TabComponentKey {
  Main = -1,
  UserManagement = 0,
  TruckDriverManagement = 1,
  FactoriesAndFreightManagement = 6,
  LoadCapacitorManagement = 37,
}
export interface TabView {
  title: string;
  component: Type<any>;
}

export const TabComponentRegistry: Record<TabComponentKey, TabView[]> = {
  [TabComponentKey.Main]: [
    { title: 'صفحه اصلی', component: MainViewComponent },
  ],

  [TabComponentKey.UserManagement]: [
    {
      title: 'مدیریت کاربران',
      component: UserInfoFormComponent,
    },
    {
      title: 'مدریت دسترسی کابران',
      component: UsersMenuAccessFormComponent,
    },
  ],

  [TabComponentKey.TruckDriverManagement]: [
    {
      title: 'راننده',
      component: DriverInfoFormComponent,
    },
    {
      title: 'ناوگان',
      component: TruckInfoFormComponent,
    },
    {
      title: 'راننده ناوگان کیف پول',
      component: DriverTruckWalletFormComponent,
    },
  ],
  [TabComponentKey.FactoriesAndFreightManagement]: [
    {
      title: 'کارخانجات و مراکز تولید بار ',
      component: FactoriesAndFreightFormComponent,
    },
  ],
  [TabComponentKey.LoadCapacitorManagement]: [{
    title:'مخزن بار',
    component:LoadCapacitorFormComponent
  }],
};
