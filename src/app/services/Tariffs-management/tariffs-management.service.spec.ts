import { TestBed } from '@angular/core/testing';
import { Tariff, zodTariff } from 'app/data/model/tariff.model';
import { TariffsManagementService } from './tariffs-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { ShortResponse } from 'app/data/model/short-response.model';
import z from 'zod';

const tariffSampleData: Tariff = {
  LoaderTypeId: 505,
  SourceCityId: 21310000,
  TargetCityId: 11320000,
  GoodId: 2130000,
  Tariff: 12600000,
  BaseTonnag: 24,
  CalculationReference: 'Test',
};

const ApiTariffSchema = createApiResponseSchema(z.array(zodTariff));

describe('TariffsManagementService', () => {
  let service: TariffsManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(TariffsManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Flow: Register -> Get -> Edit -> Delete\nRegister -> AddPercentage -> ChangeStat', async () => {
    await devAuth.loginAsAdmin();

    const resReg = await service.RegisterTariff(tariffSampleData);
    validateResponse<ShortResponse>(resReg, ApiShortResponseSchema);

    const resGet = await service.GetTariffs(
      tariffSampleData.LoaderTypeId,
      tariffSampleData.SourceCityId,
      tariffSampleData.TargetCityId,
      tariffSampleData.GoodId
    );
    validateResponse<Tariff[]>(resGet, ApiTariffSchema);

    const resEdit = await service.EditTariffs({
      LoaderTypeId: tariffSampleData.LoaderTypeId,
      TargetCityId: tariffSampleData.TargetCityId,
      SourceCityId: tariffSampleData.SourceCityId,
      GoodId: tariffSampleData.GoodId,
      Tariff: tariffSampleData.Tariff,
      BaseTonnag: tariffSampleData.BaseTonnag,
    });
    validateResponse<ShortResponse>(resEdit, ApiShortResponseSchema);

    const resDel = await service.DeleteTariff({
      LoaderTypeId: tariffSampleData.LoaderTypeId,
      SourceCityId: tariffSampleData.SourceCityId,
      TargetCityId: tariffSampleData.TargetCityId,
      GoodId: tariffSampleData.GoodId,
    });
    validateResponse<ShortResponse>(resDel, ApiShortResponseSchema);

    const resRegSec = await service.RegisterTariff(tariffSampleData);
    validateResponse<ShortResponse>(resRegSec, ApiShortResponseSchema);

    const resAddPer = await service.AddPercentageToTariffs(
      [tariffSampleData],
      20
    );
    validateResponse<ShortResponse>(resAddPer, ApiShortResponseSchema);

    const resChangeStat = await service.ChangeTariffsStatus([tariffSampleData]);
    validateResponse<ShortResponse>(resChangeStat, ApiShortResponseSchema);
  });
});
