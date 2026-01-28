import z from 'zod';

export interface TrafficCardType {
  TrafficCardTypeId: number;
  TrafficCardTypeTitle: string;
  Active: boolean;
}

export const zodTrafficCardType = z.object({
  TrafficCardTypeId: z.number(),
  TrafficCardTypeTitle: z.string(),
  Active: z.boolean(),
});
