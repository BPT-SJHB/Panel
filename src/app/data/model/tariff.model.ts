export interface Tariff {
  LoaderTypeId: number;
  SourceCityId: number | undefined;
  TargetCityId: number | undefined;
  GoodId: number | undefined;
  TargetCityTitle?: string;
  SourceCityTitle?: string;
  LoaderTypeTitle?: string;
  GoodTitle?: string;
  Tariff?: number;
  BaseTonnag?: number;
  CalculationReference?: string;
  Active?: boolean;
}
