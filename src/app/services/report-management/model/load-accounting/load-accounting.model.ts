import z from 'zod';

export interface LoadAccounting {
  LoadId: number;
  Color: string;
  AccountingTitle: string;
  UserName: string;
  Amount: number;
  ShamsiDate: string;
  Time: string;
}

export const zodLoadAccounting = z.object({
  LoadId: z.number(),
  Color: z.string(),
  AccountingTitle: z.string(),
  UserName: z.string(),
  Amount: z.number(),
  ShamsiDate: z.string(),
  Time: z.string(),
});
