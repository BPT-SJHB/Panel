import { TestBed } from '@angular/core/testing';
import { TransportCompaniesManagementService } from './transport-companies-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  UsernamePassword,
  zodUsernamePassword,
} from 'app/data/model/username-password.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import {
  TransportCompany,
  zodTransportCompany,
} from './model/transport-company-info.model';
import z from 'zod';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';

const transportCompanySampleData: TransportCompany = {
  TCId: 21651,
  TCTitle: 'پارسيان',
  TCOrganizationCode: '2100651',
  TCCityTitle: 'اصفهان - مباركه',
  TCTel: '',
  TCManagerMobileNumber: '',
  TCManagerNameFamily: '',
  EmailAddress: 'morteza1466@gmail.com',
  Active: true,
};

const ApiTransportCompanySchema = createApiResponseSchema(zodTransportCompany);

const ApiTransportCompaniesSchema = createApiResponseSchema(
  z.array(zodTransportCompany)
);

const ApiUsernamePasswordSchema = createApiResponseSchema(zodUsernamePassword);

describe('TransportCompaniesManagementService', () => {
  let service: TransportCompaniesManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(TransportCompaniesManagementService);
    devAuth = TestBed.inject(DevAuthService);
    devAuth.logout();
  });

    await devAuth.loginAsCompany();


  });

    await devAuth.loginAsAdmin();




  });
});
