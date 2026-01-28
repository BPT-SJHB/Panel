import { z } from 'zod';

export interface LoadStatus {
  LoadStatusId: number;
  LoadStatusTitle: string;
}

export const zodLoadStatus = z.object({
  LoadStatusId: z.number(),
  LoadStatusTitle: z.string(),
});
