import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { WalletTransaction } from './model/wallet-transaction.model';
import { API_ROUTES } from 'app/constants/api';
import { Wallet } from './model/wallet.model';
import { mockWalletTransactions } from './mock/wallet-transaction.mock';
import { WalletPaymentHistory } from './model/wallet-payment-history.model';
import { mockWalletPaymentHistories } from './mock/wallet-payment-history.mock';
import { mockWallet } from './mock/wallet.mock';
import { WalletDefaultAmount } from './model/wallet-default-amount.model';
import { mockWalletDefaultAmounts } from './mock/wallet-default-amount.mock';
import { WalletPaymentRequest } from './model/wallet-payment-request.model';
import { mockWalletPaymentRequest } from './mock/wallet-payment-request.mock';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import { WalletUserChargingFunction } from './model/wallet-user-charging-function.model';
import { mockWalletUserChargingFunctions } from './mock/wallet-user-charging-function.mock';
import { TransportCompany } from '../transport-company-management/model/transport-company-info.model';
@Injectable({
  providedIn: 'root',
})
export class WalletManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetUserWalletInfo(): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetUserWallet;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue, mockWallet);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data,
      error: response.error,
    };
    //#endregion
  }

  public async GetTruckWalletInfo(
    truckId: number
  ): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetTruckWallet;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue, mockWallet);
    //#endregion
  }

  public async GetTruckerAssociationWalletInfo(): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetTruckerAssociationWallet;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue, mockWallet);
    //#endregion
  }

  public async GetTransportCompanyWallet(
    transportCompanyId: number
  ): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetTransportCompanyWallet;
    const transportCompanyInfo: TransportCompany = { TCId: transportCompanyId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TransportCompanyId: transportCompanyInfo.TCId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue, mockWallet);
    //#endregion
  }

  public async GetSmsWalletInfo(): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetSmsWallet;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue, mockWallet);
    //#endregion
  }

  public async GetTotalOfUserFunctions(
    startData: string,
    endData: string,
    startTime: string,
    endTime: string
  ): Promise<
    ApiResponse<{
      Total: number;
    }>
  > {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetTotalOfUserFunctions;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      StartDate: startData,
      EndDate: endData,
      StartTime: startTime,
      EndTime: endTime,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { Total: number }
    >(apiUrl, bodyValue, {
      Total: 236200,
    });
    //#endregion
  }

  public async GetUserChargingFunctions(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): Promise<ApiResponse<WalletUserChargingFunction[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetUserChargingFunctions;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      StartDate: startDate,
      EndDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletUserChargingFunction[]
    >(apiUrl, bodyValue, mockWalletUserChargingFunctions);
    //#endregion
  }

  public async GetWalletBalance(
    walletId: number
  ): Promise<ApiResponse<{ Balance: number }>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetWalletBalance;
    const walletInfo: Wallet = {
      MoneyWalletId: walletId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      MoneyWalletId: walletInfo.MoneyWalletId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { Balance: number }
    >(apiUrl, bodyValue, {
      Balance: 10000000,
    });
    //#endregion
  }

  public async GetWalletDefaultAmounts(): Promise<
    ApiResponse<WalletDefaultAmount[]>
  > {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetDefaultAmounts;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletDefaultAmount[]
    >(apiUrl, bodyValue, mockWalletDefaultAmounts);
    //#endregion
  }

  public async SendPaymentRequest(
    amount: number
  ): Promise<ApiResponse<WalletPaymentRequest>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletRequests.PaymentRequest;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Amount: amount,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletPaymentRequest
    >(apiUrl, bodyValue, mockWalletPaymentRequest);
    //#endregion
  }

  public async GetWalletTransactions(
    walletId: number
  ): Promise<ApiResponse<WalletTransaction[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetWalletTransactions;
    const walletInfo: Wallet = {
      MoneyWalletId: walletId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      MoneyWalletId: walletInfo.MoneyWalletId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletTransaction[]
    >(apiUrl, bodyValue, mockWalletTransactions);
    //#endregion
  }

  public async GetWalletPaymentRecords(
    walletId: number
  ): Promise<ApiResponse<WalletPaymentHistory[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetWalletPaymentRecords;
    const walletInfo: Wallet = {
      MoneyWalletId: walletId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      MoneyWalletId: walletInfo.MoneyWalletId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletPaymentHistory[]
    >(apiUrl, bodyValue, mockWalletPaymentHistories);
    //#endregion
  }
}
