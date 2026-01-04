import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { FpcManagementService } from './fpc-management.service';
import z from 'zod';
import { FPCInfo, zodFPCInfo } from 'app/data/model/fpc-info.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  UsernamePassword,
  zodUsernamePassword,
} from 'app/data/model/username-password.model';

const FPCInfoSampleData: FPCInfo = {
  FPCId: 1002,
  FPCTitle: 'فولاد',
  FPCTel: '',
  FPCAddress: 'کوهپایه',
  FPCManagerMobileNumber: '09120432155',
  FPCManagerNameFamily: 'محمدی',
  EmailAddress: 'y@gmail.com',
  Active: true,
};

const ApiFPCsInfoSchema = createApiResponseSchema(z.array(zodFPCInfo));

const ApiFPCInfoSchema = createApiResponseSchema(zodFPCInfo);

const ApiUsernamePasswordSchema = createApiResponseSchema(zodUsernamePassword);

describe('FpcManagementService', () => {
  let service: FpcManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(FpcManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing FPC methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.FPCRegistering(FPCInfoSampleData);
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getAllRes = await service.GetFPCsInfo(FPCInfoSampleData.FPCTitle!);
    validateResponse<FPCInfo[]>(getAllRes, ApiFPCsInfoSchema);

    const getByIdRes = await service.GetFPCInfo(FPCInfoSampleData.FPCId);
    validateResponse<FPCInfo>(getByIdRes, ApiFPCInfoSchema);

    const activeSMSRes = await service.ActivateFPCSms(FPCInfoSampleData.FPCId);
    validateResponse<ShortResponse>(activeSMSRes, ApiShortResponseSchema);

    const editRes = await service.EditFPC(FPCInfoSampleData);
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const resetPassRes = await service.ResetFPCUserPassword(
      FPCInfoSampleData.FPCId
    );
    validateResponse<UsernamePassword>(resetPassRes, ApiUsernamePasswordSchema);

    const changeStatRes = await service.FPCChangeActiveStatus(
      FPCInfoSampleData.FPCId
    );
    validateResponse<ShortResponse>(changeStatRes, ApiShortResponseSchema);
  });
});
