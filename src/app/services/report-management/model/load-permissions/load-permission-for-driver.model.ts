import z from 'zod';

export interface LoadPermissionForDriver {
  LoadId: number;
  Tonaj: number;
  SequentialTurn: string;
  LoadAllocationId: number;
  Priority: number;
  ShamsiDate: string;
  Time: string;
  GoodTitle: string;
  LoadSourceCity: string;
  LoadTargetCity: string;
}

export const zodLoadPermissionForDriver = z.object({
  LoadId: z.number(),
  Tonaj: z.number(),
  SequentialTurn: z.string(),
  LoadAllocationId: z.number(),
  Priority: z.number(),
  ShamsiDate: z.string(),
  Time: z.string(),
  GoodTitle: z.string(),
  LoadSourceCity: z.string(),
  LoadTargetCity: z.string(),
});
