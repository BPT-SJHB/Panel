import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { WalletTransaction } from './model/wallet-transaction.model';
import { API_ROUTES } from 'app/constants/api';
import { Wallet } from './model/wallet.model';
import { WalletPaymentHistory } from './model/wallet-payment-history.model';
import { WalletDefaultAmount } from './model/wallet-default-amount.model';
import { WalletPaymentRequest } from './model/wallet-payment-request.model';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import { WalletUserChargingFunction } from './model/wallet-user-charging-function.model';
import { TransportCompany } from '../transport-company-management/model/transport-company-info.model';

@Injectable({
  providedIn: 'root',
})
export class WalletManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetUserWalletInfo(): Promise<ApiResponse<Wallet>> {
    //#region Consts
    const apiUrl = API_ROUTES.WalletAndTrafficApi.WalletInfo.GetUserWallet;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetTruckWalletInfo(
    truckId: number
  ): Promise<ApiResponse<Wallet>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetTruckerAssociationWalletInfo(): Promise<ApiResponse<Wallet>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetTransportCompanyWallet(
    transportCompanyId: number
  ): Promise<ApiResponse<Wallet>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetSmsWalletInfo(): Promise<ApiResponse<Wallet>> {
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
    >(apiUrl, bodyValue);
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetWalletDefaultAmounts(): Promise<
    ApiResponse<WalletDefaultAmount[]>
  > {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async SendPaymentRequest(
    amount: number
  ): Promise<ApiResponse<WalletPaymentRequest>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetWalletTransactions(
    walletId: number
  ): Promise<ApiResponse<WalletTransaction[]>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetMyWalletTransactions(): Promise<
    ApiResponse<WalletTransaction[]>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetMyWalletTransactions;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletTransaction[]
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetWalletPaymentRecords(
    walletId: number
  ): Promise<ApiResponse<WalletPaymentHistory[]>> {
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
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetMyWalletPaymentRecords(): Promise<
    ApiResponse<WalletPaymentHistory[]>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.WalletAndTrafficApi.WalletInfo.GetMyWalletPaymentRecords;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletPaymentHistory[]
    >(apiUrl, bodyValue);
    //#endregion
  }
}
