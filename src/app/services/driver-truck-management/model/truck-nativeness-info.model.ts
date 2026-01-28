import { z } from 'zod';

export interface TruckNativenessInfo {
  TruckNativenessTypeId?: number;
  TruckNativenessTypeTitle?: string;
  TruckNativenessExpireDate: string;
}

export const zodTruckNativenessInfo = z.object({
  TruckNativenessTypeId: z.number().optional(),
  TruckNativenessTypeTitle: z.string().optional(),
  TruckNativenessExpireDate: z.string(),
});

export type TruckNativenessType = Pick<
  TruckNativenessInfo,
  'TruckNativenessTypeId' | 'TruckNativenessTypeTitle'
>;

export const zodTruckNativenessType = z.object({
  TruckNativenessTypeId: z.number(),
  TruckNativenessTypeTitle: z.string(),
});
