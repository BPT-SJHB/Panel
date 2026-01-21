import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { LoadManagementService } from './load-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import z from 'zod';
import { LoadInfo, zodLoadInfo } from './model/load-info.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  LoadForTransportCompanies_Factories_Admins_Drivers,
  zodLoadForTransportCompanies_Factories_Admins_Drivers,
} from './model/load-info-for-transport-companies-factories-admins-drivers.model';
import { LoadStatus, zodLoadStatus } from './model/load-status.model';
import {
  TransportTariffParam,
  zodTransportTariffParam,
} from './model/transport-tariff-param.model';
import { mockTransportTariffParamInString } from './mock/transport-tariff-param.mock';
import { LoadAllocationPriority } from './model/load-allocation-priority';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import {
  LoadAllocationInfo,
  zodLoadAllocationInfo,
} from './model/load-allocation-info.model';
import {
  LoadAllocatedToNextTurn,
  zodLoadAllocateToNextTurn,
} from './model/load-allocated-to-next-turn.model';

//#region SampleData
const loadInfoSampleData: LoadInfo = {
  LoadId: 0,
  // AnnounceDate: '1404/05/19',
  // AnnounceTime: '14:41:59',
  TransportCompanyId: 21306,
  GoodId: 2520000,
  AnnouncementGroupId: 2,
  AnnouncementSubGroupId: 7,
  SourceCityId: 21451004,
  TargetCityId: 91390000,
  LoadingPlaceId: 1002,
  DischargingPlaceId: 1003,
  TotalNumber: 1,
  Tonaj: 22,
  Tariff: '295541600',
  Recipient: '',
  Address: '',
  Description: 'فرداصبح بارگيري',
  // LoadStatusId: 1,
  TPTParams:
    '135:0;139:0;143:0;147:0;151:0;157:0;16:0;163:0;169:0;175:0;181:0;187:0;193:0;199:0;205:0;211:0;217:0;223:0;229:0;235:0',
  // TPTParamsJoint: '0',
};

const tPTParamSampleData: TransportTariffParam = {
  TPTPDId: 135,
  TPTPTitle: 'دو باسکوله (ذوب آهنی)',
  Cost: 6000000,
  Checked: false,
};

const loadAllocationsPrioritySampleData: LoadAllocationPriority[] = [
  { LAId: 1, Priority: 1 },
  { LAId: 2, Priority: 2 },
  { LAId: 3, Priority: 3 },
  { LAId: 4, Priority: 4 },
];

const truck_DriverInfoSampleData = {
  TruckId: 5,
  DriverId: 5,
};
//#endregion

//#region ApiSchema
const ApiNewLoadIdSchema = createApiResponseSchema(
  z.object({ newLoadId: z.number() })
);

const ApiLoadForTransportCompanies_Factories_Admins_DriversSchema =
  createApiResponseSchema(
    z.array(zodLoadForTransportCompanies_Factories_Admins_Drivers)
  );

const ApiLoadStatusesSchema = createApiResponseSchema(z.array(zodLoadStatus));

const ApiLoadInfoSchema = createApiResponseSchema(zodLoadInfo);

const ApiTransportTariffParamsSchema = createApiResponseSchema(
  z.array(zodTransportTariffParam)
);

const ApiLoadAllocationInfoSchema = createApiResponseSchema(
  z.array(zodLoadAllocationInfo)
);

const ApiTravelTimeSchema = createApiResponseSchema(
  z.object({
    TravelTime: z.number(),
  })
);

const ApiLoadAllocateToNextTurnSchema = createApiResponseSchema(
  zodLoadAllocateToNextTurn
);
//#endregion

describe('LoadManagementService', () => {
  let service: LoadManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(LoadManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });
  it('Testing RegisterNewLoad method', async () => {
    await devAuth.loginAsCompany();

    const response = await service.RegisterNewLoad({
      TransportCompanyId: loadInfoSampleData.TransportCompanyId,
      GoodId: loadInfoSampleData.GoodId,
      AnnouncementGroupId: loadInfoSampleData.AnnouncementGroupId,
      AnnouncementSubGroupId: loadInfoSampleData.AnnouncementSubGroupId,
      SourceCityId: loadInfoSampleData.SourceCityId,
      TargetCityId: loadInfoSampleData.TargetCityId,
      LoadingPlaceId: loadInfoSampleData.LoadingPlaceId,
      DischargingPlaceId: loadInfoSampleData.DischargingPlaceId,
      TotalNumber: loadInfoSampleData.TotalNumber,
      Tonaj: loadInfoSampleData.Tonaj,
      Tariff: loadInfoSampleData.Tariff,
      Recipient: loadInfoSampleData.Recipient,
      Address: loadInfoSampleData.Address,
      Description: loadInfoSampleData.Description,
      LoadStatusId: loadInfoSampleData.LoadStatusId,
      TPTParams: loadInfoSampleData.TPTParams,
    });

    validateResponse<{ newLoadId: number }>(response, ApiNewLoadIdSchema);
  });

  it('Testing EditLoad method', async () => {
    await devAuth.loginAsCompany();

    const response = await service.EditLoad({
      LoadId: loadInfoSampleData.LoadId,
      GoodId: loadInfoSampleData.GoodId,
      SourceCityId: loadInfoSampleData.SourceCityId,
      TargetCityId: loadInfoSampleData.TargetCityId,
      LoadingPlaceId: loadInfoSampleData.LoadingPlaceId,
      DischargingPlaceId: loadInfoSampleData.DischargingPlaceId,
      TotalNumber: loadInfoSampleData.TotalNumber,
      Tonaj: loadInfoSampleData.Tonaj,
      Tariff: loadInfoSampleData.Tariff,
      Recipient: loadInfoSampleData.Recipient,
      Address: loadInfoSampleData.Address,
      Description: loadInfoSampleData.Description,
      TPTParams: loadInfoSampleData.TPTParams,
    });

    validateResponse<ShortResponse>(response, ApiShortResponseSchema);
  });

});
