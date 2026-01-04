import { TestBed } from '@angular/core/testing';
import { TravelTimeManagementService } from './travel-time-management.service';
import { TravelTime, zodTravelTime } from 'app/data/model/travel-time.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import z from 'zod';

describe('TravelTimeManagementService', () => {
  let service: TravelTimeManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TravelTimeManagementService,
        UserAuthService,
        APICommunicationManagementService,
      ],
    });

    service = TestBed.inject(TravelTimeManagementService);
    devAuth = TestBed.inject(DevAuthService);
    devAuth.loginAsAdmin();
  });

  it('GetTravelTimes: should work with source and target city ids', async () => {
    const res = await service.GetTravelTimes(1, 10, 20);

    expect(res.data)
      .withContext(
        'GetTravelTimes: should return array when source and target are provided'
      )
      .toEqual(jasmine.any(Array));
  });

  it('GetTravelTime: should return single travel time', async () => {
    const res = await service.GetTravelTime(1, 10, 20);

    expect(res.data)
      .withContext('GetTravelTime: should return TravelTime object')
      .toBeDefined();

    expect((res.data as TravelTime)?.LoaderTypeId)
      .withContext('GetTravelTime: LoaderTypeId should exist')
      .toBeDefined();
  });

  it('RegisterNewTravelTime: should return ShortResponse', async () => {
    const res = await service.RegisterNewTravelTime(1, 10, 20, 5);

    expect(res.data)
      .withContext('RegisterNewTravelTime: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('RegisterNewTravelTime: should return success message')
      .toBeDefined();
  });

  it('EditTravelTime: should return ShortResponse', async () => {
    const res = await service.EditTravelTime(1, 10, 20, 8);

    expect(res.data)
      .withContext('EditTravelTime: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('EditTravelTime: should return success message')
      .toBeDefined();
  });

  it('DeleteTravelTime: should return ShortResponse', async () => {
    const res = await service.DeleteTravelTime(1, 10, 20);

    expect(res.data)
      .withContext('DeleteTravelTime: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('DeleteTravelTime: should return success message')
      .toBeDefined();
  });

  it('ChangeTravelTimeStatus: should return ShortResponse', async () => {
    const res = await service.ChangeTravelTimeStatus(1, 10, 20);

    expect(res.data)
      .withContext('ChangeTravelTimeStatus: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('ChangeTravelTimeStatus: should return success message')
      .toBeDefined();
  });
});
