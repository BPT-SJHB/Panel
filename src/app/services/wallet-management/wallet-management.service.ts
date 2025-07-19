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
@Injectable({
  providedIn: 'root',
})
export class WalletManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
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
}
