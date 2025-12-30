import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ConfigManagementService } from './config-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import z from 'zod';
import {
  LoadAnnouncementConfig,
  zodLoadAnnouncementConfig,
} from './model/load-announcement-config.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { GeneralConfig, zodGeneralConfig } from './model/general-config.model';
import { DeviceInfo, zodDeviceInfo } from './model/device-info.model';
import { DeviceConfig, zodDeviceConfig } from './model/device-config.model';
import {
  LoadViewConditionInfo,
  zodLoadViewConditionInfo,
} from './model/load-view-condition-info.model';
import {
  LoadAllocationConditionInfo,
  zodLoadAllocationConditionInfo,
} from './model/load-allocation-condition-info.model';
describe('ConfigManagementService', () => {
  let service: ConfigManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(ConfigManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
