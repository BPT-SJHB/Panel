import z from 'zod';

export interface LoaderTypeInRelation {
  LoaderTypeId: number;
  LoaderTypeTitle?: string;
}

export const zodLoaderTypeInRelation = z.object({
  LoaderTypeId: z.number(),
  LoaderTypeTitle: z.string().optional(),
});

export interface RelationOfSequentialTurnToLoaderType {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  LoaderTypes: LoaderTypeInRelation[];
}

export const zodRelationOfSequentialTurnToLoaderType = z.object({
  SeqTurnId: z.number(),
  SeqTurnTitle: z.string().optional(),
  LoaderTypes: z.array(zodLoaderTypeInRelation),
});
