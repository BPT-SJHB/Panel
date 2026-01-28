import z from 'zod';

export interface LoaderTypeToAnnouncementSubGroupRelation {
  LoaderTypeId: number;
  LoaderTypeTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
}

export const zodLoaderTypeToAnnouncementSubGroupRelation = z.object({
  LoaderTypeId: z.number(),
  LoaderTypeTitle: z.string(),
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string(),
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string(),
});

export type RegisterDeleteRelationToAnnouncementSubGroup = Pick<
  LoaderTypeToAnnouncementSubGroupRelation,
  'LoaderTypeId' | 'AnnouncementSGId'
>;
