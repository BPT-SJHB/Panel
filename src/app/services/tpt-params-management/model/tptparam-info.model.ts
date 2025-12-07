export interface TPTParamRelationToAnnouncementGroupAndSubGroup {
  TPTPDId: number;
  TPTPId: number;
  TPTPTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  Cost: number;
  Active: boolean;
}

export type TPTParamInfo = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPId' | 'TPTPTitle'
>;

export type RegisterTPTParamInfo = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPTitle'
>;

export type DeleteTPTParamInfo = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPId'
>;

export type RegisterTPTParamRelationToAnnouncementGroupAndSubGroup = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPId' | 'AnnouncementSGId' | 'Cost'
>;

export type EditTPTParamRelationToAnnouncementGroupAndSubGroup = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPDId' | 'TPTPId' | 'AnnouncementSGId' | 'Cost' | 'Active'
>;
