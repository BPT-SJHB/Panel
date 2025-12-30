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

const TruckDriverInfoSampleData: TruckDriverInfo = {
  DriverId: 1,
  NameFamily: ';محمد;عباسي',
  NationalCode: '5759871382',
  MobileNumber: '09131210201',
  FatherName: 'قياقلي',
  DrivingLicenseNo: '4010300402',
  Address: '',
  SmartCardNo: '1228050',
};

const TruckInfoSampleData: TruckInfo = {
  TruckId: 5,
  LoaderTypeId: 605,
  Pelak: '673ع32',
  Serial: '52',
  SmartCardNo: '2305365',
};

const ApiTruckDriverInfoSchema = createApiResponseSchema(zodTruckDriverInfo);

const ApiUsernamePasswordSchema = createApiResponseSchema(zodUsernamePassword);

const ApiTruckInfoSchema = createApiResponseSchema(zodTruckInfo);

const ApiTruckNativenessInfoSchema = createApiResponseSchema(
  zodTruckNativenessInfo
);

const ApiTruckNativenessTypeSchema = createApiResponseSchema(
  z.array(zodTruckNativenessType)
);

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

  it('Testing GetDriverInfoForSoftwareUser method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetDriverInfoForSoftwareUser();

    validateResponse<TruckDriverInfo>(response, ApiTruckDriverInfoSchema);
  });

  it('Testing GetDriverInfoFromAPI method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetDriverInfoFromAPI(
      TruckDriverInfoSampleData.NationalCode!
    );

    validateResponse<TruckDriverInfo>(response, ApiTruckDriverInfoSchema);
  });

});
