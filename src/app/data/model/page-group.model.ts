import { z } from 'zod';
import { WebProcess, zodWebProcess } from './web-process.model';

export interface PageGroup {
  id: number;
  title: string;
  icon: string;
  processes: WebProcess[];
}

export const zodPageGroup = z.object({
  id: z.number(),
  title: z.string(),
  icon: z.string(),
  processes: z.array(zodWebProcess),
});
