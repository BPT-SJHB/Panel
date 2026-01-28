import z from 'zod';

export interface TrafficCardTempType {
  TrafficCardTempTypeId: number;
  TrafficCardTempTypeTitle: string;
}

export const zodTrafficCardTempType = z.object({
  TrafficCardTempTypeId: z.number(),
  TrafficCardTempTypeTitle: z.string(),
});
