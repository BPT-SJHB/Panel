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

  it('GetAllProvinces: should return all provinces', async () => {
    await devAuth.loginAsAdmin();

    const searchString = 'ا';
    const res = await service.GetAllProvinces(searchString);

    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item: Province) =>
      expect(item).toEqual(jasmine.any(Object))
    );
  });

  it('ChangeProvinceStatus: should change province status', async () => {
    await devAuth.loginAsAdmin();

    const provinceId = 11; // Tehran ID
    const status = true;
    const res = await service.ChangeProvinceStatus(provinceId, status);

    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Message).toBeDefined();
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
