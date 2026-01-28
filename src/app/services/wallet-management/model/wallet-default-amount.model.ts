import z from 'zod';

export interface WalletDefaultAmount {
  AmountTitle: string;
  Amount: number;
}

export const zodWalletDefaultAmount = z.object({
  AmountTitle: z.string(),
  Amount: z.number(),
});
