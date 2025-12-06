export interface TurnCost {
  SeqTurnId: number;
  SeqTurnTitle: string;
  SelfGoverCost: number;
  TruckersAssociationCost: number;
  TruckDriversAssociationCost: number;
}

export type DeleteInfoOfTurnCost = Pick<TurnCost, 'SeqTurnId'>;
