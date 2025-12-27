import { TestBed } from '@angular/core/testing';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { z } from 'zod';
import { PageGroup, zodPageGroup } from 'app/data/model/page-group.model';
import { zodError } from 'app/data/model/api-Response.model';
import { ApiProcessesService } from './api-processes.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';

const ApiPageGroupSchema = createApiResponseSchema(z.array(zodPageGroup));

describe('ApiProcessesService', () => {
  let service: ApiProcessesService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(ApiProcessesService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('getApiProcesses Method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.getApiProcesses();

    validateResponse<PageGroup[]>(response, ApiPageGroupSchema);
  });

  it('getTaskBarWebProcesses Method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.getTaskBarWebProcesses();

    validateResponse<PageGroup[]>(response, ApiPageGroupSchema);
  });
});
