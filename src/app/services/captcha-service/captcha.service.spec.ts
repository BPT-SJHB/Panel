import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { Captcha, zodCaptcha } from 'app/data/model/captcha-challenge.model';
import { CaptchaService } from './captcha.service';

const ApiCaptchaSchema = createApiResponseSchema(zodCaptcha);

describe('AnnouncementGroupSubgroupManagementService', () => {
  let service: CaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(CaptchaService);
  });

  it('Testing Announcement Group methods with flow', async () => {
    const response = await service.getCaptcha();

    validateResponse<Captcha>(response, ApiCaptchaSchema);
  });
});
