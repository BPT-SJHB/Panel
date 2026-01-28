import { z } from 'zod';

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

export const zodLoadAllocationConditionInfo = z.object({
  LoadAllocationConditionId: z.number(),
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string(),
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string(),
  SequentialTurnId: z.number(),
  SequentialTurnTitle: z.string(),
  TruckNativenessTypeId: z.number(),
  TruckNativenessTypeTitle: z.string(),
  LoadStatusId: z.number(),
  LoadStatusTitle: z.string(),
  RequesterId: z.number(),
  RequesterTitle: z.string(),
  TurnStatusId: z.number(),
  TurnStatusTitle: z.string(),
});

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
