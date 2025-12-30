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
});
