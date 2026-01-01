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

  it('Testing TrafficCost methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterTrafficCost({
      TrafficCardTypeId: trafficCardTypeCostSampleData.TrafficCardTypeId,
      EntryBaseCost: trafficCardTypeCostSampleData.EntryBaseCost,
      NoCostStoppageDuration:
        trafficCardTypeCostSampleData.NoCostStoppageDuration,
      ExcessStoppageDuration:
        trafficCardTypeCostSampleData.ExcessStoppageDuration,
      ExcessStoppageCost: trafficCardTypeCostSampleData.ExcessStoppageCost,
      Active: true,
    });
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getRes = await service.GetTrafficCosts();
    validateResponse<TrafficCardTypeCost[]>(
      getRes,
      ApiTrafficCardTypeCostSchema
    );

    const regData = getRes.data[getRes.data.length - 1];

    if (
      !(
        trafficCardTypeCostSampleData.TrafficCardTypeId ===
          regData.TrafficCardTypeId &&
        trafficCardTypeCostSampleData.EntryBaseCost === regData.EntryBaseCost &&
        trafficCardTypeCostSampleData.NoCostStoppageDuration ===
          regData.NoCostStoppageDuration &&
        trafficCardTypeCostSampleData.ExcessStoppageDuration ===
          regData.ExcessStoppageDuration &&
        trafficCardTypeCostSampleData.ExcessStoppageCost ===
          regData.ExcessStoppageCost
      )
    ) {
      fail('TrafficCardTypeCosts are not equal');
    }
  });

  it('Testing TrafficRecords methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterTraffic(
      registerTrafficRecordSampleData.trafficGateId,
      registerTrafficRecordSampleData.trafficCardNumber,
      registerTrafficRecordSampleData.trafficPicture
    );
    validateResponse<TrafficInfo>(regRes, ApiTrafficInfoSchema);

    const getRes = await service.GetTrafficRecords(
      registerTrafficRecordSampleData.trafficCardId
    );
    validateResponse<TrafficReportInfo[]>(getRes, ApiTrafficReportInfoSchema);
  });
});
