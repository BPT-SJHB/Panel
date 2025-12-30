import { z } from 'zod';

export interface CarouselPic {
  Picture: string;
}

export const zodCarouselPic = z.object({
  Picture: z.string(),
});
