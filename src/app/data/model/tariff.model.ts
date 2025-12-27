import { z } from 'zod';

export interface Tariff {
  LoaderTypeId: number;
  SourceCityId: number | undefined;
  TargetCityId: number | undefined;
  GoodId: number | undefined;
  LoaderTypeTitle?: string;
  SourceCityTitle?: string;
  TargetCityTitle?: string;
  GoodTitle?: string;
  Tariff?: number;
  BaseTonnag?: number;
  CalculationReference?: string;
  Active?: boolean;
}

export const zodTariff = z.object({
  LoaderTypeId: z.number(),
  SourceCityId: z.number().optional(),
  TargetCityId: z.number().optional(),
  GoodId: z.number().optional(),
  LoaderTypeTitle: z.string().optional(),
  SourceCityTitle: z.string().optional(),
  TargetCityTitle: z.string().optional(),
  GoodTitle: z.string().optional(),
  Tariff: z.number(),
  BaseTonnag: z.number(),
  CalculationReference: z.string().optional(),
  Active: z.boolean(),
});
