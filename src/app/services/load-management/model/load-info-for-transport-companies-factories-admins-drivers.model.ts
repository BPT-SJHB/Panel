import z from 'zod';

export interface LoadInfoForTransportCompanies_Factories_Admins_Drivers {
  LoadId: number;
  TCTitle: string;
  TCTel: string;
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
  LoadIssueDate: string;
  LoadIssueTime: string;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  Recipient: string;
  Address: string;
  Description: string;
  UserName: string;
  TPTParamsJoint: string;
}

export const zodLoadInfoForTransportCompanies_Factories_Admins_Drivers =
  z.object({
    LoadId: z.number(),
    TCTitle: z.string(),
    TCTel: z.string(),
    GoodTitle: z.string(),
    Tonaj: z.number(),
    SoureCityTitle: z.string(),
    TargetCityTitle: z.string(),
    ProvinceId: z.number(),
    LoadingPlaceTitle: z.string(),
    DischargingPlaceTitle: z.string(),
    Total: z.number(),
    Reminder: z.number(),
    Tariff: z.string(),
    LoadStatusName: z.string(),
    LoadIssueDate: z.string(),
    LoadIssueTime: z.string(),
    AnnouncementTitle: z.string(),
    AnnouncementSGTitle: z.string(),
    Recipient: z.string(),
    Address: z.string(),
    Description: z.string(),
    UserName: z.string(),
    TPTParamsJoint: z.string(),
  });

export interface LoadForTransportCompanies_Factories_Admins_Drivers {
  ProvinceName: string;
  ProvinceId: number;
  myLoads: LoadInfoForTransportCompanies_Factories_Admins_Drivers[];
}

export const zodLoadForTransportCompanies_Factories_Admins_Drivers = z.object({
  ProvinceName: z.string(),
  ProvinceId: z.number(),
  myLoads: z.array(zodLoadInfoForTransportCompanies_Factories_Admins_Drivers),
});
