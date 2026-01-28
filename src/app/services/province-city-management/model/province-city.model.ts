import z from 'zod';

export interface City {
  CityCode: number;
  CityTitle?: string;
  CityActive?: boolean;
}

export const zodCity = z.object({
  CityCode: z.number(),
  CityTitle: z.string().optional(),
  CityActive: z.boolean().optional(),
});

export interface Province {
  ProvinceId: number;
  ProvinceName?: string;
  ProvinceActive?: boolean;
  Cities?: City[];
}

export const zodProvince = z.object({
  ProvinceId: z.number(),
  ProvinceName: z.string().optional(),
  ProvinceActive: z.boolean().optional(),
  Cities: z.array(zodCity).optional(),
});
