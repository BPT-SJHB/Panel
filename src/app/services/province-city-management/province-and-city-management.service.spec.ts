import { TestBed } from '@angular/core/testing';
import { ProvinceAndCityManagementService } from './province-and-city-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { Province, zodProvince } from './model/province-city.model';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import z from 'zod';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';

const provinceSampleData: Province = {
  ProvinceId: 11,
  ProvinceName: 'تهران',
  ProvinceActive: true,
  Cities: [
    {
      CityCode: 11320000,
      CityTitle: 'تهران',
      CityActive: true,
    },
  ],
};

const ApiProvinceSchema = createApiResponseSchema(z.array(zodProvince));

describe('ProvinceAndCityManagementService', () => {
  let service: ProvinceAndCityManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceAndCityManagementService, DevAuthService],
    });

    service = TestBed.inject(ProvinceAndCityManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing GetProvincesAndCitiesInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetProvincesAndCitiesInfo(
      provinceSampleData.ProvinceName!
    );

    validateResponse<Province[]>(response, ApiProvinceSchema);
  });

  it('Testing GetAllProvinces method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetAllProvinces(
      provinceSampleData.ProvinceName!
    );

    validateResponse<Province[]>(response, ApiProvinceSchema);
  });

  it('Testing ChangeProvinceStatus method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.ChangeProvinceStatus(
      provinceSampleData.ProvinceId,
      provinceSampleData.ProvinceActive!
    );

    validateResponse<ShortResponse>(response, ApiShortResponseSchema);
  });

  it('ChangeCityStatus: should change city status', async () => {
    await devAuth.loginAsAdmin();

    const cityCode = 11320000;
    const status = false;
    const res = await service.ChangeCityStatus(cityCode, status);

    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Message).toBeDefined();
  });
});
