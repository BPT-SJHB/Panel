import { TestBed } from '@angular/core/testing';
import { TurnManagementService } from './turn-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { TurnCost, zodTurnCost } from './model/turn-cost.model';
import { mockTurnCosts } from './mock/turn-cost.mock';
import z from 'zod';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { TurnStatus, zodTurnStatus } from './model/turn-status.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { Turn, zodTurn } from './model/turn.model';
import {
  TurnAccounting,
  zodTurnAccounting,
} from './model/turn-accounting.model';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import {
  TurnForSoftwareUser,
  zodTurnForSoftwareUser,
} from './model/turn-for-software-user.model';

const turnCostSampleData: TurnCost = {
  SeqTurnId: 1,
  SeqTurnTitle: 'اطاقدار شوينده',
  SelfGoverCost: 350000,
  TruckersAssociationCost: 50000,
  TruckDriversAssociationCost: 50000,
};

const turnAccountingSampleData: TurnAccounting = {
  TurnId: 7,
  SequentialTurnId: 'Z1404/000003:7',
  DateShamsi: '1404/04/09',
  Time: '22:14:47',
  AccountingTypeTitle: 'صدور نوبت',
  UserName: 'مرتضي شاهمرادي',
};

const truckInfoSampleData: TruckInfo = {
  TruckId: 5,
  LoaderTypeId: 605,
  Pelak: '673ع32',
  Serial: '52',
  SmartCardNo: '2305365',
};

const ApiTurnStatusesSchema = createApiResponseSchema(z.array(zodTurnStatus));

const ApiTurnCostsSchema = createApiResponseSchema(z.array(zodTurnCost));

const ApiTurnSchema = createApiResponseSchema(z.array(zodTurn));

const ApiTurnAccountingSchema = createApiResponseSchema(
  z.array(zodTurnAccounting)
);

const ApiTurnForSoftwareUserSchema = createApiResponseSchema(
  z.array(zodTurnForSoftwareUser)
);

describe('TurnManagementService', () => {
  let service: TurnManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnManagementService, UserAuthService],
    });

    service = TestBed.inject(TurnManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing TurnStatus method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetAllTurnStatus();

    validateResponse<TurnStatus[]>(response, ApiTurnStatusesSchema);
  });

  it('Testing TurnCost methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterTurnCost(turnCostSampleData);
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getAllRes = await service.GetAllTurnCosts();
    validateResponse<TurnCost[]>(getAllRes, ApiTurnCostsSchema);

    const delRes = await service.DeleteTurnCost({
      SeqTurnId: turnCostSampleData.SeqTurnId,
    });
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });

  it('Testing Turn methods as admin with flow', async () => {
    await devAuth.loginAsAdmin();

    const regEmergencyTurnRes = await service.EmergencyTurnRegister(
      truckInfoSampleData.TruckId,
      turnCostSampleData.SeqTurnId,
      'تست'
    );
    validateResponse<ShortResponse>(
      regEmergencyTurnRes,
      ApiShortResponseSchema
    );

    const getById = await service.GetLatestTurns(truckInfoSampleData.TruckId);
    validateResponse<Turn[]>(getById, ApiTurnSchema);

    const regTurnId = getById.data[0].TurnId;

    const cancelTurnRes = await service.CancelTurn(regTurnId);
    validateResponse<ShortResponse>(cancelTurnRes, ApiShortResponseSchema);

    const ResuscitateTurnRes = await service.ResuscitateTurn(regTurnId);
    validateResponse<ShortResponse>(ResuscitateTurnRes, ApiShortResponseSchema);

    const getAllTurnAccounting = await service.GetTurnAccounting(regTurnId);
    validateResponse<TurnAccounting[]>(
      getAllTurnAccounting,
      ApiTurnAccountingSchema
    );

    const reCancelTurnRes = await service.CancelTurn(regTurnId);
    validateResponse<ShortResponse>(reCancelTurnRes, ApiShortResponseSchema);
  });

  it('Testing Turn methods as driver with flow', async () => {
    await devAuth.loginAsDriver();

    const realTimeTurnRegRes = await service.RealTimeTurnRegister(
      truckInfoSampleData.TruckId,
      turnCostSampleData.SeqTurnId
    );
    validateResponse<ShortResponse>(realTimeTurnRegRes, ApiShortResponseSchema);

    const getTurnIdRes = await service.GetLatestTurnsForSoftwareUser();
    validateResponse<TurnForSoftwareUser[]>(
      getTurnIdRes,
      ApiTurnForSoftwareUserSchema
    );

    const regTurnId = getTurnIdRes.data[0].TurnId;

    const cancelTurnRes = await service.CancelTurn(regTurnId);
    validateResponse<ShortResponse>(cancelTurnRes, ApiShortResponseSchema);
  });



  });
});
