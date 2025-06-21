export interface Province {
  ProvinceId: number;
  ProvinceName?: string;
  ProvinceActive?: boolean;
  Cities?: City[];
}

export interface City {
  CityCode: number;
  CityTitle?: string;
  CityActive?: boolean;
}
