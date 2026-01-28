import z from 'zod';

export interface FPCInfo {
  FPCId: number;
  FPCTitle?: string;
  FPCTel?: string;
  FPCAddress?: string;
  FPCManagerMobileNumber?: string;
  FPCManagerNameFamily?: string;
  EmailAddress?: string;
  Active?: boolean;
}

export const zodFPCInfo = z.object({
  FPCId: z.number(),
  FPCTitle: z.string().optional(),
  FPCTel: z.string().optional(),
  FPCAddress: z.string().optional(),
  FPCManagerMobileNumber: z.string().optional(),
  FPCManagerNameFamily: z.string().optional(),
  EmailAddress: z.string().optional(),
  Active: z.boolean().optional(),
});
