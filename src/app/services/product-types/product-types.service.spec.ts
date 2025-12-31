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

const ApiProductTypesSchema = createApiResponseSchema(z.array(zodProductType));

const productTypeSampleData: ProductType = {
  ProductTypeId: 1001,
  ProductTypeTitle: 'آهن آلات',
  ProductTypeActive: true,
  Products: [
    {
      ProductId: 2650000,
      ProductTitle: 'اكسيد آهن',
      ProductActive: false,
    },
  ],
};

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

  it('Testing GetProductsInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetProductsInfo(
      productTypeSampleData.ProductTypeTitle!
    );

    validateResponse<ProductType[]>(response, ApiProductTypesSchema);
  });

  it('Testing ChangeProductTypeStatus method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.ChangeProductTypeStatus(
      productTypeSampleData.ProductTypeId,
      true
    );

    validateResponse<ShortResponse>(response, ApiShortResponseSchema);
  });

  it('Testing ChangeProductStatus method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.ChangeProductStatus(
      productTypeSampleData.Products![0].ProductId,
      true
    );

    validateResponse<ShortResponse>(response, ApiShortResponseSchema);
  });
});
