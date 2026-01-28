import z from 'zod';

export interface TurnAccounting {
  TurnId: number;
  SequentialTurnId?: string;
  DateShamsi?: string;
  Time?: string;
  AccountingTypeTitle?: string;
  UserName?: string;
}

export const zodTurnAccounting = z.object({
  TurnId: z.number(),
  SequentialTurnId: z.string().optional(),
  DateShamsi: z.string().optional(),
  Time: z.string().optional(),
  AccountingTypeTitle: z.string().optional(),
  UserName: z.string().optional(),
});
