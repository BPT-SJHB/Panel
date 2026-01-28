import z from 'zod';

export interface Wallet {
  MoneyWalletId: number;
  MoneyWalletCode?: string;
  Balance?: number;
}

export const zodWallet = z.object({
  MoneyWalletId: z.number(),
  MoneyWalletCode: z.string().optional(),
  Balance: z.number().optional(),
});
