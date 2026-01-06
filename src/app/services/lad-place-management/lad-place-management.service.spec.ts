import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { LADPlaceManagementService } from './lad-place-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { LADPlace, zodLADPlace } from 'app/data/model/lad-place.model';
import z from 'zod';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';

const LADPlaceSampleData: LADPlace = {
  LADPlaceId: 0,
  LADPlaceTitle: 'فولاد',
  LADPlaceTel: '',
  LADPlaceAddress: '',
  LoadingActive: true,
  DischargingActive: true,
};

const ApiLADPlaceSchema = createApiResponseSchema(zodLADPlace);

const ApiLADPlacesSchema = createApiResponseSchema(z.array(zodLADPlace));

describe('LADPlaceManagementService', () => {
  let service: LADPlaceManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(LADPlaceManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing LADPlace methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterNewLADPlace(LADPlaceSampleData);
    validateResponse<LADPlace>(regRes, ApiLADPlaceSchema);

    LADPlaceSampleData.LADPlaceId = regRes.data.LADPlaceId;

    const getAllRes = await service.GetLADPlaces(
      LADPlaceSampleData.LADPlaceTitle
    );
    validateResponse<LADPlace[]>(getAllRes, ApiLADPlacesSchema);

    const getByIdRes = await service.GetLADPlace(LADPlaceSampleData.LADPlaceId);
    validateResponse<LADPlace>(getByIdRes, ApiLADPlaceSchema);

    const updateRes = await service.UpdateLADPlace(LADPlaceSampleData);
    validateResponse<ShortResponse>(updateRes, ApiShortResponseSchema);

    const deactivateLoadingPlaceRes = await service.ChangeLoadingPlaceStatus(
      LADPlaceSampleData.LADPlaceId
    );
    validateResponse<ShortResponse>(
      deactivateLoadingPlaceRes,
      ApiShortResponseSchema
    );

    const activateLoadingPlaceRes = await service.ChangeLoadingPlaceStatus(
      LADPlaceSampleData.LADPlaceId
    );
    validateResponse<ShortResponse>(
      activateLoadingPlaceRes,
      ApiShortResponseSchema
    );

    const deactivateDischargingPlaceRes =
      await service.ChangeDischargingPlaceStatus(LADPlaceSampleData.LADPlaceId);
    validateResponse<ShortResponse>(
      deactivateDischargingPlaceRes,
      ApiShortResponseSchema
    );

    const activateDischargingPlaceRes =
      await service.ChangeDischargingPlaceStatus(LADPlaceSampleData.LADPlaceId);
    validateResponse<ShortResponse>(
      activateDischargingPlaceRes,
      ApiShortResponseSchema
    );

    const delRes = await service.DeleteLADPlace(LADPlaceSampleData.LADPlaceId);
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });
});
