import { TestBed } from '@angular/core/testing';
import { TPTParamsManagementService } from './tptparams-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { ShortResponse } from 'app/data/model/short-response.model';

describe('TPTParamsManagementService (integration)', () => {
  let service: TPTParamsManagementService;
  let devAuth: DevAuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TPTParamsManagementService, UserAuthService, DevAuthService],
    });

    service = TestBed.inject(TPTParamsManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
    await devAuth.loginAsAdmin();
  });

  it('should perform full CRUD lifecycle for a TPT param', async () => {
    await devAuth.loginAsAdmin();

    const title = `تست_${Date.now()}`;

    // ===== CREATE =====
    const createRes = await service.RegisterTPTParam({
      TPTPTitle: title,
    });

    expect(createRes.data)
      .withContext('RegisterTPTParam: should return response data')
      .toBeDefined();

    expect((createRes.data as ShortResponse)?.Message)
      .withContext('RegisterTPTParam: should return success message')
      .toBeDefined();

    // ===== READ =====
    const allRes = await service.GetAllTPTParams();

    expect(allRes.data)
      .withContext('GetAllTPTParams: should return an array')
      .toEqual(jasmine.any(Array));

    const createdItem =
      allRes.data?.find((item) => item.TPTPTitle === title) ?? allRes?.data![0];

    expect(createdItem)
      .withContext('GetAllTPTParams: should include created item')
      .toBeDefined();

    expect(createdItem!.TPTPId)
      .withContext('GetAllTPTParams: created item should have numeric id')
      .toEqual(jasmine.any(Number));

    const createdId = createdItem!.TPTPId;

    // ===== UPDATE =====
    const editRes = await service.EditTPTParam({
      TPTPId: createdId,
      TPTPTitle: `${title}_ویرایش`,
    });

    expect(editRes.data)
      .withContext('EditTPTParam: should return response data')
      .toBeDefined();

    expect((editRes.data as ShortResponse)?.Message)
      .withContext('EditTPTParam: should return success message')
      .toBeDefined();

    // ===== DELETE =====
    const deleteRes = await service.DeleteTPTParam({
      TPTPId: createdId,
    });

    expect(deleteRes.data)
      .withContext('DeleteTPTParam: should return response data')
      .toBeDefined();

    expect((deleteRes.data as ShortResponse)?.Message)
      .withContext('DeleteTPTParam: should return success message')
      .toBeDefined();
  });

  it('should fetch all relations to announcement groups and subgroups', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetAllRelationsToAnnouncementGroupAndSubGroup();

    expect(res.data)
      .withContext(
        'GetAllRelationsToAnnouncementGroupAndSubGroup: should return an array'
      )
      .toEqual(jasmine.any(Array));

    res.data?.forEach((item) => {
      expect(item)
        .withContext(
          'GetAllRelationsToAnnouncementGroupAndSubGroup: each item should be an object'
        )
        .toEqual(jasmine.any(Object));
    });
  });
});
