import z from 'zod';

export interface LADPlace {
  LADPlaceId: number;
  LADPlaceTitle: string;
  LADPlaceTel?: string;
  LADPlaceAddress?: string;
  LoadingActive?: boolean;
  DischargingActive?: boolean;
}

export const zodLADPlace = z.object({
  LADPlaceId: z.number(),
  LADPlaceTitle: z.string(),
  LADPlaceTel: z.string().optional(),
  LADPlaceAddress: z.string().optional(),
  LoadingActive: z.boolean().optional(),
  DischargingActive: z.boolean().optional(),
});
