export interface RelationOfSequentialTurnToAnnouncementSubGroup {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  AnnouncementSubGroups: announcementSubGroupInRelationOfSequentialTurn[];
}
export interface announcementSubGroupInRelationOfSequentialTurn {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}
