import { TestBed } from '@angular/core/testing';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { ConfigManagementService } from './config-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import z from 'zod';
import {
  LoadAnnouncementConfig,
  zodLoadAnnouncementConfig,
} from './model/load-announcement-config.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiShortResponseSchema } from 'app/data/model/short-response.model.spec';
import { GeneralConfig, zodGeneralConfig } from './model/general-config.model';
import { DeviceInfo, zodDeviceInfo } from './model/device-info.model';
import { DeviceConfig, zodDeviceConfig } from './model/device-config.model';
import {
  LoadViewConditionInfo,
  zodLoadViewConditionInfo,
} from './model/load-view-condition-info.model';
import {
  LoadAllocationConditionInfo,
  zodLoadAllocationConditionInfo,
} from './model/load-allocation-condition-info.model';

const loadAnnouncementConfigSampleData: LoadAnnouncementConfig = {
  COLAId: 1,
  COLAName: 'LoadAnnounceTimeCycle',
  COLATitle: 'زمانبندی اعلام بار',
  AnnouncementId: 3,
  AnnouncementTitle: 'برسام',
  AnnouncementSGId: 14,
  AnnouncementSGTitle: 'برون شهری آهن آلات انباری',
  COLAIndex: 0,
  COLAIndexTitle: 'ساعات',
  Description: 'اعلام بار انباری برون شهری',
  COLAValue: '11:00:00-10:00:00-12:00:00-14:00:00',
};

const DeviceInfoSampleData: DeviceInfo = {
  DeviceId: 6,
  DeviceTitle: 'ورودي تريلي',
  DeviceLocation: 'ورودي تريلي',
  Active: true,
};

const DeviceConfigSampleData: DeviceConfig = {
  CODId: 1,
  CODName:
    'LPRCamera                                                                                           ',
  CODTitle: 'دوربين پلاک خوان',
  CODIndex: 1,
  CODIndexTitle: 'فعال/غيرفعال',
  DeviceId: 1,
  DeviceTitle: 'ورودي تريلي',
  Description: 'فعال يا غيرفعال سازي دوربين پلاک خوان گيت تردد',
  CODValue: 'HttpS://',
};

const LoadViewConditionSampleData: LoadViewConditionInfo = {
  LoadViewConditionId: 10011,
  AnnouncementId: 2,
  AnnouncementTitle:
    'تريلي برون شهري ذوب و سبا                                                                           ',
  AnnouncementSGId: 7,
  AnnouncementSGTitle:
    'برون شهری آهن آلات ذوبی                                                                             ',
  SequentialTurnId: 5,
  SequentialTurnTitle:
    'تريلي  برون شهري - آهن آلات ذوبي صادراتي                                                            ',
  TruckNativenessTypeId: 2,
  TruckNativenessTypeTitle: 'غیر بومی',
  LoadStatusId: 5,
  LoadStatusTitle:
    'رسوب شده                                                                                            ',
  RequesterId: 5,
  RequesterTitle: 'محل درخواست لیست بار برای راننده',
};

const LoadAllocationConditionSampleData: LoadAllocationConditionInfo = {
  LoadAllocationConditionId: 6,
  AnnouncementId: 2,
  AnnouncementTitle:
    'تريلي برون شهري ذوب و سبا                                                                           ',
  AnnouncementSGId: 7,
  AnnouncementSGTitle:
    'برون شهری آهن آلات ذوبی                                                                             ',
  SequentialTurnId: 2,
  SequentialTurnTitle:
    'تريلي برون شهري - آهن آلات انباري و ذوبي ، رول سبا                                                  ',
  TruckNativenessTypeId: 2,
  TruckNativenessTypeTitle: 'غیر بومی',
  LoadStatusId: 5,
  LoadStatusTitle:
    'رسوب شده                                                                                            ',
  RequesterId: 1,
  RequesterTitle: 'محل درخواست نوبت بلادرنگ',
  TurnStatusId: 1,
  TurnStatusTitle:
    'صادر شده                                                                                            ',
};

const ApiLoadAnnouncementConfigSchema = createApiResponseSchema(
  zodLoadAnnouncementConfig
);

const ApiLoadAnnouncementConfigsSchema = createApiResponseSchema(
  z.array(zodLoadAnnouncementConfig)
);

const ApiGeneralConfigSchema = createApiResponseSchema(
  z.array(zodGeneralConfig)
);

const ApiLoadViewConditionInfoSchema = createApiResponseSchema(
  z.array(zodLoadViewConditionInfo)
);

const ApiDeviceConfigSchema = createApiResponseSchema(z.array(zodDeviceConfig));

const ApiDevicesInfoSchema = createApiResponseSchema(z.array(zodDeviceInfo));

const ApiLoadAllocationConditionInfoSchema = createApiResponseSchema(
  z.array(zodLoadAllocationConditionInfo)
);

describe('ConfigManagementService', () => {
  let service: ConfigManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(ConfigManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('Testing LoadAnnouncementConfig methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const regRes = await service.RegisterLoadAnnouncementConfig(
      loadAnnouncementConfigSampleData
    );
    validateResponse<LoadAnnouncementConfig>(
      regRes,
      ApiLoadAnnouncementConfigSchema
    );

    const getAllRes = await service.GetAllOfLoadAnnouncementConfig();
    validateResponse<LoadAnnouncementConfig[]>(
      getAllRes,
      ApiLoadAnnouncementConfigsSchema
    );

    const regData = getAllRes.data[getAllRes.data.length - 1];

    const editRes = await service.EditLoadAnnouncementConfig(regData);
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);

    const delRes = await service.DeleteLoadAnnouncementConfig({
      AnnouncementId: regData.AnnouncementId,
      AnnouncementSGId: regData.AnnouncementSGId,
      COLAId: regData.COLAId,
      COLAIndex: regData.COLAIndex,
    });
    validateResponse<ShortResponse>(delRes, ApiShortResponseSchema);
  });

  it('Testing GeneralConfig methods with flow', async () => {
    await devAuth.loginAsAdmin();

    const getAllRes = await service.GetAllOfGeneralConfig();
    validateResponse<GeneralConfig[]>(getAllRes, ApiGeneralConfigSchema);

    const regData = getAllRes.data[getAllRes.data.length - 1];

    const editRes = await service.EditGeneralConfig(regData);
    validateResponse<ShortResponse>(editRes, ApiShortResponseSchema);
  });
});
