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

const sequentialTurnSampleData: SequentialTurn = {
  SeqTurnId: 5,
  SeqTurnTitle: 'تریلی  برون شهری - آهن آلات ذوبی صادراتی',
  SeqTurnKeyWord: 'X',
  Active: true,
};

const sequentialTurnToLoaderTypesRelationSampleData: RelationOfSequentialTurnToLoaderType =
  {
    SeqTurnId: 3,
    SeqTurnTitle: 'تریلی شهری - آهن آلات انباری و ذوبی ، رول سبا',
    LoaderTypes: [
      {
        LoaderTypeId: 505,
        LoaderTypeTitle: 'کفی 18 چرخ',
      },
    ],
  };

const sequentialTurnToAnnouncementSubGroupRelationSampleData: RelationOfSequentialTurnToAnnouncementSubGroup =
  {
    SeqTurnId: 8,
    SeqTurnTitle: 'مرتضي شاهمرادي',
    AnnouncementSubGroups: [
      {
        AnnouncementSGId: 15,
        AnnouncementSGTitle: 'شهری آهن آلات انباری',
      },
    ],
  };

const ApiSequentialTurnsSchema = createApiResponseSchema(
  z.array(zodSequentialTurn)
);

const ApiRelationOfSequentialTurnToLoaderTypeSchema = createApiResponseSchema(
  z.array(zodRelationOfSequentialTurnToLoaderType)
);

const ApiRelationOfSequentialTurnToAnnouncementSubGroupSchema =
  createApiResponseSchema(
    z.array(zodRelationOfSequentialTurnToAnnouncementSubGroup)
  );

describe('SequentialTurnManagementService', () => {
  let service: SequentialTurnManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(SequentialTurnManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing SequentialTurn methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterNewSequentialTurn(
      sequentialTurnSampleData.SeqTurnId,
      sequentialTurnSampleData.SeqTurnTitle!,
      sequentialTurnSampleData.SeqTurnKeyWord!,
      sequentialTurnSampleData.Active!
    );
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getRes = await service.GetSequentialTurns(
      sequentialTurnSampleData.SeqTurnTitle!
    );
    validateResponse<SequentialTurn[]>(getRes, ApiSequentialTurnsSchema);

    const editRes = await service.EditSequentialTurn(
      sequentialTurnSampleData.SeqTurnId,
      sequentialTurnSampleData.SeqTurnTitle!,
      sequentialTurnSampleData.SeqTurnKeyWord!,
      sequentialTurnSampleData.Active!
    );
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const delRes = await service.DeleteSequentialTurn(
      sequentialTurnSampleData.SeqTurnId
    );
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });

  it('Testing SequentialTurn to LoaderType relations methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes =
      await service.RegisterNewRelationOfSequentialTurnToLoaderType(
        sequentialTurnToLoaderTypesRelationSampleData.SeqTurnId,
        sequentialTurnToLoaderTypesRelationSampleData.LoaderTypes[0]
          .LoaderTypeId
      );
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getIdWithLoaderTypeRes =
      await service.GetSequentialTurnWithLoaderType(
        sequentialTurnToLoaderTypesRelationSampleData.LoaderTypes[0]
          .LoaderTypeId
      );
    validateResponse<SequentialTurn[]>(
      getIdWithLoaderTypeRes,
      ApiSequentialTurnsSchema
    );

    const getIdWithSequentialTurnRes =
      await service.GetRelationOfSequentialTurnToLoaderTypes(
        sequentialTurnToLoaderTypesRelationSampleData.SeqTurnId
      );
    validateResponse<RelationOfSequentialTurnToLoaderType[]>(
      getIdWithSequentialTurnRes,
      ApiRelationOfSequentialTurnToLoaderTypeSchema
    );

    const delRelationRes =
      await service.DeleteRelationOfSequentialTurnToLoaderType(
        sequentialTurnToLoaderTypesRelationSampleData.SeqTurnId,
        sequentialTurnToLoaderTypesRelationSampleData.LoaderTypes[0]
          .LoaderTypeId
      );
    validateResponse<ShortResponse>(delRelationRes, ApiShortResponseSchema);
  });

  it('Testing SequentialTurn to AnnouncementSubGroup relations with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes =
      await service.RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup(
        sequentialTurnToAnnouncementSubGroupRelationSampleData.SeqTurnId,
        sequentialTurnToAnnouncementSubGroupRelationSampleData
          .AnnouncementSubGroups[0].AnnouncementSGId
      );
    validateResponse<ShortResponse>(regRes, ApiShortResponseSchema);

    const getRes =
      await service.GetRelationOfSequentialTurnToAnnouncementSubGroups(
        sequentialTurnToAnnouncementSubGroupRelationSampleData.SeqTurnId
      );
    validateResponse<RelationOfSequentialTurnToAnnouncementSubGroup[]>(
      getRes,
      ApiRelationOfSequentialTurnToAnnouncementSubGroupSchema
    );

    const delRes =
      await service.DeleteRelationOfSequentialTurnToAnnouncementSubGroup(
        sequentialTurnToAnnouncementSubGroupRelationSampleData.SeqTurnId,
        sequentialTurnToAnnouncementSubGroupRelationSampleData
          .AnnouncementSubGroups[0].AnnouncementSGId
      );
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });
});
