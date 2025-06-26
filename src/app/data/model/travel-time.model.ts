export interface TravelTime {
  LoaderTypeId: number;
  SourceCityId: number | undefined;
  SourceCityName?: string;
  TargetCityId: number | undefined;
  TargetCityName?: string;
  TravelTime?: number;
  Active?: boolean;
}
