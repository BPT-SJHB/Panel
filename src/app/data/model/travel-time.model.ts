export interface TravelTime {
  LoaderTypeId: number;
  SourceCityId: number | undefined;
  TargetCityId: number | undefined;
  SourceCityName?: string;
  TargetCityName?: string;
  TravelTime?: number;
  Active?: boolean;
}
