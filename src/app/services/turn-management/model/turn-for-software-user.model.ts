import z from 'zod';

export interface TurnForSoftwareUser {
  TurnDistanceToValidity: number;
  TurnId: number;
  TurnIssueDate: string;
  TurnIssueTime: string;
  TruckDriver: string;
  SequentialTurn: string;
  TurnStatusTitle: string;
  LPString: string;
}

export const zodTurnForSoftwareUser = z.object({
  TurnDistanceToValidity: z.number(),
  TurnId: z.number(),
  TurnIssueDate: z.string(),
  TurnIssueTime: z.string(),
  TruckDriver: z.string(),
  SequentialTurn: z.string(),
  TurnStatusTitle: z.string(),
  LPString: z.string(),
});
