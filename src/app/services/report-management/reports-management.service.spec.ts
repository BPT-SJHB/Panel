import { TestBed } from '@angular/core/testing';
import { ReportsManagementService } from './reports-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import { LoadAccounting } from './model/load-accounting/load-accounting.model';
import { LoadPermission } from './model/load-permissions/load-permission.model';
import { LoadPermissionForCompany } from './model/load-permissions/load-permission-for-company.model';
import { LoadPermissionForDriver } from './model/load-permissions/load-permission-for-driver.model';

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
