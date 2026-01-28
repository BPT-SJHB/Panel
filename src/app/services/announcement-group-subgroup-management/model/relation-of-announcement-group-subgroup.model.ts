import { z } from 'zod';

export interface AnnouncementSubGroupInRelationOfAnnouncementGroup {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}

export const zodAnnouncementSubGroupInRelationOfAnnouncementGroup = z.object({
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string().optional(),
});

export interface RelationOfAnnouncementGroupAndSubGroup {
  AnnouncementId: number;
  AnnouncementTitle?: string;
  AnnouncementSubGroups: AnnouncementSubGroupInRelationOfAnnouncementGroup[];
}

export const zodRelationOfAnnouncementGroupAndSubGroup = z.object({
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string().optional(),
  AnnouncementSubGroups: z.array(
    zodAnnouncementSubGroupInRelationOfAnnouncementGroup
  ),
});
