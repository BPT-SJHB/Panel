import z from 'zod';

export interface WalletPaymentHistory {
  ShamsiDate: string;
  Time: string;
  Amount: number;
  UserName: string;
}

export const zodWalletPaymentHistory = z.object({
  ShamsiDate: z.string(),
  Time: z.string(),
  Amount: z.number(),
  UserName: z.string(),
});
