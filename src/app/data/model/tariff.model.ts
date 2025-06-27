export interface Tariff {
  SourceCityId: number;
  TargetCityId: number;
  LoaderTypeId: number;
  GoodId: number;
  TargetCityTitle?: string;
  SourceCityTitle?: string;
  LoaderTypeTitle?: string;
  GoodTitle?: string;
  Tariff?: number;
  BaseTonnag?: number;
  CalculationReference?: string;
  Active?: boolean;
}
