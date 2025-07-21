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
import { AnnouncementGroupFormComponent } from 'app/components/forms/announcement-management-form/announcement-group-form/announcement-group-form.component';
import { AnnouncementSubGroupFormComponent } from 'app/components/forms/announcement-management-form/announcement-sub-group-form/announcement-sub-group-form.component';
import { RelationOfAnnouncementGroupAndSubGroupComponent } from 'app/components/forms/announcement-management-form/relation-of-announcement-group-and-sub-group/relation-of-announcement-group-and-sub-group.component';
import { SequentialTurnsFormComponent } from 'app/components/forms/sequential-turns-management-form/sequential-turns-form/sequential-turns-form.component';
import { RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent } from 'app/components/forms/sequential-turns-management-form/relation-of-sequential-turn-to-announcement-sub-groups/relation-of-sequential-turn-to-announcement-sub-groups-form.component';
import { MainViewComponent } from 'app/components/shared/main-view/main-view.component';
import { RelationOfSequentialTurnToLoaderTypeFormComponent } from 'app/components/forms/sequential-turns-management-form/relation-of-sequential-turn-to-loader-type-form/relation-of-sequential-turn-to-loader-type-form.component';
import { TruckAndDriverInformationFormComponent } from 'app/components/forms/truck-and-driver-information-form/truck-and-driver-information-form.component';
import { TurnsListFormComponent } from 'app/components/forms/turns-management-form/turns-list-form/turns-list-form.component';
import { RealTimeTurnsFormComponent } from 'app/components/forms/turns-management-form/real-time-turns-form/real-time-turns-form.component';
import { EmergencyTurnsFormComponent } from 'app/components/forms/turns-management-form/emergency-time-turns-form copy/emergency-turns-form.component';
import { ResuscitateTurnsFormComponent } from 'app/components/forms/turns-management-form/resuscitate-time-turns-form/resuscitate-turns-form.component';
import { RegisterTurnFormComponent } from 'app/components/forms/register-turn-form/register-turn-form.component';

export enum TabComponentKey {
  Main = -1,
  UserManagement = 0,
  TruckDriverManagement = 1,
  SequentialTurnManagement = 4,
  FactoriesAndFreightManagement = 6,
  AnnouncementManagement = 11,
  LoaderTypeManagement = 12,
  LADPlaceManagementService = 7,
  ProvinceAndCityManagement = 8,
  ProductTypesManagement = 9,
  LoaderManagement = 13,
  TravelTimeManagement = 14,
  TurnsManagement = 19,
  TurnsRegisterManagement = 23,
  LoadCapacitorManagement = 35,
  TariffsManagement = 53,
  Driver_TruckManagement = 10,
}
export interface TabView {
  title: string;
  component: Type<any>;
  data?: object;
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
  [TabComponentKey.AnnouncementManagement]: [
    { title: 'گروه ها اعلام بار', component: AnnouncementGroupFormComponent },
    {
      title: 'زیر گروه ها اعلام بار',
      component: AnnouncementSubGroupFormComponent,
    },
    {
      title: 'گروه و زیرگروه اعلام بار',
      component: RelationOfAnnouncementGroupAndSubGroupComponent,
    },
  ],
  [TabComponentKey.SequentialTurnManagement]: [
    { title: 'صفوف نوبت دهی', component: SequentialTurnsFormComponent },
    {
      title: 'بارگیرها',
      component: RelationOfSequentialTurnToLoaderTypeFormComponent,
    },
    {
      title: 'زیرگروه اعلام بار',
      component: RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent,
    },
  ],
  [TabComponentKey.Driver_TruckManagement]: [
    {
      title: 'ناوگان',
      component: TruckAndDriverInformationFormComponent,
      data: {
        insideTabType: 'Truck',
      },
    },
    {
      title: 'بارگیر',
      component: TruckAndDriverInformationFormComponent,
      data: {
        insideTabType: 'LoaderType',
      },
    },
    {
      title: 'راننده',
      component: TruckAndDriverInformationFormComponent,
      data: {
        insideTabType: 'Driver',
      },
    },
  ],
  [TabComponentKey.TurnsManagement]: [
    {
      title: 'لیست نوبت ها',
      component: TurnsListFormComponent,
    },
    {
      title: 'نوبت دهی بلادرنگ',
      component: RealTimeTurnsFormComponent,
    },
    {
      title: 'نوبت اضطراری',
      component: EmergencyTurnsFormComponent,
    },
    {
      title: 'احیای نوبت رزور',
      component: ResuscitateTurnsFormComponent,
    },
  ],
  [TabComponentKey.TurnsRegisterManagement]: [
    { title: 'درخواست - صدورنوبت', component: RegisterTurnFormComponent },
  ],
};
