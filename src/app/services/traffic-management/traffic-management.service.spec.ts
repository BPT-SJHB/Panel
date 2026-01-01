import { TestBed } from '@angular/core/testing';
import { TrafficManagementService } from './traffic-management.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  TrafficCardType,
  zodTrafficCardType,
} from './model/traffic-card-type.model';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { z } from 'zod';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import {
  TrafficCardTempType,
  zodTrafficCardTempType,
} from './model/traffic-card-temp-type.model';
import {
  TrafficCardTypeCost,
  zodTrafficCardTypeCost,
} from './model/traffic-card-type-cost.model';
import { TrafficInfo, zodTrafficInfo } from './model/traffic-info.model';
import {
  TrafficReportInfo,
  zodTrafficReportInfo,
} from './model/traffic-report-info.model';

const trafficCardTypeSampleData: TrafficCardType = {
  TrafficCardTypeId: 2,
  TrafficCardTypeTitle:
    'تریلی                                                                                               ',
  Active: true,
};

const trafficCardInfoSampleData = {
  trafficCardNumber: '0000090BaK',
  trafficCardTypeId: 1,
  trafficCardTempTypeId: 1,
};

const trafficCardTypeCostSampleData: TrafficCardTypeCost = {
  TrafficCardTypeId: 1,
  EntryBaseCost: 100000,
  NoCostStoppageDuration: 24,
  ExcessStoppageDuration: 24,
  ExcessStoppageCost: 50000,
};

const registerTrafficRecordSampleData = {
  trafficGateId: 1,
  trafficCardNumber: '0000090BaK',
  trafficPicture: '',
  trafficCardId: 1,
};

const ApiTrafficCardTypesSchema = createApiResponseSchema(
  z.array(zodTrafficCardType)
);

const ApiTrafficCardTempTypesSchema = createApiResponseSchema(
  z.array(zodTrafficCardTempType)
);

const ApiTrafficCardTypeCostSchema = createApiResponseSchema(
  z.array(zodTrafficCardTypeCost)
);

const ApiTrafficInfoSchema = createApiResponseSchema(zodTrafficInfo);

const ApiTrafficReportInfoSchema = createApiResponseSchema(
  z.array(zodTrafficReportInfo)
);

describe('TrafficManagementService', () => {
  let service: TrafficManagementService;
  let devAuth: DevAuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TrafficManagementService,
        APICommunicationManagementService,
        UserAuthService,
      ],
    });

    service = TestBed.inject(TrafficManagementService);
    devAuth = TestBed.inject(DevAuthService);
    await devAuth.logout();
  });

  it('Testing register & edit TrafficCardType methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterTrafficCardType(
      trafficCardTypeSampleData.TrafficCardTypeTitle
    );
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const editRes = await service.EditTrafficCardType(
      trafficCardTypeSampleData
    );
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);
  });

  it('Testing GetTrafficCardTypes method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetTrafficCardTypes();

    validateResponse<TrafficCardType[]>(response, ApiTrafficCardTypesSchema);
  });

  it('Testing GetTrafficCardTempTypes method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetTrafficCardTempTypes();

    validateResponse<TrafficCardTempType[]>(
      response,
      ApiTrafficCardTempTypesSchema
    );
  });

  it('Testing RegisterTrafficCard method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.RegisterTrafficCard(
      trafficCardInfoSampleData.trafficCardNumber,
      trafficCardInfoSampleData.trafficCardTypeId,
      trafficCardInfoSampleData.trafficCardTempTypeId
    );

    validateResponse<ShortResponse>(response, ApiShortResponseSchema);
  });

  it('RegisterTrafficCost: should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.RegisterTrafficCost({
      TrafficCardTypeId: 1,
      EntryBaseCost: 300000,
      ExcessStoppageCost: 300000,
      ExcessStoppageDuration: 24,
      NoCostStoppageDuration: 30,
      Active: true,
    });

    expect(res.data)
      .withContext('RegisterTrafficCost: should return response data')
      .toBeDefined();
  });

  // TODO: Fix API: the server returns no context in the response
  xit('GetTrafficRecords: should return array', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetTrafficRecords(1);

    expect(res.data)
      .withContext('GetTrafficRecords: should return an array')
      .toEqual(jasmine.any(Array));
  });

  // TODO: Fix API: the server returns the error message 'کیف پول یافت نشد'
  xit('RegisterTraffic: should return TrafficInfo', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.RegisterTraffic(1, '123', 'image');

    console.log(res.error);

    expect(res.data)
      .withContext('RegisterTraffic: should return traffic info')
      .toBeDefined();
  });
});

function generateCardNumber(): string {
  const chars: string[] = [];
  const randomChar = (min: number, max: number) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);

  // Add letters (upper/lower) and digits
  for (let i = 0; i < 2; i++) chars.push(randomChar(65, 90)); // A–Z
  for (let i = 0; i < 2; i++) chars.push(randomChar(97, 122)); // a–z
  for (let i = 0; i < 2; i++) chars.push(randomChar(48, 57)); // 0–9

  // Shuffle characters and join
  return chars.sort(() => Math.random() - 0.5).join('');
}
