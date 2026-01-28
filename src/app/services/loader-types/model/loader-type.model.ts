import z from 'zod';

export interface LoaderType {
  LoaderTypeId: number;
  LoaderTypeTitle?: string;
  LoaderTypeOrganizationId?: number;
  LoaderTypeFixStatusId?: number;
  LoaderTypeFixStatusTitle?: string;
  Active?: boolean;
}

export const zodLoaderType = z.object({
  LoaderTypeId: z.number(),
  LoaderTypeTitle: z.string().optional(),
  LoaderTypeOrganizationId: z.number().optional(),
  LoaderTypeFixStatusId: z.number().optional(),
  LoaderTypeFixStatusTitle: z.string().optional(),
  Active: z.boolean().optional(),
});
