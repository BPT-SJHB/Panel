import { z } from 'zod';

export interface RelationOfAnnouncementSubGroupAndProvince {
  ProvinceId: number;
  ProvinceName: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
}

export const zodRelationOfAnnouncementSubGroupAndProvince = z.object({
  ProvinceId: z.number(),
  ProvinceName: z.string(),
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string(),
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string(),
});

export type RegisterAndDeleteRelationOfAnnouncementSubGroupAndProvinceInfo =
  Pick<
    RelationOfAnnouncementSubGroupAndProvince,
    'ProvinceId' | 'AnnouncementSGId'
  >;
