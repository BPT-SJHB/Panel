import { TestBed } from '@angular/core/testing';
import { TransportCompaniesManagementService } from './transport-companies-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import { UsernamePassword } from 'app/data/model/username-password.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

describe('TransportCompaniesManagementService', () => {
  let service: TransportCompaniesManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransportCompaniesManagementService,
        UserAuthService,
        APICommunicationManagementService,
      ],
    });

    service = TestBed.inject(TransportCompaniesManagementService);
    devAuth = TestBed.inject(DevAuthService);
    devAuth.logout();
  });

  it('GetTransportCompaniesInfo: should return array of transport companies', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetTransportCompaniesInfo('ا');

    expect(res.data)
      .withContext(
        'GetTransportCompaniesInfo: should return an array of transport companies'
      )
      .toEqual(jasmine.any(Array));
  });

  it('GetTransportCompanyInfo: should return single transport company', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetTransportCompanyInfo(1);

    expect(res.data)
      .withContext(
        'GetTransportCompanyInfo: should return transport company object'
      )
      .toBeDefined();
  });

  it('GetTransportCompanyBySoftwareUser: should return transport company', async () => {
    await devAuth.loginAsCompany();
    const res = await service.GetTransportCompanyBySoftwareUser();

    expect(res.data)
      .withContext(
        'GetTransportCompanyBySoftwareUser: should return transport company object'
      )
      .toBeDefined();
  });

  it('EditTransportCompany: should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.EditTransportCompany({
      TCId: 1,
      TCTitle: 'میرایش _تست',
    });

    expect(res.data)
      .withContext('EditTransportCompany: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('EditTransportCompany: should return success message')
      .toBeDefined();
  });

  it('ActiveTransportCompanySmsService: should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.ActiveTransportCompanySmsService(1);

    expect(res.data)
      .withContext(
        'ActiveTransportCompanySmsService: should return response data'
      )
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext(
        'ActiveTransportCompanySmsService: should return success message'
      )
      .toBeDefined();
  });

  it('ResetTransportCompanyPassword: should return username and password', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.ResetTransportCompanyPassword(1);

    expect(res.data)
      .withContext('ResetTransportCompanyPassword: should return credentials')
      .toBeDefined();

    expect((res.data as UsernamePassword)?.Username)
      .withContext('ResetTransportCompanyPassword: should return username')
      .toBeDefined();

    expect((res.data as UsernamePassword)?.Password)
      .withContext('ResetTransportCompanyPassword: should return password')
      .toBeDefined();
  });

  it('ChangeTransportCompanyStatus: should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.ChangeTransportCompanyStatus(1, true);

    expect(res.data)
      .withContext('ChangeTransportCompanyStatus: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext(
        'ChangeTransportCompanyStatus: should return success message'
      )
      .toBeDefined();
  });
});
