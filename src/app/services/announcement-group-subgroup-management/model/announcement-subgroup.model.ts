import { z } from 'zod';

export interface AnnouncementSubGroup {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
  Active?: boolean;
}

export const zodAnnouncementSubGroup = z.object({
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string().optional(),
  Active: z.boolean().optional(),
});
