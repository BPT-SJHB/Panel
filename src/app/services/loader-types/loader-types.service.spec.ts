import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { LoaderTypesService } from './loader-types.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { LoaderType, zodLoaderType } from './model/loader-type.model';
import z from 'zod';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import {
  LoaderTypeToAnnouncementSubGroupRelation,
  zodLoaderTypeToAnnouncementSubGroupRelation,
} from './model/loader-type-announcement-sub-groups-relation.model';

describe('LoaderTypesService', () => {
  let service: LoaderTypesService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(LoaderTypesService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
