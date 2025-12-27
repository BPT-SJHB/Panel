import { TestBed } from '@angular/core/testing';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { Captcha, zodCaptcha } from 'app/data/model/captcha-challenge.model';
import { CaptchaService } from './captcha.service';

const ApiCaptchaSchema = createApiResponseSchema(zodCaptcha);

describe('AnnouncementGroupSubgroupManagementService', () => {
  let service: CaptchaService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(CaptchaService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
});
