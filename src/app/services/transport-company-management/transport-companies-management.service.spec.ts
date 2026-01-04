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

  it('Testing GetTransportCompanyBySoftwareUser method', async () => {
    await devAuth.loginAsCompany();

    const response = await service.GetTransportCompanyBySoftwareUser();

    validateResponse<TransportCompany>(response, ApiTransportCompanySchema);
  });

  it('Testing TransportCompany methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const getRes = await service.GetTransportCompanyInfo(
      transportCompanySampleData.TCId
    );
    validateResponse<TransportCompany>(getRes, ApiTransportCompanySchema);

    const getAllRes = await service.GetTransportCompaniesInfo(
      transportCompanySampleData.TCTitle!
    );
    validateResponse<TransportCompany[]>(
      getAllRes,
      ApiTransportCompaniesSchema
    );

    const activeSMSRes = await service.ActiveTransportCompanySmsService(
      transportCompanySampleData.TCId
    );
    validateResponse<ShortResponse>(activeSMSRes, ApiShortResponseSchema);

    const editRes = await service.EditTransportCompany(
      transportCompanySampleData
    );
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const resetPassRes = await service.ResetTransportCompanyPassword(
      transportCompanySampleData.TCId
    );
    validateResponse<UsernamePassword>(resetPassRes, ApiUsernamePasswordSchema);

    const changeStatRes = await service.ChangeTransportCompanyStatus(
      transportCompanySampleData.TCId,
      transportCompanySampleData.Active!
    );
    validateResponse<ShortResponse>(changeStatRes, ApiShortResponseSchema);
  });
});
