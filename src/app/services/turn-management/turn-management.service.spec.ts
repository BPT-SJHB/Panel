import { TestBed } from '@angular/core/testing';
import { TurnManagementService } from './turn-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { TurnCost } from './model/turn-cost.model';
import { mockTurnCosts } from './mock/turn-cost.mock';

describe('TurnManagementService', () => {
  let service: TurnManagementService;
  let auth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnManagementService, UserAuthService],
    });

    service = TestBed.inject(TurnManagementService);
    auth = TestBed.inject(DevAuthService);

    auth.logout();
  });

  // TODO: add truck Id that exits
  xit('Turn workflow: get latest turns, cancel and resuscitate if possible', async () => {
    await auth.loginAsAdmin();
    const truckId = 1;
    const latestRes = await service.GetLatestTurns(truckId);

    expect(latestRes.data)
      .withContext('GetLatestTurns')
      .toEqual(jasmine.any(Array));

    if (!latestRes.data || latestRes.data.length === 0) {
      return;
    }

    const turnId = latestRes.data[0].TurnId;
    expect(turnId).toBeDefined();

    // cancel turn
    const cancelRes = await service.CancelTurn(turnId);
    expect(cancelRes.data)
      .withContext('CancelTurn')
      .toEqual(jasmine.any(Object));

    // resuscitate turn
    const resuscitateRes = await service.ResuscitateTurn(turnId);
    expect(resuscitateRes.data)
      .withContext('ResuscitateTurn')
      .toEqual(jasmine.any(Object));
  });

  it('GetLatestTurnsForSoftwareUser should return turns', async () => {
    await auth.loginAsDriver();

    const res = await service.GetLatestTurnsForSoftwareUser();

    expect(res.data)
      .withContext('GetLatestTurnsForSoftwareUser')
      .toEqual(jasmine.any(Array));
  });

  // TODO: add truck Id that exits
  xit('GetTurnAccounting should return accounting items if turn exists', async () => {
    await auth.loginAsAdmin();
    const turnId = 1;
    const res = await service.GetTurnAccounting(turnId);

    expect(res.data)
      .withContext('GetTurnAccounting')
      .toEqual(jasmine.any(Array));
  });

  it('RealTimeTurnRegister workflow', async () => {
    await auth.loginAsDriver();

    const truckId = 1;
    const sequentialTurnId = 1;

    const res = await service.RealTimeTurnRegister(truckId, sequentialTurnId);

    expect(res.data)
      .withContext('RealTimeTurnRegister')
      .toEqual(jasmine.any(Object));
  });

  // TODO: need cancel turn Id that exits
  xit('EmergencyTurnRegister workflow', async () => {
    await auth.loginAsAdmin();

    const truckId = 1;
    const sequentialTurnId = 1;
    const description = `emergency_test_${Date.now()}`;

    const res = await service.EmergencyTurnRegister(
      truckId,
      sequentialTurnId,
      description
    );

    expect(res.data)
      .withContext('EmergencyTurnRegister')
      .toEqual(jasmine.any(Object));
  });

  // TODO: fix ReserveTurn turn Id that exits
  xit('ReserveTurn workflow: resuscitate and register', async () => {
    await auth.loginAsDriver();

    const truckId = 1;
    const sequentialTurnId = 1;
    const date = '1403/01/01';
    const time = '10:30';

    const resuscitateRes = await service.ResuscitateReserveTurn(
      truckId,
      sequentialTurnId,
      date,
      time
    );

    expect(resuscitateRes.data)
      .withContext('ResuscitateReserveTurn')
      .toEqual(jasmine.any(Object));

    const registerRes = await service.ReserveTurnRegister();

    expect(registerRes.data)
      .withContext('ReserveTurnRegister')
      .toEqual(jasmine.any(Object));
  });

  it('TurnCost workflow: get all, register and delete', async () => {
    await auth.loginAsDriver();

    const getAllRes = await service.GetAllTurnCosts();

    expect(getAllRes.data)
      .withContext('GetAllTurnCosts')
      .toEqual(jasmine.any(Array));

    const newCost: TurnCost =
      getAllRes.data?.length && getAllRes.data.length > 0
        ? getAllRes.data![0]
        : mockTurnCosts[0];

    const seqId = getAllRes.data?.find(
      (d) => d.SeqTurnId === newCost.SeqTurnId
    );

    if (seqId) {
      const deleteRes = await service.DeleteTurnCost({
        SeqTurnId: newCost.SeqTurnId,
      });

      expect(deleteRes.data)
        .withContext('DeleteTurnCost')
        .toEqual(jasmine.any(Object));
    }
    const registerRes = await service.RegisterTurnCost(newCost);
    expect(registerRes.data)
      .withContext('RegisterTurnCost')
      .toEqual(jasmine.any(Object));
  });

  it('GetAllTurnStatus should return status list', async () => {
    await auth.loginAsAdmin();

    const res = await service.GetAllTurnStatus();

    expect(res.data)
      .withContext('GetAllTurnStatus')
      .toEqual(jasmine.any(Array));
  });
});
