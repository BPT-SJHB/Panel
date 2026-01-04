import z from 'zod';

export interface WalletTransaction {
  TransactionTitle: string;
  TransactionColor: string;
  ShamsiDate: string;
  Time: string;
  CurrentBalance: number;
  Amount: number;
  Reminder: number;
  UserName: string;
}

export const zodWalletTransaction = z.object({
  TransactionTitle: z.string(),
  TransactionColor: z.string(),
  ShamsiDate: z.string(),
  Time: z.string(),
  CurrentBalance: z.number(),
  Amount: z.number(),
  Reminder: z.number(),
  UserName: z.string(),
});
