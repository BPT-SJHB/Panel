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

const travelTimeSampleData: TravelTime = {
  LoaderTypeId: 505,
  LoaderTypeTitle: 'کفی 18 چرخ',
  SourceCityId: 21310000,
  SourceCityName: 'اصفهان - اصفهان',
  TargetCityId: 11320000,
  TargetCityName: 'تهران',
  TravelTime: 24,
  Active: true,
};

const ApiTravelTimesSchema = createApiResponseSchema(z.array(zodTravelTime));

const ApiTravelTimeSchema = createApiResponseSchema(zodTravelTime);

describe('TravelTimeManagementService', () => {
  let service: TravelTimeManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(TravelTimeManagementService);
    devAuth = TestBed.inject(DevAuthService);
    devAuth.logout();
  });








  });
});
