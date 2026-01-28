import {
  Wallet,
  zodWallet,
} from 'app/services/wallet-management/model/wallet.model';
import { z } from 'zod';

export interface TrafficInfo {
  EntryExit: string;
  EntryExitColor: string;
  TrafficPicture: string | null;
  MoneyWallet: Wallet;
  TrafficStoppageCost: number;
  Payable: number;
}

export const zodTrafficInfo = z.object({
  EntryExit: z.string(),
  EntryExitColor: z.string(),
  TrafficPicture: z.string().nullable(),
  MoneyWallet: zodWallet,
  TrafficStoppageCost: z.number(),
  Payable: z.number(),
});
