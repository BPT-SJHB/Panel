import { z } from 'zod';

export interface AnnouncementGroup {
  AnnouncementId: number;
  AnnouncementTitle?: string;
  Active?: boolean;
}

export const zodAnnouncementGroup = z.object({
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string().optional(),
  Active: z.boolean().optional(),
});
