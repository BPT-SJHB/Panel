import { z } from 'zod';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details: string;
  };
}

export const zodError = z.object({
  code: z.number(),
  message: z.string(),
  details: z.string(),
});
