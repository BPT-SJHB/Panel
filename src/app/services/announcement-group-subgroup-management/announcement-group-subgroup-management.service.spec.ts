import { TestBed } from '@angular/core/testing';
import { z } from 'zod';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { AnnouncementGroupSubgroupManagementService } from './announcement-group-subgroup-management.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import {
  AnnouncementGroup,
  zodAnnouncementGroup,
} from './model/announcement-group.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import {
  AnnouncementSubGroup,
  zodAnnouncementSubGroup,
} from './model/announcement-subgroup.model';
import {
  RelationOfAnnouncementGroupAndSubGroup,
  zodRelationOfAnnouncementGroupAndSubGroup,
} from './model/relation-of-announcement-group-subgroup.model';
import {
  RelationOfAnnouncementSubGroupAndProvince,
  zodRelationOfAnnouncementSubGroupAndProvince,
} from './model/relation-of-announcement-subgroup-province.model';

const groupSampleData: AnnouncementGroup = {
  AnnouncementId: 0,
  AnnouncementTitle: 'تست',
  Active: true,
};

const subGroupSampleData: AnnouncementSubGroup = {
  AnnouncementSGId: 0,
  AnnouncementSGTitle: 'تست',
  Active: true,
};

const relationOfAnnouncementSubGroupAndProvinceSampleData: relationOfAnnouncementSubGroupAndProvince =
  {
    ProvinceId: 26,
    ProvinceName:
      'آذربایجان شرقی                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ',
    AnnouncementId: 3,
    AnnouncementTitle:
      'اعلام بار انباری                                                                                    ',
    AnnouncementSGId: 14,
    AnnouncementSGTitle:
      'برون شهری آهن آلات انباری                                                                           ',
  };

const ApiAnnouncementGroupsResponseSchema = createApiResponseSchema(
  z.array(zodAnnouncementGroup)
);

const ApiRelationOfAnnouncementGroupAndSubGroupSchema = createApiResponseSchema(
  z.array(zodRelationOfAnnouncementGroupAndSubGroup)
);

const ApiRelationOfAnnouncementSubGroupAndProvinceSchema =
  createApiResponseSchema(
    z.array(zodRelationOfAnnouncementSubGroupAndProvince)
  );

fdescribe('AnnouncementGroupSubgroupManagementService', () => {
  let service: AnnouncementGroupSubgroupManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(AnnouncementGroupSubgroupManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing Announcement Group methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const resReg = await service.RegisterNewAnnouncementGroup(
      groupSampleData.AnnouncementTitle!
    );
    validateResponse<ShortResponse>(resReg, ApiShortResponseSchema);

    const resGet = await service.GetAnnouncementGroups(
      groupSampleData.AnnouncementTitle!
    );
    validateResponse<AnnouncementGroup[]>(
      resGet,
      ApiAnnouncementGroupsResponseSchema
    );

    groupSampleData.AnnouncementId =
      resGet.data[resGet.data.length - 1].AnnouncementId;

    const resEdit = await service.EditAnnouncementGroup(
      groupSampleData.AnnouncementId,
      groupSampleData.AnnouncementTitle!,
      groupSampleData.Active!
    );
    validateResponse<ShortResponse>(resEdit, ApiShortResponseSchema);

    const resDel = await service.DeleteAnnouncementGroup(
      groupSampleData.AnnouncementId
    );
    validateResponse<ShortResponse>(resDel, ApiShortResponseSchema);
  });

  it('Testing Announcement SubGroup methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const resReg = await service.RegisterNewAnnouncementSubGroup('تست');
    validateResponse<ShortResponse>(resReg, ApiShortResponseSchema);

    const resGet = await service.GetAnnouncementSubGroups('تست');
    validateResponse<AnnouncementSubGroup[]>(
      resGet,
      createApiResponseSchema(z.array(zodAnnouncementSubGroup))
    );

    subGroupSampleData.AnnouncementSGId =
      resGet.data[resGet.data.length - 1].AnnouncementSGId;

    const resEdit = await service.EditAnnouncementGroup(
      subGroupSampleData.AnnouncementSGId,
      subGroupSampleData.AnnouncementSGTitle!,
      subGroupSampleData.Active!
    );
    validateResponse<ShortResponse>(resEdit, ApiShortResponseSchema);

    const resDel = await service.DeleteAnnouncementGroup(
      subGroupSampleData.AnnouncementSGId
    );
    validateResponse<ShortResponse>(resDel, ApiShortResponseSchema);
  });

  it('Testing Announcement Group/SubGroup methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const resReg =
      await service.RegisterNewRelationOfAnnouncementGroupAndSubGroup(
        groupSampleData.AnnouncementId,
        subGroupSampleData.AnnouncementSGId
      );
    validateResponse<ShortResponse>(resReg, ApiShortResponseSchema);

    const resGet = await service.GetRelationOfAnnouncementGroupAndSubGroup(
      groupSampleData.AnnouncementId
    );

    validateResponse<RelationOfAnnouncementGroupAndSubGroup[]>(
      resGet,
      ApiRelationOfAnnouncementGroupAndSubGroupSchema
    );

    const resDel = await service.DeleteRelationOfAnnouncementGroupAndSubGroup(
      groupSampleData.AnnouncementId,
      subGroupSampleData.AnnouncementSGId
    );

    validateResponse<ShortResponse>(resDel, ApiShortResponseSchema);
  });
});
