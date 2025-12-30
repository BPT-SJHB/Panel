import { z } from 'zod';

export interface CarouselInfo {
  CId: number;
  CTitle: string;
  URL: string;
  Description: string;
  DateTimeMilladi: string;
  ShamsiDate: string;
  Time: string;
  Active: boolean;
  Picture?: string;
}

export const zodCarouselInfo = z.object({
  CId: z.number(),
  CTitle: z.string(),
  URL: z.string(),
  Description: z.string(),
  DateTimeMilladi: z.string(),
  ShamsiDate: z.string(),
  Time: z.string(),
  Active: z.boolean(),
  Picture: z.string().optional(),
});
