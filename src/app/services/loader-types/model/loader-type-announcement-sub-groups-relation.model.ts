export interface LoaderTypeToAnnouncementSubGroupRelation {
  LoaderTypeId: number;
  LoaderTypeTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
}

export type RegisterDeleteRelationToAnnouncementSubGroup = Pick<
  LoaderTypeToAnnouncementSubGroupRelation,
  'LoaderTypeId' | 'AnnouncementSGId'
>;
