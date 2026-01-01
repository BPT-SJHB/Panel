import { TestBed } from '@angular/core/testing';
import { SequentialTurnManagementService } from './sequential-turn-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import {
  SequentialTurn,
  zodSequentialTurn,
} from './model/sequential-turn.model';
import z from 'zod';
import {
  RelationOfSequentialTurnToLoaderType,
  zodRelationOfSequentialTurnToLoaderType,
} from './model/relation-of-sequentialTurn-to-loaderType.model';
import {
  RelationOfSequentialTurnToAnnouncementSubGroup,
  zodRelationOfSequentialTurnToAnnouncementSubGroup,
} from './model/relation-of-sequentialTurn-to-announcementSubGroup.model';

describe('SequentialTurnManagementService', () => {
  let service: SequentialTurnManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequentialTurnManagementService, DevAuthService],
    });

    service = TestBed.inject(SequentialTurnManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('SequentialTurn workflow: create if not exists, edit and delete', async () => {
    await devAuth.loginAsAdmin();

    const title = `تست_${Date.now()}`;
    const keyword = 'D';
    const status = true;

    // check if exists
    const existing = await service.GetSequentialTurns('تست_');
    let seqId: number;

    if (existing.data && existing.data.length > 0) {
      seqId = existing.data[0].SeqTurnId;
    } else {
      // register it
      const createRes = await service.RegisterNewSequentialTurn(
        0,
        title,
        keyword,
        status
      );

      expect(createRes.data)
        .withContext('RegisterNewSequentialTurn')
        .toEqual(jasmine.any(Object));
      expect(createRes.data?.Message)
        .withContext('RegisterNewSequentialTurn')
        .toEqual(jasmine.any(String));

      // get new id
      const newTurns = await service.GetSequentialTurns(title);

      expect(newTurns.data)
        .withContext('GetSequentialTurns')
        .toEqual(jasmine.any(Array));
      expect(newTurns.data!.length).toBeGreaterThan(0);
      seqId = newTurns.data![0].SeqTurnId;
      expect(seqId).toBeDefined();
    }

    // edit
    const editStatus = false;
    const editRes = await service.EditSequentialTurn(
      seqId,
      title,
      keyword,
      editStatus
    );
    expect(editRes.data).toEqual(jasmine.any(Object));

    // delete
    const deleteRes = await service.DeleteSequentialTurn(seqId);
    expect(deleteRes.data)
      .withContext('DeleteSequentialTurn')
      .toEqual(jasmine.any(Object));
  });

  it('GetRelationOfSequentialTurnToLoaderTypes should return relations', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;

    const res =
      await service.GetRelationOfSequentialTurnToLoaderTypes(sequentialTurnId);

    expect(res.data).toEqual(jasmine.any(Array));
  });

  it('SequentialTurn-LoaderType relation workflow: create if not exists, get, delete', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 8;
    const loaderTypeId = 101;

    // check exists
    const existing =
      await service.GetRelationOfSequentialTurnToLoaderTypes(sequentialTurnId);

    const exists =
      existing.data &&
      existing.data.length > 0 &&
      existing.data[0].LoaderTypes.some((l) => l.LoaderTypeId === loaderTypeId);

    if (!exists) {
      // create new one
      const createRes =
        await service.RegisterNewRelationOfSequentialTurnToLoaderType(
          sequentialTurnId,
          loaderTypeId
        );
      expect(createRes.data)
        .withContext('RegisterNewRelationOfSequentialTurnToLoaderType')
        .toEqual(jasmine.any(Object));
    }

    // get id of that
    const getRes =
      await service.GetRelationOfSequentialTurnToLoaderTypes(sequentialTurnId);
    expect(getRes.data)
      .withContext('GetRelationOfSequentialTurnToLoaderTypes')
      .toEqual(jasmine.any(Array));

    const checkItemExists =
      getRes.data &&
      getRes.data.length > 0 &&
      getRes.data[0].LoaderTypes.some((l) => l.LoaderTypeId === loaderTypeId);

    expect(checkItemExists)
      .withContext('Check if loader type relation exists after registration')
      .toBeTrue();

    // delete
    const deleteRes = await service.DeleteRelationOfSequentialTurnToLoaderType(
      sequentialTurnId,
      loaderTypeId
    );
    expect(deleteRes.data)
      .withContext('DeleteRelationOfSequentialTurnToLoaderType')
      .toEqual(jasmine.any(Object));
  });

  it('SequentialTurn-AnnouncementSubGroup relation workflow: create if not exists, get, delete', async () => {
    await devAuth.loginAsAdmin();

    const sequentialTurnId = 1;
    const announcementSubGroupId = 3;

    // check exists
    const existing =
      await service.GetRelationOfSequentialTurnToAnnouncementSubGroups(
        sequentialTurnId
      );

    const exists =
      existing.data &&
      existing.data.length > 0 &&
      existing.data[0].AnnouncementSubGroups.some(
        (a) => a.AnnouncementSGId === announcementSubGroupId
      );

    if (!exists) {
      // ثبت رابطه اگر وجود نداشت
      const createRes =
        await service.RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup(
          sequentialTurnId,
          announcementSubGroupId
        );
      expect(createRes.data)
        .withContext(
          'RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup'
        )
        .toEqual(jasmine.any(Object));
    }

    const getRes =
      await service.GetRelationOfSequentialTurnToAnnouncementSubGroups(
        sequentialTurnId
      );

    expect(getRes.data)
      .withContext('GetRelationOfSequentialTurnToAnnouncementSubGroups')
      .toEqual(jasmine.any(Array));

    const checkItemExits =
      getRes.data &&
      getRes.data.length > 0 &&
      getRes.data[0].AnnouncementSubGroups.some(
        (a) => a.AnnouncementSGId === announcementSubGroupId
      );

    expect(checkItemExits).toBeTrue();

    // حذف رابطه
    const deleteRes =
      await service.DeleteRelationOfSequentialTurnToAnnouncementSubGroup(
        sequentialTurnId,
        announcementSubGroupId
      );
    expect(deleteRes.data)
      .withContext('DeleteRelationOfSequentialTurnToAnnouncementSubGroup')
      .toEqual(jasmine.any(Object));
  });
});
