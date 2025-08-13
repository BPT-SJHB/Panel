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
