export interface LoadAllocationConditionInfo {
  LoadAllocationConditionId: number; //E
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number; //R //E
  AnnouncementSGTitle: string;
  SequentialTurnId: number; //R //E
  SequentialTurnTitle: string;
  TruckNativenessTypeId: number; //R //E
  TruckNativenessTypeTitle: string;
  LoadStatusId: number; //R //E
  LoadStatusTitle: string;
  RequesterId: number; //R //E
  RequesterTitle: string;
  TurnStatusId: number; //R //E
  TurnStatusTitle: string;
}

export type RegisterLoadAllocationConditionInfo = Pick<
  LoadAllocationConditionInfo,
  | 'AnnouncementSGId'
  | 'SequentialTurnId'
  | 'TruckNativenessTypeId'
  | 'LoadStatusId'
  | 'RequesterId'
  | 'TurnStatusId'
>;

export type EditLoadAllocationConditionInfo = Pick<
  LoadAllocationConditionInfo,
  | 'LoadAllocationConditionId'
  | 'AnnouncementSGId'
  | 'SequentialTurnId'
  | 'TruckNativenessTypeId'
  | 'LoadStatusId'
  | 'RequesterId'
  | 'TurnStatusId'
>;

export type DeleteLoadAllocationConditionInfo = Pick<
  LoadAllocationConditionInfo,
  'LoadAllocationConditionId'
>;
