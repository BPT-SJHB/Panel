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

const ApiLoaderTypesSchema = createApiResponseSchema(z.array(zodLoaderType));
const ApiLoaderTypeSchema = createApiResponseSchema(zodLoaderType);

const ApiLoaderTypeRelationsToAnnouncementSubGroups = createApiResponseSchema(
  z.array(zodLoaderTypeToAnnouncementSubGroupRelation)
);

const loaderTypeSampleData: LoaderType = {
  LoaderTypeId: 505,
  LoaderTypeTitle:
    'کفی 18 چرخ                                                                                          ',
  LoaderTypeOrganizationId: 505,
  LoaderTypeFixStatusId: 2,
  LoaderTypeFixStatusTitle:
    'بارگير غير ثابت                                                                                     ',
  Active: true,
};

const loaderTypeToAnnouncementSubGroupRelationSampleData: LoaderTypeToAnnouncementSubGroupRelation =
  {
    LoaderTypeId: 505,
    LoaderTypeTitle:
      'کفی 18 چرخ                                                                                          ',
    AnnouncementSGId: 7,
    AnnouncementSGTitle:
      'برون شهری آهن آلات ذوبی                                                                             ',
    AnnouncementId: 2,
    AnnouncementTitle:
      'تريلي برون شهري ذوب و سبا                                                                           ',
  };

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

  //#region LoaderTypes

  it('Testing GetLoaderTypesInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetLoaderTypesInfo(
      loaderTypeSampleData.LoaderTypeTitle!
    );

    validateResponse<LoaderType[]>(response, ApiLoaderTypesSchema);
  });

  it('Testing GetLoaderTypeInfoForSoftwareUser method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetLoaderTypeInfoForSoftwareUser();

    validateResponse<LoaderType>(response, ApiLoaderTypeSchema);
  });

  it('Testing ChangeLoaderTypeStatus method', async () => {
    await devAuth.loginAsAdmin();

    const deActiveRes = await service.ChangeLoaderTypeStatus(
      loaderTypeSampleData.LoaderTypeId
    );
    validateResponse<ShortResponse>(deActiveRes, ApiShortResponseSchema);

    const reActiveRes = await service.ChangeLoaderTypeStatus(
      loaderTypeSampleData.LoaderTypeId
    );
    validateResponse<ShortResponse>(reActiveRes, ApiShortResponseSchema);
  });

  //#endregion

});
