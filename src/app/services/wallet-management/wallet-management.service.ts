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
}
