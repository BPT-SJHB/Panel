import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { CarouselManagementService } from './carousel-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { CarouselInfo, zodCarouselInfo } from './model/carousel-info.model';
import z from 'zod';
import {
  CarouselForViewPic,
  zodCarouselForViewPic,
} from './model/carousel-pic-forView.model';
import { mockCarouselPic } from './mock/carousel-pic.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { CarouselPic, zodCarouselPic } from './model/carousel-pic.model';

const ApiCarouselInfoSchema = createApiResponseSchema(z.array(zodCarouselInfo));

const ApiCarouselForViewPicSchema = createApiResponseSchema(
  z.array(zodCarouselForViewPic)
);

const ApiCarouselPicSchema = createApiResponseSchema(zodCarouselPic);

const carouselSampleData: CarouselInfo = {
  CId: 0,
  CTitle: 'تست',
  URL: 'Https://ATISMobile.ir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ',
  Description: 'تست',
  DateTimeMilladi: '2025-08-12T00:00:00',
  ShamsiDate: '1404/05/21',
  Time: '00:00:00',
  Active: true,
  Picture: mockCarouselPic.Picture,
};

describe('CarouselManagementService', () => {
  let service: CarouselManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(CarouselManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing GetAllCarousels method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetAllCarousels();

    validateResponse<CarouselInfo[]>(response, ApiCarouselInfoSchema);
  });

  it('Testing with flow | Register -> GetAll -> GetPic -> Edit -> ChangeStatus -> Delete', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterCarousel(
      carouselSampleData.CTitle,
      carouselSampleData.URL,
      carouselSampleData.Description,
      carouselSampleData.Picture ?? ''
    );
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getAllRes = await service.GetAllActiveCarousels();
    validateResponse<CarouselInfo[]>(getAllRes, ApiCarouselInfoSchema);

    carouselSampleData.CId = getAllRes.data[getAllRes.data.length - 1].CId;

    const getPicRes = await service.GetCarouselPic(carouselSampleData.CId);
    validateResponse<CarouselPic>(getPicRes, ApiCarouselPicSchema);

    const editRes = await service.EditCarousel(
      carouselSampleData.CId,
      carouselSampleData.CTitle,
      carouselSampleData.URL,
      carouselSampleData.Description,
      carouselSampleData.Picture ?? ''
    );
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const changeStatRes = await service.ChangeCarouselStatus(
      carouselSampleData.CId,
      carouselSampleData.Active
    );
    validateResponse<ShortResponse>(changeStatRes, ApiShortResponseSchema);

    const delRes = await service.DeleteCarousel(carouselSampleData.CId);
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });
});
