export interface LoadAnnouncementConfig {
  COLAId: number; ////
  COLAName: string;
  COLATitle: string;
  AnnouncementId: number; //
  AnnouncementSGId: number; //
  COLAIndex: number; ////
  COLAIndexTitle: string;
  Description: string;
  COLAValue: string; //
}

export type DeleteInfoOfLoadAnnouncementConfig = Pick<
  LoadAnnouncementConfig,
  'COLAId' | 'COLAIndex' | 'AnnouncementId' | 'AnnouncementSGId'
>;
