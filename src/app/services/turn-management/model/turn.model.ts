import z from 'zod';

export interface Turn {
  TurnId: number;
  TurnIssueDate?: string;
  TurnIssueTime?: string;
  TruckDriver?: string;
  SoftwareUserName?: string;
  BillOfLadingNumber?: string;
  OtaghdarTurnNumber?: string;
  TurnStatusTitle?: string;
  TurnStatusDescription?: string;
  DateOfLastChanged?: string;
  SequentialTurnTitle?: string;
}

export const zodTurn = z.object({
  TurnId: z.number(),
  TurnIssueDate: z.string().optional(),
  TurnIssueTime: z.string().optional(),
  TruckDriver: z.string().optional(),
  SoftwareUserName: z.string().optional(),
  BillOfLadingNumber: z.string().optional(),
  OtaghdarTurnNumber: z.string().optional(),
  TurnStatusTitle: z.string().optional(),
  TurnStatusDescription: z.string().optional(),
  DateOfLastChanged: z.string().optional(),
  SequentialTurnTitle: z.string().optional(),
});
