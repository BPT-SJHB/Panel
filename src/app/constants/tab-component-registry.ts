import { Type } from '@angular/core';
import { UserInfoFormComponent } from 'app/components/forms/user-management-form/user-Info-form/user-info-form.component';
import { TruckInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/truck-info-form/truck-info-form.component';
import { DriverInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-info-form/driver-info-form.component';
import { UsersMenuAccessFormComponent } from 'app/components/forms/user-management-form/users-menu-access-form/users-menu-access-form.component';
import { DriverTruckWalletFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-truck-wallet-form/driver-truck-wallet-form.component';
import { FactoriesAndFreightFormComponent } from 'app/components/forms/factories-production-centers-form/factories-production-centers-form.component';
import { LoadCapacitorFormComponent } from 'app/components/forms/load-capacitor-form/load-capacitor-form.component';
import { LoaderTypeFormComponent } from 'app/components/forms/loader-type-form/loader-type-form.component';
import { ProvinceAndCityFormComponent } from 'app/components/forms/province-and-city-form/province-and-city-form.component';
import { ProductFormComponent } from 'app/components/forms/product-form/product-form.component';
import { LadPlacesFormComponent } from 'app/components/forms/lad-places-form/lad-places-form.component';
import { TravelTimeFormComponent } from 'app/components/forms/travel-time-form/travel-time-form.component';
import { TariffsFormComponent } from 'app/components/forms/tariffs-manages-form/tariffs-form.component';
import { MainViewComponent } from 'app/components/shared/main-view/main-view.component';

export enum TabComponentKey {
  Main = -1,
  UserManagement = 0,
  TruckDriverManagement = 1,
  FactoriesAndFreightManagement = 6,
  LoaderTypeManagement = 12,
  LADPlaceManagementService = 7,
  ProvinceAndCityManagement = 8,
  ProductTypesManagement = 9,
  LoaderManagement = 13,
  TravelTimeManagement = 14,
  LoadCapacitorManagement = 35,
  TariffsManagement = 53,
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
  [TabComponentKey.LoadCapacitorManagement]: [
    {
      title: 'مخزن بار',
      component: LoadCapacitorFormComponent,
    },
  ],
  [TabComponentKey.LoaderManagement]: [
    {
      title: 'بارگیر',
      component: LoaderTypeFormComponent,
    },
  ],
  [TabComponentKey.ProvinceAndCityManagement]: [
    {
      title: 'استان شهرها',
      component: ProvinceAndCityFormComponent,
    },
  ],
  [TabComponentKey.LoaderTypeManagement]: [
    {
      title: 'بارگیرها',
      component: LoaderTypeFormComponent,
    },
  ],
  [TabComponentKey.ProductTypesManagement]: [
    {
      title: 'کالاها',
      component: ProductFormComponent,
    },
  ],
  [TabComponentKey.LADPlaceManagementService]: [
    {
      title: 'مبادی و مقاصد حمل بار',
      component: LadPlacesFormComponent,
    },
  ],
  [TabComponentKey.TravelTimeManagement]: [
    {
      title: 'مدت سفر',
      component: TravelTimeFormComponent,
    },
  ],
  [TabComponentKey.TariffsManagement]: [
    {
      title: 'تعرفه های حمل بار',
      component: TariffsFormComponent,
    },
  ],
};
