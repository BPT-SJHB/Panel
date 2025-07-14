import { TruckDriverInfo } from './truck-driver-info.model';
import { Turn } from '../../turn-management/model/turn.model';
import { Wallet } from '../../../data/model/wallet.model';

export interface TruckInfo {
  TruckId: number;
  LoaderTypeId?: number;
  Pelak?: string;
  Serial?: string;
  SmartCardNo?: string;
}

export interface TruckComposedInfo {
  Truck: TruckInfo;
  TruckDriver?: TruckDriverInfo;
  Turn?: Turn;
  MoneyWallet?: Wallet;
}
