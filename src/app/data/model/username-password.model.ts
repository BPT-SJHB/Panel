import { z } from 'zod';

export interface APIUsernamePassword {
  UserShenaseh: string;
  UserPassword: string;
}

export interface UsernamePassword {
  Username: string;
  Password: string;
}

export const zodUsernamePassword = z.object({
  Username: z.string(),
  Password: z.string(),
});
