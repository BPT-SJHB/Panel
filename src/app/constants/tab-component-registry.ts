import { signal, Type } from '@angular/core';
import { UserInfoFormComponent } from 'app/components/forms/user-management-form/user-Info-form/user-info-form.component';
import { TruckInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/truck-info-form/truck-info-form.component';
import { DriverInfoFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-info-form/driver-info-form.component';
import { UsersMenuAccessFormComponent } from 'app/components/forms/user-management-form/users-menu-access-form/users-menu-access-form.component';
import { DriverTruckWalletFormComponent } from 'app/components/forms/truck-driver-manages-form/driver-truck-wallet-form/driver-truck-wallet-form.component';
import { FactoriesAndFreightFormComponent } from 'app/components/forms/factories-production-centers-form/factories-production-centers-form.component';
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
import { WalletTransactionsTableComponent } from 'app/components/forms/shared/wallet-transactions-table/wallet-transactions-table.component';
import { WalletPaymentRecordTableComponent } from 'app/components/forms/shared/wallet-payment-record-table/wallet-payment-record-table.component';
import { WalletPaymentFormComponent } from 'app/components/forms/wallet-payment-form/wallet-payment-form.component';
import { UserProfileFormComponent } from 'app/components/forms/user-profile-form/user-profile-form.component';
import { IssuedTurnListFormComponent } from 'app/components/forms/issued-turn-list-form/issued-turn-list-form.component';
import { TransportCompaniesFormComponent } from 'app/components/forms/transport-companies-form/transport-companies-form.component';
import { TruckWalletPaymentFormComponent } from 'app/components/forms/truck-wallet-payment-form/truck-wallet-payment-form.component';
import { TransportCompaniesWalletPaymentFormComponent } from 'app/components/forms/transport-companies-wallet-payment-form/transport-companies-wallet-payment-form.component';
import { UserChargingFunctionFormComponent } from 'app/components/forms/user-charging-function-form/user-charging-function-form.component';
import {
  LoadListType,
  LoadsListFormComponent,
} from 'app/components/forms/load-management-form/loads-list-form/loads-list-form.component';
import { LoadsAnnouncementFormComponent } from 'app/components/forms/load-management-form/loads-announcement-form/loads-announcement-form.component';
import { LoadAllocationFormComponent } from 'app/components/forms/load-management-form/load-allocation-form/load-allocation-form.component';
import { LoadPermissionsFormComponent } from 'app/components/forms/load-management-form/load-permissions-form/load-permissions-form.component';
import { LoadCapacitorFormComponent } from 'app/components/forms/driver-load-management-form/load-capacitor-form/load-capacitor-form.component';
import { LoadAllocationPriorityComponent } from 'app/components/forms/driver-load-management-form/load-allocation-priority/load-allocation-priority.component';
import { DriverLoadAllocationFormComponent } from 'app/components/forms/driver-load-management-form/driver-load-allocation-form/driver-load-allocation-form.component';
import { DriverLoadPermissionsFormComponent } from 'app/components/forms/driver-load-management-form/driver-load-permissions-form/driver-load-permissions-form.component';
import { LoadAccountingFormComponent } from 'app/components/forms/load-accounting-form/load-accounting-form.component';
import { AdminLoadPermissionsFormComponent } from 'app/components/forms/admin-load-permissions-form/admin-load-permissions-form.component';
import { TicketListsFormComponent } from 'app/components/forms/tickets-management-form/ticket-lists-form/ticket-lists-form.component';
import { TrafficInitialRegistrationFormComponent } from 'app/components/forms/traffic-management-forms/traffic-initial-registration-form/traffic-initial-registration-form.component';
import { TrafficAndParkingTariffFormComponent } from 'app/components/forms/traffic-management-forms/traffic-and-parking-tariff-form/traffic-and-parking-tariff-form.component';
import { ParkingTrafficRecordsFormComponent } from 'app/components/forms/traffic-management-forms/parking-traffic-records-form/parking-traffic-records-form.component';
import { TrafficCardTypeFormComponent } from 'app/components/forms/traffic-management-forms/traffic-card-type-form/traffic-card-type-form.component';
import { TrafficEntriesFormComponent } from 'app/components/forms/traffic-management-forms/traffic-entries-form/traffic-entries-form.component';
import { TrafficManagementService } from 'app/services/traffic-management/traffic-management.service';

export enum TabComponentKey {
  Main = -1,

  // 📋 User & Profile
  UserManagement = 0,
  UserProfileManagement = 22,

  // 🚚 Truck/Driver
  TruckDriverManagement = 1,
  Driver_TruckManagement = 10,

  // 💸 Wallets
  UserChargingFunctions = 25,
  SmsWalletManagement = 26,
  UserWalletManagement = 27,
  TruckWalletManagement = 29,
  TransportCompaniesWalletManagement = 30,
  TruckerAssociationWalletManagement = 31,

  // 🔁 Sequential Turn
  SequentialTurnManagement = 4,

  // 🏭 Factories & Production
  TransportCompaniesManagement = 3,
  FactoriesAndFreightManagement = 6,

  // 📍 Geography
  LADPlaceManagementService = 7,
  ProvinceAndCityManagement = 8,

  // 📦 Products & Load
  ProductTypesManagement = 9,
  LoadCapacitorManagement = 35,

  // 🏷️ Loader Types
  LoaderTypeManagement = 12,

  // 🛣️ Travel
  TravelTimeManagement = 14,

  // 💰 Tariffs
  TariffsManagement = 53,

  // 📣 Announcement
  AnnouncementManagement = 11,

  // 🕓 Turns
  TurnsManagement = 19,
  TurnsRegisterManagement = 23,
  IssuedTurnManagement = 21,

  DriverLoadManagement = 37,
  TransportCompaniesLoadManagement = 32,
  FactoriesAndFreightLoadManagement = 33,
  AdminLoadManagement = 39,

  // Parking And Traffics
  RegisterAndRecordTrafficsManagement = 15,
  RegisterAndEditTrafficsCardManagement = 16,
  TrafficsAndParkingTariffManagement = 18,
  TrafficInitialRegistrationManagement = 34,

  TicketManagement = 71,
}

export interface TabConfig {
  sharedSignal: boolean;
  subTab: TabView[];
}

export interface TabView<T = object> {
  title: string;
  component: Type<T>;
  data?: object;
}

export const TabComponentRegistry: Record<TabComponentKey, TabConfig> = {
  [TabComponentKey.Main]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'صفحه اصلی',
        component: MainViewComponent,
      },
    ],
  },

  [TabComponentKey.UserManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'مدیریت کاربران', component: UserInfoFormComponent },
      { title: 'مدریت دسترسی کابران', component: UsersMenuAccessFormComponent },
    ],
  },

  [TabComponentKey.TruckDriverManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'راننده', component: DriverInfoFormComponent },
      { title: 'ناوگان', component: TruckInfoFormComponent },
      {
        title: 'راننده-ناوگان-کیف‌پول',
        component: DriverTruckWalletFormComponent,
      },
    ],
  },

  [TabComponentKey.Driver_TruckManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'ناوگان',
        component: TruckAndDriverInformationFormComponent,
        data: { insideTabType: 'Truck' },
      },
      {
        title: 'بارگیر',
        component: TruckAndDriverInformationFormComponent,
        data: { insideTabType: 'LoaderType' },
      },
      {
        title: 'راننده',
        component: TruckAndDriverInformationFormComponent,
        data: { insideTabType: 'Driver' },
      },
    ],
  },

  [TabComponentKey.FactoriesAndFreightManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'کارخانجات و مراکز تولید بار ',
        component: FactoriesAndFreightFormComponent,
      },
    ],
  },

  [TabComponentKey.LADPlaceManagementService]: {
    sharedSignal: false,
    subTab: [
      { title: 'مبادی و مقاصد حمل بار', component: LadPlacesFormComponent },
    ],
  },

  [TabComponentKey.ProvinceAndCityManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'استان شهرها', component: ProvinceAndCityFormComponent }],
  },

  [TabComponentKey.ProductTypesManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'کالاها', component: ProductFormComponent }],
  },

  [TabComponentKey.LoadCapacitorManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'مخزن بار', component: LoadCapacitorFormComponent }],
  },

  [TabComponentKey.LoaderTypeManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'بارگیرها', component: LoaderTypeFormComponent }],
  },

  [TabComponentKey.TravelTimeManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'مدت سفر', component: TravelTimeFormComponent }],
  },

  [TabComponentKey.TariffsManagement]: {
    sharedSignal: false,
    subTab: [{ title: 'تعرفه های حمل بار', component: TariffsFormComponent }],
  },

  [TabComponentKey.AnnouncementManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'گروه‌های اعلام بار',
        component: AnnouncementGroupFormComponent,
      },
      {
        title: 'زیر گروه‌های اعلام بار',
        component: AnnouncementSubGroupFormComponent,
      },
      {
        title: 'گروه و زیرگروه‌های اعلام بار',
        component: RelationOfAnnouncementGroupAndSubGroupComponent,
      },
    ],
  },

  [TabComponentKey.SequentialTurnManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'صفوف نوبت', component: SequentialTurnsFormComponent },
      {
        title: 'صفوف نوبت و بارگیرها',
        component: RelationOfSequentialTurnToLoaderTypeFormComponent,
      },
      {
        title: 'صفوف نوبت و زیرگروه‌های اعلام بار',
        component: RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent,
      },
    ],
  },

  [TabComponentKey.TurnsManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'لیست نوبت‌ها', component: TurnsListFormComponent },
      { title: 'نوبت بلادرنگ', component: RealTimeTurnsFormComponent },
      {
        title: 'نوبت اضطراری',
        component: EmergencyTurnsFormComponent,
      },
      {
        title: 'احیای نوبت رزرو',
        component: ResuscitateTurnsFormComponent,
      },
    ],
  },

  [TabComponentKey.TurnsRegisterManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'درخواست - صدورنوبت', component: RegisterTurnFormComponent },
    ],
  },

  [TabComponentKey.IssuedTurnManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'لیست نوبت های صادر شده',
        component: IssuedTurnListFormComponent,
      },
    ],
  },

  [TabComponentKey.UserProfileManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'مدیریت پروفایل کاربر', component: UserProfileFormComponent },
    ],
  },

  [TabComponentKey.SmsWalletManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'کیف پول',
        component: WalletPaymentFormComponent,
        data: { walletType: signal('SMS') },
      },
      {
        title: 'تراکنش ها',
        component: WalletTransactionsTableComponent,
        data: { walletType: signal('SMS') },
      },
      {
        title: 'سوابق شارژ',
        component: WalletPaymentRecordTableComponent,
        data: { walletType: signal('SMS') },
      },
    ],
  },

  [TabComponentKey.UserWalletManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'شارژ',
        component: WalletPaymentFormComponent,
        data: { walletType: signal('User') },
      },
      {
        title: 'تراکنش ها',
        component: WalletTransactionsTableComponent,
        data: { walletType: signal('User') },
      },
      {
        title: 'سوابق شارژ',
        component: WalletPaymentRecordTableComponent,
        data: { walletType: signal('User') },
      },
    ],
  },

  [TabComponentKey.TruckWalletManagement]: {
    sharedSignal: true,
    subTab: [
      {
        title: 'شارژ',
        component: TruckWalletPaymentFormComponent,
      },
      {
        title: 'تراکنش ها',
        component: WalletTransactionsTableComponent,
        data: { walletType: signal('Truck') },
      },
      {
        title: 'سوابق شارژ',
        component: WalletPaymentRecordTableComponent,
        data: { walletType: signal('Truck') },
      },
    ],
  },

  [TabComponentKey.TransportCompaniesWalletManagement]: {
    sharedSignal: true,
    subTab: [
      {
        title: 'شارژ',
        component: TransportCompaniesWalletPaymentFormComponent,
      },
      {
        title: 'تراکنش ها',
        component: WalletTransactionsTableComponent,
        data: { walletType: signal('TransportCompony') },
      },
      {
        title: 'سوابق شارژ',
        component: WalletPaymentRecordTableComponent,
        data: { walletType: signal('TransportCompony') },
      },
    ],
  },

  [TabComponentKey.TruckerAssociationWalletManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'شارژ',
        component: WalletPaymentFormComponent,
        data: { walletType: signal('TruckerAssociation') },
      },
      {
        title: 'تراکنش ها',
        component: WalletTransactionsTableComponent,
        data: { walletType: signal('TruckerAssociation') },
      },
      {
        title: 'سوابق شارژ',
        component: WalletPaymentRecordTableComponent,
        data: { walletType: signal('TruckerAssociation') },
      },
    ],
  },

  [TabComponentKey.TransportCompaniesManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'شرکت ها حمل نقل', component: TransportCompaniesFormComponent },
    ],
  },

  [TabComponentKey.UserChargingFunctions]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'عملکرد شارژ کاربر',
        component: UserChargingFunctionFormComponent,
      },
    ],
  },

  [TabComponentKey.DriverLoadManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'مخزن بار',
        component: LoadCapacitorFormComponent,
      },
      {
        title: 'اولویت بندی تخصیص بار',
        component: LoadAllocationPriorityComponent,
      },
      {
        title: 'سوابق تخصیص بار',
        component: DriverLoadAllocationFormComponent,
      },
      {
        title: 'مجوز های صادر شده',
        component: DriverLoadPermissionsFormComponent,
      },
    ],
  },

  [TabComponentKey.TransportCompaniesLoadManagement]: {
    sharedSignal: true,
    subTab: [
      {
        title: 'اعلام بار',
        component: LoadsAnnouncementFormComponent,
        data: { loadType: LoadListType.TRANSPORT_COMPANY },
      },
      {
        title: 'لیست بار',
        component: LoadsListFormComponent,
        data: { loadType: LoadListType.TRANSPORT_COMPANY },
      },
      {
        title: 'تخصیص بار',
        component: LoadAllocationFormComponent,
        data: { loadType: LoadListType.TRANSPORT_COMPANY },
      },
      {
        title: 'مجوز های صادر شده',
        component: LoadPermissionsFormComponent,
        data: { loadType: LoadListType.TRANSPORT_COMPANY },
      },
    ],
  },

  [TabComponentKey.FactoriesAndFreightLoadManagement]: {
    sharedSignal: true,
    subTab: [
      {
        title: 'اعلام بار',
        component: LoadsAnnouncementFormComponent,
        data: { loadType: LoadListType.FACTORIES_PRODUCTION_CENTERS },
      },
      {
        title: 'لیست بار',
        component: LoadsListFormComponent,
        data: { loadType: LoadListType.FACTORIES_PRODUCTION_CENTERS },
      },
      {
        title: 'مجوز های صادر شده',
        component: LoadPermissionsFormComponent,
        data: { loadType: LoadListType.FACTORIES_PRODUCTION_CENTERS },
      },
    ],
  },

  [TabComponentKey.AdminLoadManagement]: {
    sharedSignal: true,
    subTab: [
      {
        title: 'اعلام بار',
        component: LoadsAnnouncementFormComponent,
        data: { loadType: LoadListType.ADMIN },
      },
      {
        title: 'لیست بار',
        component: LoadsListFormComponent,
        data: { loadType: LoadListType.ADMIN },
      },
      {
        title: 'ترکنش های بار',
        component: LoadAccountingFormComponent,
        data: { loadType: LoadListType.ADMIN },
      },
      {
        title: 'تخصیص بار',
        component: LoadAllocationFormComponent,
        data: { loadType: LoadListType.ADMIN },
      },
      {
        title: 'مجوز های صادر شده',
        component: AdminLoadPermissionsFormComponent,
      },
    ],
  },

  [TabComponentKey.TicketManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'تیکت',
        component: TicketListsFormComponent,
      },
    ],
  },
  [TabComponentKey.RegisterAndRecordTrafficsManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'ثبت تردد',
        component: TrafficEntriesFormComponent,
      },
      {
        title: 'سوابق تردد',
        component: ParkingTrafficRecordsFormComponent,
      },
    ],
  },

  [TabComponentKey.TrafficsAndParkingTariffManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'هزینه‌های تردد و توقف پارکینگ',
        component: TrafficAndParkingTariffFormComponent,
      },
    ],
  },

  [TabComponentKey.TrafficInitialRegistrationManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'ثبت و ویرایش انواع کارت تردد',
        component: TrafficInitialRegistrationFormComponent,
      },
    ],
  },

  [TabComponentKey.RegisterAndEditTrafficsCardManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'ثبت و ویرایش انواع کارت تردد',
        component: TrafficCardTypeFormComponent,
      },
    ],
  },
};
