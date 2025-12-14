export interface LoadAllocationConditionInfo {
  LoadAllocationConditionId: number;
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  SequentialTurnId: number;
  SequentialTurnTitle: string;
  TruckNativenessTypeId: number;
  TruckNativenessTypeTitle: string;
  LoadStatusId: number;
  LoadStatusTitle: string;
  RequesterId: number;
  RequesterTitle: string;
  TurnStatusId: number;
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
