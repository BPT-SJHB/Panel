import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { Driver_TruckManagementService } from './driver-truck-management.service';
import {
  TruckDriverInfo,
  zodTruckDriverInfo,
} from './model/truck-driver-info.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import {
  UsernamePassword,
  zodUsernamePassword,
} from 'app/data/model/username-password.model';
import { delay } from 'rxjs';
import { TruckInfo, zodTruckInfo } from './model/truck-info.model';
import {
  TruckNativenessInfo,
  TruckNativenessType,
  zodTruckNativenessInfo,
  zodTruckNativenessType,
} from './model/truck-nativeness-info.model';
import z from 'zod';
describe('Driver_TruckManagementService', () => {
  let service: Driver_TruckManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(Driver_TruckManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
