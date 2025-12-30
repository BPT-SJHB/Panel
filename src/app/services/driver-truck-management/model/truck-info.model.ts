import { TruckDriverInfo } from './truck-driver-info.model';
import { Turn } from '../../turn-management/model/turn.model';
import { Wallet } from '../../wallet-management/model/wallet.model';
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
