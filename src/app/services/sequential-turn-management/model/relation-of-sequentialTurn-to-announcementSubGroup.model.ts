export interface RelationOfSequentialTurnToAnnouncementSubGroup {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  AnnouncementSubGroups: announcementSubGroupInRelation[];
}
export interface announcementSubGroupInRelation {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}
