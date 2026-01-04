import z from 'zod';

export interface TravelTime {
  LoaderTypeId: number;
  SourceCityId: number | undefined;
  TargetCityId: number | undefined;
  LoaderTypeTitle?: string;
  SourceCityName?: string;
  TargetCityName?: string;
  TravelTime?: number;
  Active?: boolean;
}

export const zodTravelTime = z.object({
  LoaderTypeId: z.number(),
  SourceCityId: z.number().or(z.undefined()),
  TargetCityId: z.number().or(z.undefined()),
  LoaderTypeTitle: z.string().optional(),
  SourceCityName: z.string().optional(),
  TargetCityName: z.string().optional(),
  TravelTime: z.number().optional(),
  Active: z.boolean().optional(),
});
