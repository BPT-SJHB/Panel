export interface LoadRegister {
  TransportCompanyId?: number;
  GoodId?: number;
  AnnouncementGroupId?: number;
  AnnouncementSubGroupId?: number;
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
  LoadStatusId?: number;
  TPTParams?: string;
}
