import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ProductTypesService } from './product-types.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { ProductType, zodProductType } from 'app/data/model/product-type.model';
import z from 'zod';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
describe('ProductTypesService', () => {
  let service: ProductTypesService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(ProductTypesService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
