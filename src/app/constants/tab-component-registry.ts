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
import { CarouselFormComponent } from 'app/components/forms/carousel-form/carousel-form.component';
import { LoadAnnouncementConfigFormComponent } from 'app/components/forms/load-announcement-config-form/load-announcement-config-form.component';
import { GeneralConfigurationFormComponent } from 'app/components/forms/general-configuration-form/general-configuration-form.component';
import { DeviceManagementFormComponent } from 'app/components/forms/device-management-form/device-management-form.component';
import { EquipmentDeviceConfigFormComponent } from 'app/components/forms/equipment-device-config-form/equipment-device-config-form.component';
import { LoaderTypeAnnouncementRelationFormComponent } from 'app/components/forms/loader-type-announcement-relation-form/loader-type-announcement-relation-form.component';
import { SequentialTurnCostFormComponent } from 'app/components/forms/sequential-turn-cost-form/sequential-turn-cost-form.component';
import { ProvinceAnnouncementRelationFormComponent } from 'app/components/forms/province-announcement-relation-form/province-announcement-relation-form.component';
import { TPTParametersFormComponent } from 'app/components/forms/tpt-parameters-management/tpt-parameters-form/tpt-parameters-form.component';
import { TPTParametersAnnouncementRelationFormComponent } from 'app/components/forms/tpt-parameters-management/tpt-parameters-announcement-relation-form/tpt-parameters-announcement-relation-form.component';
import { TransportLoadPermissionsFormComponent } from 'app/components/forms/transport-load-permissions-form/transport-load-permissions-form.component';
import { LoadViewConditionFormComponent } from 'app/components/forms/load-condition-management-form/load-view-condition/load-view-condition-form.component';
import { LoadAllocationConditionFormComponent } from 'app/components/forms/load-condition-management-form/load-allocation-condition/load-allocation-condition-form.component';

export enum TabComponentKey {
  // Default or main tab
  Main = -1,

  // 📋 User & Profile
  // Manage users (create, update, delete)
  UserManagement = 0,
  // Manage user profiles
  UserProfileManagement = 22,

  // 🎠 Carousel
  // Manage homepage or app carousel slides
  CarouselManagement = 2,

  // 🚚 Truck/Driver
  // Manage trucks and drivers
  TruckDriverManagement = 1,
  // Manage driver-to-truck assignments
  Driver_TruckManagement = 10,

  // 💸 Wallets
  // User charging operations
  UserChargingFunctions = 25,
  // Manage SMS-related wallet balances
  SmsWalletManagement = 26,
  // Manage user wallets
  UserWalletManagement = 27,
  // Manage truck wallets
  TruckWalletManagement = 29,
  // Manage transport company wallets
  TransportCompaniesWalletManagement = 30,
  // Manage trucker association wallets
  TruckerAssociationWalletManagement = 31,

  // 🔁 Sequential Turn
  // Manage sequential turn rules
  SequentialTurnManagement = 4,

  // 🏭 Factories & Production
  // Manage transport companies
  TransportCompaniesManagement = 3,
  // Manage factories and freight operations
  FactoriesAndFreightManagement = 6,

  // 📍 Geography
  // Manage LAD places
  LADPlaceManagementService = 7,
  // Manage provinces and cities
  ProvinceAndCityManagement = 8,

  // 📦 Products & Load
  // Manage product types
  ProductTypesManagement = 9,

  //TODO: This code replaed with LastLoadPermissionsOfTransportCompanies
  LoadPermissionsTransportManagement = 35,

  // 🏷️ Loader Types
  // Manage loader types
  LoaderTypeManagement = 12,

  // 🛣️ Travel
  // Manage travel time rules
  TravelTimeManagement = 14,

  // 💰 Tariffs
  // Manage tariffs
  TariffsManagement = 53,

  // 📣 Announcement
  // Manage announcements
  AnnouncementManagement = 11,

  // 🕓 Turns
  // Manage turns
  TurnsManagement = 19,
  // Register turns
  TurnsRegisterManagement = 23,
  // Manage issued turns
  IssuedTurnManagement = 21,

  // 📦 Load Management
  // Manage driver loads
  DriverLoadManagement = 37,
  // Manage loads for transport companies
  TransportCompaniesLoadManagement = 32,
  // Manage loads for factories and freight
  FactoriesAndFreightLoadManagement = 33,
  // Admin-level load management
  AdminLoadManagement = 39,

  // 🅿️ Parking & Traffics
  // Register and record traffic events
  RegisterAndRecordTrafficsManagement = 15,
  // Register and edit traffic cards
  RegisterAndEditTrafficsCardManagement = 16,
  // Manage traffic & parking tariffs
  TrafficsAndParkingTariffManagement = 18,
  // Initial traffic registrations
  TrafficInitialRegistrationManagement = 34,

  // 🖥️ Device & Config Management
  // Manage devices
  DeviceManagement = 36,
  // General app configuration
  GeneralConfigurationManagement = 45,
  // Load announcement configuration
  LoadAnnouncementConfigManagement = 46,
  // Equipment device management
  EquipmentDeviceManagement = 47,

  // 🎫 Ticketing
  // Manage tickets
  TicketManagement = 71,

  // ⚙️ TPT Parameters
  // Manage TPT parameters
  TPTParametersManagement = 69,

  // Manage Load Condition View and Select
  LoadConditionManagement = 72,
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

  [TabComponentKey.CarouselManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'کاروسل',
        component: CarouselFormComponent,
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

  // [TabComponentKey.LoadCapacitorManagement]: {
  //   sharedSignal: false,
  //   subTab: [{ title: 'مخزن بار', component: LoadCapacitorFormComponent }],
  // },

  [TabComponentKey.LoaderTypeManagement]: {
    sharedSignal: false,
    subTab: [
      { title: 'بارگیرها', component: LoaderTypeFormComponent },
      {
        title: 'بارگیر-گروه و زیرگروه اعلام بار',
        component: LoaderTypeAnnouncementRelationFormComponent,
      },
    ],
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
      {
        title: 'گروه‌های اعلام بار، زیرگروه‌های اعلام بار و استان‌های مقصد',
        component: ProvinceAnnouncementRelationFormComponent,
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
      {
        title: 'صفوف نوبت و هزینه های نوبت',
        component: SequentialTurnCostFormComponent,
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
  [TabComponentKey.LoadAnnouncementConfigManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'پیکربندی اعلام بار',
        component: LoadAnnouncementConfigFormComponent,
      },
    ],
  },
  [TabComponentKey.GeneralConfigurationManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'پیکربندی عمومی سیستم',
        component: GeneralConfigurationFormComponent,
      },
    ],
  },
  [TabComponentKey.DeviceManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'مدیریت دیپایس',
        component: DeviceManagementFormComponent,
      },
    ],
  },
  [TabComponentKey.EquipmentDeviceManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'پیکربندی تجهیزات و دیوایس ها',
        component: EquipmentDeviceConfigFormComponent,
      },
    ],
  },

  [TabComponentKey.TPTParametersManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'پارامترهای موثر',
        component: TPTParametersFormComponent,
      },
      {
        title: 'پارامترهای موثر - گروه و زیرگروه اعلام بار',
        component: TPTParametersAnnouncementRelationFormComponent,
      },
    ],
  },
  [TabComponentKey.LoadConditionManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'شرایط مشاهد بار',
        component: LoadViewConditionFormComponent,
      },
      {
        title: 'شرایط انتخاب بار',
        component: LoadAllocationConditionFormComponent,
      },
    ],
  },
  [TabComponentKey.LoadPermissionsTransportManagement]: {
    sharedSignal: false,
    subTab: [
      {
        title: 'مجوزهای شرکتهای حمل و نقل',
        component: TransportLoadPermissionsFormComponent,
      },
    ],
  },
};
