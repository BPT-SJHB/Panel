import { TestBed } from '@angular/core/testing';
import { WalletManagementService } from './wallet-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

describe('WalletManagementService', () => {
  let service: WalletManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletManagementService, DevAuthService],
    });

    devAuth = TestBed.inject(DevAuthService);
    service = TestBed.inject(WalletManagementService);

    devAuth.logout();
  });

  it('GetUserWalletInfo: should return user wallet info', async () => {
    await devAuth.loginAsAdmin();

    const res = await service.GetUserWalletInfo();
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.MoneyWalletId).toBeDefined();
  });

  it('GetTruckWalletInfo: should return truck wallet info', async () => {
    await devAuth.loginAsAdmin();

    const walletId = 1;
    const res = await service.GetTruckWalletInfo(walletId);
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.MoneyWalletId).toBeDefined();
  });

  it('GetTruckerAssociationWalletInfo: should return trucker association wallet info', async () => {
    await devAuth.loginAsAdmin();

    const res = await service.GetTruckerAssociationWalletInfo();
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.MoneyWalletId).toBeDefined();
  });

  it('GetTransportCompanyWallet: should return transport company wallet', async () => {
    await devAuth.loginAsAdmin();
    const companyId = 1;

    const res = await service.GetTransportCompanyWallet(companyId);
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.MoneyWalletId).toBeDefined();
  });

  it('GetSmsWalletInfo: should return sms wallet info', async () => {
    await devAuth.loginAsAdmin();

    const res = await service.GetSmsWalletInfo();
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.MoneyWalletId).toBeDefined();
  });

  it('GetTotalOfUserFunctions: should return total of user functions', async () => {
    await devAuth.loginAsAdmin();

    const startDate = '1404/04/01';
    const endDate = '1404/09/01';
    const startTime = '00:00:00';
    const endTime = '23:59:00';

    const res = await service.GetTotalOfUserFunctions(
      startDate,
      endDate,
      startTime,
      endTime
    );
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Total).toEqual(jasmine.any(Number));
  });

  it('GetUserChargingFunctions: should return user charging functions', async () => {
    await devAuth.loginAsAdmin();

    const startDate = '1404/04/01';
    const endDate = '1404/09/01';
    const startTime = '00:00:00';
    const endTime = '23:59:00';

    const res = await service.GetUserChargingFunctions(
      startDate,
      endDate,
      startTime,
      endTime
    );

    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item) => {
      expect(item).toEqual(jasmine.any(Object));
    });
  });

  it('GetWalletBalance: should return wallet balance', async () => {
    const res = await service.GetWalletBalance(1);
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Balance).toEqual(jasmine.any(Number));
  });

  it('GetWalletDefaultAmounts: should return wallet default amounts', async () => {
    await devAuth.loginAsAdmin();

    const res = await service.GetWalletDefaultAmounts();
    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((item) => expect(item).toEqual(jasmine.any(Object)));
  });

  it('SendPaymentRequest: should send payment request', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.SendPaymentRequest(100000);
    expect(res.data).toEqual(jasmine.any(Object));
    expect(res.data?.Authority).toBeDefined();
  });

  it('GetWalletTransactions: should return wallet transactions', async () => {
    await devAuth.loginAsAdmin();

    const walletId = 1;
    const res = await service.GetWalletTransactions(walletId);
    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((tx) => expect(tx).toEqual(jasmine.any(Object)));
  });

  it('GetWalletPaymentRecords: should return wallet payment records', async () => {
    await devAuth.loginAsAdmin();

    const walletId = 1;
    const res = await service.GetWalletPaymentRecords(walletId);
    expect(res.data).toEqual(jasmine.any(Array));
    res.data?.forEach((record) => expect(record).toEqual(jasmine.any(Object)));
  });
});
