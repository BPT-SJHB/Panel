export interface RelationOfAnnouncementGroupAndSubGroup {
  AnnouncementId: number;
  AnnouncementTitle?: string;
  AnnouncementSubGroups: AnnouncementSubGroupInRelationOfAnnouncementGroup[];
}

export interface AnnouncementSubGroupInRelationOfAnnouncementGroup {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}
