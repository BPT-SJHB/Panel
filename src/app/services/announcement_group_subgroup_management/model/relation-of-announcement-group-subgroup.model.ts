export interface RelationOfAnnouncementGroupAndSubGroup {
  AnnouncementId: number;
  AnnouncementTitle?: string;
  AnnouncementSubGroups: AnnouncementSubGroupInRelation[];
}

export interface AnnouncementSubGroupInRelation {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}
