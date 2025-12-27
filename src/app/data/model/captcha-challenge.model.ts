import { z } from 'zod';

export interface Captcha {
  SessionId: string;
  Captcha: string;
}

export const zodCaptcha = z.object({
  SessionId: z.string(),
  Captcha: z.string(),
});
