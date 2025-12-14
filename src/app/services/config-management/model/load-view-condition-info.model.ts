export interface LoadViewConditionInfo {
  LoadViewConditionId: number;
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
}

export type RegisterLoadViewConditionInfo = Pick<
  LoadViewConditionInfo,
  | 'AnnouncementSGId'
  | 'SequentialTurnId'
  | 'TruckNativenessTypeId'
  | 'LoadStatusId'
  | 'RequesterId'
>;

export type EditLoadViewConditionInfo = Pick<
  LoadViewConditionInfo,
  | 'LoadViewConditionId'
  | 'AnnouncementSGId'
  | 'SequentialTurnId'
  | 'TruckNativenessTypeId'
  | 'LoadStatusId'
  | 'RequesterId'
>;

export type DeleteLoadViewConditionInfo = Pick<
  LoadViewConditionInfo,
  'LoadViewConditionId'
>;
