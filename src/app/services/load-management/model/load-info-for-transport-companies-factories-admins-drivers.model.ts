export interface LoadForTransportCompanies_Factories_Admins_Drivers {
  ProvinceName: string;
  ProvinceId: number;
  myLoads: LoadInfoForTransportCompanies_Factories_Admins_Drivers[];
}

export interface LoadInfoForTransportCompanies_Factories_Admins_Drivers {
  LoadId: number;
  TCTitle: string;
  GoodTitle: string;
  Tonaj: number;
  SoureCityTitle: string;
  TargetCityTitle: string;
  ProvinceId: number;
  LoadingPlaceTitle: string;
  DischargingPlaceTitle: string;
  Total: number;
  Reminder: number;
  Tariff: string;
  LoadStatusName: string;
  AnnounceDate: string;
  AnnounceTime: string;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  Recipient: string;
  Address: string;
  Description: string;
  UserName: string;
  TPTParamsJoint: string;
}
