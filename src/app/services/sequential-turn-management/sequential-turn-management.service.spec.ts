import { TestBed } from '@angular/core/testing';
import { SequentialTurnManagementService } from './sequential-turn-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

describe('SequentialTurnManagementService', () => {
  let service: SequentialTurnManagementService;
  let devAuth: DevAuthService;
  let seqId: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequentialTurnManagementService, DevAuthService],
    });

    service = TestBed.inject(SequentialTurnManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('RegisterNewSequentialTurn: should register a new sequential turn', async () => {
    await devAuth.loginAsAdmin();

    const title = `تست_${Date.now()}`;
    const keyword = 'turn-key';
    const status = true;

    const res = await service.RegisterNewSequentialTurn(
      0,
      title,
      keyword,
      status
    );

    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Message).toEqual(jasmine.any(String));
  });

  it('GetSequentialTurns: should get the sequential turn and retrieve its ID', async () => {
    await devAuth.loginAsAdmin();

    const titleSearch = 'تست_';
    const res = await service.GetSequentialTurns(titleSearch);

    expect(res.data).toEqual(jasmine.any(Array));
    expect(res.data!.length).toBeGreaterThan(0);

    // Use the first matching turn
    seqId = res.data![0].SeqTurnId;
    expect(seqId).toBeDefined();
  });

  it('EditSequentialTurn: should edit the sequential turn', async () => {
    await devAuth.loginAsAdmin();

    const title = 'edited title';
    const keyword = 'edited-key';
    const status = false;

    const res = await service.EditSequentialTurn(seqId, title, keyword, status);
    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('DeleteSequentialTurn: should delete the sequential turn', async () => {
    await devAuth.loginAsAdmin();

    const res = await service.DeleteSequentialTurn(seqId);
    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('GetRelationOfSequentialTurnToLoaderTypes should return relations', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;

    const res =
      await service.GetRelationOfSequentialTurnToLoaderTypes(sequentialTurnId);

    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('RegisterNewRelationOfSequentialTurnToLoaderType should succeed', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;
    const loaderTypeId = 2;

    const res = await service.RegisterNewRelationOfSequentialTurnToLoaderType(
      sequentialTurnId,
      loaderTypeId
    );

    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('DeleteRelationOfSequentialTurnToLoaderType should succeed', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;
    const loaderTypeId = 2;

    const res = await service.DeleteRelationOfSequentialTurnToLoaderType(
      sequentialTurnId,
      loaderTypeId
    );

    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('GetSequentialTurnWithLoaderType should return sequential turns', async () => {
    await devAuth.loginAsAdmin();

    // TODO: loaderTypeId 2 not return anything it is return empty can find any value for loaderTypeId in server
    const loaderTypeId = 2;

    const res = await service.GetSequentialTurnWithLoaderType(loaderTypeId);

    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('GetRelationOfSequentialTurnToAnnouncementSubGroups should return relations', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;

    const res =
      await service.GetRelationOfSequentialTurnToAnnouncementSubGroups(
        sequentialTurnId
      );

    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup should succeed', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;
    const announcementSubGroupId = 3;

    const res =
      await service.RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup(
        sequentialTurnId,
        announcementSubGroupId
      );

    expect(res.data).toEqual(jasmine.any(Object));
  });

  it('DeleteRelationOfSequentialTurnToAnnouncementSubGroup should succeed', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;
    const announcementSubGroupId = 3;

    const res =
      await service.DeleteRelationOfSequentialTurnToAnnouncementSubGroup(
        sequentialTurnId,
        announcementSubGroupId
      );

    expect(res.data).toEqual(jasmine.any(Object));
  });
});
