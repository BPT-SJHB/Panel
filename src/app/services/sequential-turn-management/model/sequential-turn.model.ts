import z from 'zod';

export interface SequentialTurn {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  SeqTurnKeyWord?: string;
  Active?: boolean;
}

export const zodSequentialTurn = z.object({
  SeqTurnId: z.number(),
  SeqTurnTitle: z.string().optional(),
  SeqTurnKeyWord: z.string().optional(),
  Active: z.boolean().optional(),
});
