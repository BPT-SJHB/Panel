import { TestBed } from '@angular/core/testing';
import { Tariff, zodTariff } from 'app/data/model/tariff.model';
import { TariffsManagementService } from './tariffs-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import z from 'zod';
describe('TariffsManagementService', () => {
  let service: TariffsManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(TariffsManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
