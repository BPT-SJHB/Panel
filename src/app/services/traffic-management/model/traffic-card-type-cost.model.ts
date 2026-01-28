import z from 'zod';

export interface TrafficCardTypeCost {
  TrafficCardTypeId: number;
  EntryBaseCost: number;
  NoCostStoppageDuration: number;
  ExcessStoppageDuration: number;
  ExcessStoppageCost: number;
}

export const zodTrafficCardTypeCost = z.object({
  TrafficCardTypeId: z.number(),
  EntryBaseCost: z.number(),
  NoCostStoppageDuration: z.number(),
  ExcessStoppageDuration: z.number(),
  ExcessStoppageCost: z.number(),
});
