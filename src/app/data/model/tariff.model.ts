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
