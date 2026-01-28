import { z } from 'zod';

export interface CarouselForViewPic {
  CId: number;
  URL: string;
  Picture: string;
}

export const zodCarouselForViewPic = z.object({
  CId: z.number(),
  URL: z.string(),
  Picture: z.string(),
});
