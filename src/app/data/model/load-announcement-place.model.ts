import { z } from 'zod';

export interface LoadAnnouncementPlace {
  LAPId: number;
  LAPTitle: string;
  LAPName: string;
  LAPIconName: string;
  LAPURL: string;
  Description: string;
  ImageLink?: string;
  ViewFlag: boolean;
  ProvinceId: number;
  Province?: string;
  Active: boolean;
}

export const zodLoadAnnouncementPlace = z.object({
  LAPId: z.number(),
  LAPTitle: z.string(),
  LAPName: z.string(),
  LAPIconName: z.string(),
  LAPURL: z.string(),
  Description: z.string(),
  ImageLink: z.string().optional(),
  ViewFlag: z.boolean(),
  ProvinceId: z.number(),
  Province: z.string().optional(),
  Active: z.boolean(),
});
