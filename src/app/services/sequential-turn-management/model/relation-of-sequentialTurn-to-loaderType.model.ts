export interface RelationOfSequentialTurnToLoaderType {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  LoaderTypes: LoaderTypeInRelation[];
}

export interface LoaderTypeInRelation {
  LoaderTypeId: number;
  LoaderTypeTitle?: string;
}
