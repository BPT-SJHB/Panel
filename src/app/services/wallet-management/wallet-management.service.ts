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
      data: this.TrimWallet(response.data!),
      error: response.error,
    };
    //#endregion
  }

  private TrimWallet(wallet: Wallet): Wallet {
    return {
      MoneyWalletId: wallet.MoneyWalletId,
      Balance: wallet.Balance,
      MoneyWalletCode: wallet.MoneyWalletCode?.trim(),
    };
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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletDefaultAmount[]
    >(apiUrl, bodyValue, mockWalletDefaultAmounts);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        AmountTitle: data.AmountTitle.trim(),
        Amount: data.Amount,
      })),
      error: response.error,
    };
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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletTransaction[]
    >(apiUrl, bodyValue, mockWalletTransactions);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        TransactionTitle: data.TransactionTitle.trim(),
        TransactionColor: data.TransactionColor.trim(),
        ShamsiDate: data.ShamsiDate.trim(),
        Time: data.Time.trim(),
        CurrentBalance: data.CurrentBalance,
        Amount: data.Amount,
        Reminder: data.Reminder,
        UserName: data.UserName.trim(),
      })),
      error: response.error,
    };
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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      WalletPaymentHistory[]
    >(apiUrl, bodyValue, mockWalletPaymentHistories);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        ShamsiDate: data.ShamsiDate.trim(),
        Time: data.Time.trim(),
        Amount: data.Amount,
        UserName: data.UserName.trim(),
      })),
      error: response.error,
    };
    //#endregion
  }
}
