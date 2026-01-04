import { TruckDriverInfo, zodTruckDriverInfo } from './truck-driver-info.model';
import { Turn, zodTurn } from '../../turn-management/model/turn.model';
import { Wallet, zodWallet } from '../../wallet-management/model/wallet.model';
import { z } from 'zod';

export interface TruckInfo {
  TruckId: number;
  LoaderTypeId?: number;
  Pelak?: string;
  Serial?: string;
  SmartCardNo?: string;
}

export const zodTruckInfo = z.object({
  TruckId: z.number(),
  LoaderTypeId: z.number().optional(),
  Pelak: z.string().optional(),
  Serial: z.string().optional(),
  SmartCardNo: z.string().optional(),
});

export interface TruckComposedInfo {
  Truck: TruckInfo;
  TruckDriver?: TruckDriverInfo;
  Turn?: Turn;
  MoneyWallet?: Wallet;
}

export const zodTruckComposedInfo = z.object({
  Truck: zodTruckInfo,
  TruckDriver: zodTruckDriverInfo.optional(),
  Turn: zodTurn.optional(),
  MoneyWallet: zodWallet.optional(),
});
