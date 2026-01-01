import { TestBed } from '@angular/core/testing';
import { ReportsManagementService } from './reports-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  LoadAccounting,
  zodLoadAccounting,
} from './model/load-accounting/load-accounting.model';
import {
  LoadPermission,
  zodLoadPermission,
} from './model/load-permissions/load-permission.model';
import {
  LoadPermissionForCompany,
  zodLoadPermissionForCompany,
} from './model/load-permissions/load-permission-for-company.model';
import {
  LoadPermissionForDriver,
  zodLoadPermissionForDriver,
} from './model/load-permissions/load-permission-for-driver.model';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import z from 'zod';

const loadPermissionSampleData: LoadPermission = {
  LoadId: 15,
  GoodTitle: 'شمش چدن',
  LoadSourceCity: 'اصفهان - ذوب آهن',
  LoadTargetCity: 'مشگين شهر',
  AnnouncementTitle:
    'تريلي برون شهري                                                                                     ',
  AnnouncementSGTitle:
    'برون شهری آهن آلات ذوبی                                                                             ',
  TransportCompany: 'ا مانت  بار                        ',
  Recipient: '',
  Address: '',
  Description: 'فرداصبح بارگيري',
  LoadRegisteringUser:
    'مرتضي شاهمرادي                                                                                      ',
  LoadAllocationUser:
    'حسن;عباسي                                                                                           ',
  LoadAllocationId: 30029,
  LicensePlate: '286ع11 - 13',
  SmartCardNo: '15161718',
  TruckDriver: ';;;محمد بابائي بندارتي',
  NationalCode: '1110253257',
  MobileNumber: '09131767833',
  ShamsiDate: '1404/05/16',
  Time: '21:46:11  ',
  SequentialTurn:
    'T1404/000007                                                                                        ',
  Note: '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ',
  LoadAllocationStatusTitle:
    'تایید شده و مجوز صادر شده                                                                           ',
  TPTParamsJoint: '0',
};

const announcementGroupAndSubGroupIDsampleData = {
  announcementGroupId: 1,
  announcementSubGroupId: 1,
};

const ApiLoadAccountingSchema = createApiResponseSchema(
  z.array(zodLoadAccounting)
);

const ApiLoadPermissionsSchema = createApiResponseSchema(
  z.array(zodLoadPermission)
);

const ApiLoadPermissionsForCompany = createApiResponseSchema(
  z.array(zodLoadPermissionForCompany)
);

const ApiLoadPermissionsForDriver = createApiResponseSchema(
  z.array(zodLoadPermissionForDriver)
);

describe('ReportsManagementService', () => {
  let service: ReportsManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsManagementService, DevAuthService],
    });

    service = TestBed.inject(ReportsManagementService);
    devAuth = TestBed.inject(DevAuthService);

    devAuth.logout();
  });

  it('GetLoadAccounting: should return load accounting info', async () => {
    await devAuth.loginAsAdmin();
    const loadId = 6031;

    const res = await service.GetLoadAccounting(loadId);

    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item: LoadAccounting) =>
      expect(item).toEqual(jasmine.any(Object))
    );
  });

  it('GetLoadPermissions: should return load permissions', async () => {
    await devAuth.loginAsAdmin();
    const loadId = 6032;

    const res = await service.GetLoadPermissions(loadId);
    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item: LoadPermission) =>
      expect(item).toEqual(jasmine.any(Object))
    );
  });

  it('GetLatestLoadPermissionsForCompany: should return latest company load permissions', async () => {
    await devAuth.loginAsCompany();

    const res = await service.GetLatestLoadPermissionsForCompany();

    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item: LoadPermissionForCompany) =>
      expect(item).toEqual(jasmine.any(Object))
    );
  });

  // TODO: Fix Data input
  it('GetLoadPermissionsForDriver: should return driver load permissions', async () => {
    await devAuth.loginAsDriver();

    const groupId = 1;
    const subGroupId = 1;

    const res = await service.GetLoadPermissionsForDriver(groupId, subGroupId);
    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item: LoadPermissionForDriver) =>
      expect(item).toEqual(jasmine.any(Object))
    );
  });
});
