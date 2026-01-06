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

