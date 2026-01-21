import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { LoadManagementService } from './load-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import z from 'zod';
import { LoadInfo, zodLoadInfo } from './model/load-info.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  LoadForTransportCompanies_Factories_Admins_Drivers,
  zodLoadForTransportCompanies_Factories_Admins_Drivers,
} from './model/load-info-for-transport-companies-factories-admins-drivers.model';
import { LoadStatus, zodLoadStatus } from './model/load-status.model';
import {
  TransportTariffParam,
  zodTransportTariffParam,
} from './model/transport-tariff-param.model';
import { mockTransportTariffParamInString } from './mock/transport-tariff-param.mock';
import { LoadAllocationPriority } from './model/load-allocation-priority';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import {
  LoadAllocationInfo,
  zodLoadAllocationInfo,
} from './model/load-allocation-info.model';
import {
  LoadAllocatedToNextTurn,
  zodLoadAllocateToNextTurn,
} from './model/load-allocated-to-next-turn.model';

describe('LoadManagementService', () => {
  let service: LoadManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(LoadManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
