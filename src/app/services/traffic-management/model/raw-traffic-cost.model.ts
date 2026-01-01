import z from 'zod';

export interface RawTrafficCost {
  TrafficCardTypeId: number;
  EntryBaseCost: number;
  NoCostStoppageDuration: number;
  ExcessStoppageDuration: number;
  ExcessStoppageCost: number;
  Active: boolean;
}

export const zodRawTrafficCost = z.object({
  TrafficCardTypeId: z.number(),
  EntryBaseCost: z.number(),
  NoCostStoppageDuration: z.number(),
  ExcessStoppageDuration: z.number(),
  ExcessStoppageCost: z.number(),
  Active: z.boolean(),
});
