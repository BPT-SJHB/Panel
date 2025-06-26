export interface TravelTime {
  LoaderTypeId: number;
  SourceCityId: number;
  SourceCityName?: string;
  TargetCityId: number;
  TargetCityName?: string;
  TravelTime?: number;
  Active?: boolean;
}
