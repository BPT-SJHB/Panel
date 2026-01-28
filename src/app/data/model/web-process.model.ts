import { z } from 'zod';

export interface WebProcess {
  id: number;
  title: string;
  name: string;
  description: string;
  icon: string;
  backColor: string;
  foreColor: string;
}

export const zodWebProcess = z.object({
  id: z.number(),
  title: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  backColor: z.string(),
  foreColor: z.string(),
});
