import { z } from 'zod';

export interface LoadAnnouncementConfig {
  COLAId: number;
  COLAName: string;
  COLATitle: string;
  AnnouncementId: number;
  AnnouncementSGId: number;
  AnnouncementTitle: string;
  AnnouncementSGTitle: string;
  COLAIndex: number;
  COLAIndexTitle: string;
  Description: string;
  COLAValue: string;
}

export const zodLoadAnnouncementConfig = z.object({
  COLAId: z.number(),
  COLAName: z.string(),
  COLATitle: z.string(),
  AnnouncementId: z.number(),
  AnnouncementSGId: z.number(),
  AnnouncementTitle: z.string(),
  AnnouncementSGTitle: z.string(),
  COLAIndex: z.number(),
  COLAIndexTitle: z.string(),
  Description: z.string(),
  COLAValue: z.string(),
});

export type DeleteInfoOfLoadAnnouncementConfig = Pick<
  LoadAnnouncementConfig,
  'COLAId' | 'COLAIndex' | 'AnnouncementId' | 'AnnouncementSGId'
>;
