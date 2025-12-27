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
  SourceCityId: z.number().or(z.undefined()),
  TargetCityId: z.number().or(z.undefined()),
  GoodId: z.number().or(z.undefined()),
  LoaderTypeTitle: z.string().optional(),
  SourceCityTitle: z.string().optional(),
  TargetCityTitle: z.string().optional(),
  GoodTitle: z.string().optional(),
  Tariff: z.number().optional(),
  BaseTonnag: z.number().optional(),
  CalculationReference: z.string().optional(),
  Active: z.boolean().optional(),
});

export type DeleteTariffInfo = Pick<
  Tariff,
  'SourceCityId' | 'TargetCityId' | 'LoaderTypeId' | 'GoodId'
>;

export type EditTariffInfo = Pick<
  Tariff,
  | 'SourceCityId'
  | 'TargetCityId'
  | 'LoaderTypeId'
  | 'GoodId'
  | 'Tariff'
  | 'BaseTonnag'
>;
