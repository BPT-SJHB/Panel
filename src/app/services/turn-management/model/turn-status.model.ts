import z from 'zod';

export interface TurnStatus {
  TurnStatusId: number;
  TurnStatusTitle: string;
}

export const zodTurnStatus = z.object({
  TurnStatusId: z.number(),
  TurnStatusTitle: z.string(),
});

