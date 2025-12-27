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
});
