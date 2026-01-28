import z from 'zod';

export interface LoadAllocatedToNextTurn {
  TurnId: number;
  TruckId: number;
  TurnIssueDate: string;
  TurnIssueTime: string;
  TurnDescription: string;
  TurnIssueSoftwareUserId: number;
  TurnLastChangedSoftwareUserId: number;
  TruckDriverName: string;
  bFlag: boolean;
  bFlagDriver: boolean;
  TurnLastChangedDate: string;
  TurnLastChangedTime: string;
  TruckDriverId: number;
  BillOfLadingNumber: string;
  SequentialTurnNumber: string;
  TurnStatusId: number;
  RegisteringTimeStamp: string;
}

export const zodLoadAllocateToNextTurn = z.object({
  TurnId: z.number(),
  TruckId: z.number(),
  TurnIssueDate: z.string(),
  TurnIssueTime: z.string(),
  TurnDescription: z.string(),
  TurnIssueSoftwareUserId: z.number(),
  TurnLastChangedSoftwareUserId: z.number(),
  TruckDriverName: z.string(),
  bFlag: z.boolean(),
  bFlagDriver: z.boolean(),
  TurnLastChangedDate: z.string(),
  TurnLastChangedTime: z.string(),
  TruckDriverId: z.number(),
  BillOfLadingNumber: z.string(),
  SequentialTurnNumber: z.string(),
  TurnStatusId: z.number(),
  RegisteringTimeStamp: z.string(),
});
