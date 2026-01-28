import { TestBed } from '@angular/core/testing';
import { WalletManagementService } from './wallet-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';
import { Wallet, zodWallet } from './model/wallet.model';
import {
  WalletDefaultAmount,
  zodWalletDefaultAmount,
} from './model/wallet-default-amount.model';
import z from 'zod';
import {
  WalletPaymentRequest,
  zodWalletPaymentRequest,
} from './model/wallet-payment-request.model';
import { TransportCompany } from '../transport-company-management/model/transport-company-info.model';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import {
  WalletTransaction,
  zodWalletTransaction,
} from './model/wallet-transaction.model';
import {
  WalletPaymentHistory,
  zodWalletPaymentHistory,
} from './model/wallet-payment-history.model';
import {
  WalletUserChargingFunction,
  zodWalletUserChargingFunction,
} from './model/wallet-user-charging-function.model';

const paymentRequestSampleData = 500000;

const transportCompanySampleData: TransportCompany = {
  TCId: 21651,
  TCTitle: 'پارسيان',
  TCOrganizationCode: '2100651',
  TCCityTitle: 'اصفهان - مباركه',
  TCTel: '',
  TCManagerMobileNumber: '',
  TCManagerNameFamily: '',
  EmailAddress: 'morteza1466@gmail.com',
  Active: true,
};

const TruckInfoSampleData: TruckInfo = {
  TruckId: 5,
  LoaderTypeId: 605,
  Pelak: '673ع32',
  Serial: '52',
  SmartCardNo: '2305365',
};

const walletSampleData: Wallet = {
  MoneyWalletId: 1,
  MoneyWalletCode: '0000001Ur1',
  Balance: 99999999,
};

const dateTimeSampleData = {
  StartDate: '1404/01/01',
  StartTime: '00:01',
  EndDate: '1404/12/27',
  EndTime: '23:59',
};

const ApiWalletSchema = createApiResponseSchema(zodWallet);

const ApiWalletDefaultAmountsSchema = createApiResponseSchema(
  z.array(zodWalletDefaultAmount)
);

const ApiWalletPaymentRequestSchema = createApiResponseSchema(
  zodWalletPaymentRequest
);

const ApiBalanceSchema = createApiResponseSchema(
  z.object({ Balance: z.number() })
);

const ApiWalletTransactionsSchema = createApiResponseSchema(
  z.array(zodWalletTransaction)
);

const ApiWalletPaymentHistoriesSchema = createApiResponseSchema(
  z.array(zodWalletPaymentHistory)
);

const ApiWalletUserChargingFunctionSchema = createApiResponseSchema(
  z.array(zodWalletUserChargingFunction)
);

const ApiTotalFunctionsSchema = createApiResponseSchema(
  z.object({
    Total: z.number(),
  })
);

describe('WalletManagementService', () => {
  let service: WalletManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    devAuth = TestBed.inject(DevAuthService);
    service = TestBed.inject(WalletManagementService);

    devAuth.logout();
  });

  it('Testing GetUserWalletInfo method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetUserWalletInfo();

    validateResponse<Wallet>(response, ApiWalletSchema);
  });

  it('Testing GetWalletDefaultAmounts method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetWalletDefaultAmounts();

    validateResponse<WalletDefaultAmount[]>(
      response,
      ApiWalletDefaultAmountsSchema
    );
  });

  it('Testing  SendPaymentRequest method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.SendPaymentRequest(paymentRequestSampleData);

    validateResponse<WalletPaymentRequest>(
      response,
      ApiWalletPaymentRequestSchema
    );
  });

  it('Testing GetTruckerAssociationWalletInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetTruckerAssociationWalletInfo();

    validateResponse<Wallet>(response, ApiWalletSchema);
  });

  it('Testing GetTruckWalletInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetTruckWalletInfo(
      TruckInfoSampleData.TruckId
    );

    validateResponse<Wallet>(response, ApiWalletSchema);
  });

  it('Testing GetTransportCompanyWallet method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetTransportCompanyWallet(
      transportCompanySampleData.TCId
    );

    validateResponse<Wallet>(response, ApiWalletSchema);
  });

  it('Testing GetSmsWalletInfo method', async () => {
    await devAuth.loginAsAdmin();

    const response = await service.GetSmsWalletInfo();

    validateResponse<Wallet>(response, ApiWalletSchema);
  });

  it('Testing GetWalletBalance method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetWalletBalance(
      walletSampleData.MoneyWalletId
    );

    validateResponse<{ Balance: number }>(response, ApiBalanceSchema);
  });

  it('Testing GetWalletTransactions method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetWalletTransactions(
      walletSampleData.MoneyWalletId
    );

    validateResponse<WalletTransaction[]>(
      response,
      ApiWalletTransactionsSchema
    );
  });

  it('Testing GetWalletPaymentRecords method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetWalletPaymentRecords(
      walletSampleData.MoneyWalletId
    );

    validateResponse<WalletPaymentHistory[]>(
      response,
      ApiWalletPaymentHistoriesSchema
    );
  });

  it('Testing GetTotalOfUserFunctions method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetTotalOfUserFunctions(
      dateTimeSampleData.StartDate,
      dateTimeSampleData.EndDate,
      dateTimeSampleData.StartTime,
      dateTimeSampleData.EndTime
    );

    validateResponse<{ Total: number }>(response, ApiTotalFunctionsSchema);
  });

  it('Testing GetUserChargingFunctions method', async () => {
    await devAuth.loginAsDriver();

    const response = await service.GetUserChargingFunctions(
      dateTimeSampleData.StartDate,
      dateTimeSampleData.EndDate,
      dateTimeSampleData.StartTime,
      dateTimeSampleData.EndTime
    );

    validateResponse<WalletUserChargingFunction[]>(
      response,
      ApiWalletUserChargingFunctionSchema
    );
  });
});
