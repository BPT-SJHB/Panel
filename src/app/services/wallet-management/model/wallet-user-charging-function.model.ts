import z from 'zod';

export interface WalletUserChargingFunction {
  ShamsiDate: string;
  Time: string;
  Amount: number;
  CardNo: string;
}

export const zodWalletUserChargingFunction = z.object({
  ShamsiDate: z.string(),
  Time: z.string(),
  Amount: z.number(),
  CardNo: z.string(),
});
