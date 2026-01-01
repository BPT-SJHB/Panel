import { TestBed } from '@angular/core/testing';
import { TPTParamsManagementService } from './tptparams-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  TPTParamInfo,
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  zodTPTParamInfo,
  zodTPTParamRelationToAnnouncementGroupAndSubGroup,
} from './model/tptparam-info.model';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { z } from 'zod';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';

const tptParamSampleData: TPTParamRelationToAnnouncementGroupAndSubGroup = {
  TPTPDId: 157,
  TPTPId: 8,
  TPTPTitle: 'پروژه',
  AnnouncementId: 2,
  AnnouncementTitle:
    'تريلي برون شهري ذوب و سبا                                                                           ',
  AnnouncementSGId: 7,
  AnnouncementSGTitle:
    'برون شهری آهن آلات ذوبی                                                                             ',
  Cost: 7000000,
  Active: true,
};

const ApiTPTParamsInfoSchema = createApiResponseSchema(
  z.array(zodTPTParamInfo)
);

const ApiTPTParamInfoSchema = createApiResponseSchema(zodTPTParamInfo);

const ApiTPTParamRelationsToAnnouncementGroupAndSubGroup =
  createApiResponseSchema(
    z.array(zodTPTParamRelationToAnnouncementGroupAndSubGroup)
  );

describe('TPTParamsManagementService (integration)', () => {
  let service: TPTParamsManagementService;
  let devAuth: DevAuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TPTParamsManagementService, UserAuthService, DevAuthService],
    });

    service = TestBed.inject(TPTParamsManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing Transport Price Tarrif Parameter methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const getAllRes = await service.GetAllTPTParams();
    validateResponse<TPTParamInfo[]>(getAllRes, ApiTPTParamsInfoSchema);

    const regRes = await service.RegisterTPTParam({
      TPTPTitle: tptParamSampleData.TPTPTitle,
    });
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getRes = await service.GetTPTParam(tptParamSampleData.TPTPTitle);
    validateResponse<TPTParamInfo>(getRes, ApiTPTParamInfoSchema);

    const editRes = await service.EditTPTParam(tptParamSampleData);
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const delRes = await service.DeleteTPTParam({
      TPTPId: tptParamSampleData.TPTPId,
    });
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });

  it('should fetch all relations to announcement groups and subgroups', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetAllRelationsToAnnouncementGroupAndSubGroup();

    expect(res.data)
      .withContext(
        'GetAllRelationsToAnnouncementGroupAndSubGroup: should return an array'
      )
      .toEqual(jasmine.any(Array));

    res.data?.forEach((item) => {
      expect(item)
        .withContext(
          'GetAllRelationsToAnnouncementGroupAndSubGroup: each item should be an object'
        )
        .toEqual(jasmine.any(Object));
    });
  });
});
