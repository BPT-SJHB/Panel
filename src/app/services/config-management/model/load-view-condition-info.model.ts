import { z } from 'zod';

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

export const zodLoadViewConditionInfo = z.object({
  LoadViewConditionId: z.number(),
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
});

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
