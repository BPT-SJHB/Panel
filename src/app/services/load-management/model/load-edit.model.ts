export interface LoadEdit {
  LoadId: number;
  GoodId?: number;
  SourceCityId?: number;
  TargetCityId?: number;
  LoadingPlaceId?: number;
  DischargingPlaceId?: number;
  TotalNumber?: number;
  Tonaj?: number;
  Tariff?: string;
  Recipient?: string;
  Address?: string;
  Description?: string;
  TPTParams?: string;
}
