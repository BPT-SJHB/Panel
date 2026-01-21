import z from 'zod';

export interface LoadInfo {
  LoadId: number;
  AnnounceDate?: string;
  AnnounceTime?: string;
  TransportCompanyId?: number;
  TransportCompanyTitle?: string;
  GoodId?: number;
  GoodTitle?: string;
  AnnouncementGroupId?: number;
  AnnouncementGroupTitle?: string;
  AnnouncementSubGroupId?: number;
  AnnouncementSubGroupTitle?: string;
  SourceCityId?: number;
  SourceCityTitle?: string;
  TargetCityId?: number;
  TargetCityTitle?: string;
  LoadingPlaceId?: number;
  LoadingPlaceTitle?: string;
  DischargingPlaceId?: number;
  DischargingPlaceTitle?: string;
  TotalNumber?: number;
  Tonaj?: number;
  Tariff?: string;
  Recipient?: string;
  Address?: string;
  Description?: string;
  LoadStatusId?: number;
  LoadStatusTitle?: string;
  RegisteringUserName?: string;
  TPTParams?: string;
  TPTParamsJoint?: string;
}

export const zodLoadInfo = z.object({
  LoadId: z.number(),
  AnnounceDate: z.string().optional(),
  AnnounceTime: z.string().optional(),
  TransportCompanyId: z.number().optional(),
  TransportCompanyTitle: z.string().optional(),
  GoodId: z.number().optional(),
  GoodTitle: z.string().optional(),
  AnnouncementGroupId: z.number().optional(),
  AnnouncementGroupTitle: z.string().optional(),
  AnnouncementSubGroupId: z.number().optional(),
  AnnouncementSubGroupTitle: z.string().optional(),
  SourceCityId: z.number().optional(),
  SourceCityTitle: z.string().optional(),
  TargetCityId: z.number().optional(),
  TargetCityTitle: z.string().optional(),
  LoadingPlaceId: z.number().optional(),
  LoadingPlaceTitle: z.string().optional(),
  DischargingPlaceId: z.number().optional(),
  DischargingPlaceTitle: z.string().optional(),
  TotalNumber: z.number().optional(),
});
