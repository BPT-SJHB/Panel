import z from 'zod';

export interface TurnCost {
  SeqTurnId: number;
  SeqTurnTitle: string;
  SelfGoverCost: number;
  TruckersAssociationCost: number;
  TruckDriversAssociationCost: number;
}

export const zodTurnCost = z.object({
  SeqTurnId: z.number(),
  SeqTurnTitle: z.string(),
  SelfGoverCost: z.number(),
  TruckersAssociationCost: z.number(),
  TruckDriversAssociationCost: z.number(),
});

export type DeleteInfoOfTurnCost = Pick<TurnCost, 'SeqTurnId'>;
