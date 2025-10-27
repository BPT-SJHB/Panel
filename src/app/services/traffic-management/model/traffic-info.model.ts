import { Wallet } from 'app/services/wallet-management/model/wallet.model';

export interface TrafficInfo {
  EntryExit: string;
  EntryExitColor: string;
  TrafficPicture: string | null;
  MoneyWallet: Wallet;
  TrafficStoppageCost: number;
  Payable: number;
}
