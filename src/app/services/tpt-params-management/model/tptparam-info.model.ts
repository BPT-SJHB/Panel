import z from 'zod';

export interface TPTParamRelationToAnnouncementGroupAndSubGroup {
  TPTPDId: number;
  TPTPId: number;
  TPTPTitle: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
  Cost: number;
  Active: boolean;
}

export const zodTPTParamRelationToAnnouncementGroupAndSubGroup = z.object({
  TPTPDId: z.number(),
  TPTPId: z.number(),
  TPTPTitle: z.string(),
  AnnouncementId: z.number(),
  AnnouncementTitle: z.string(),
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string(),
  Cost: z.number(),
  Active: z.boolean(),
});

export type TPTParamInfo = Pick<
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  'TPTPId' | 'TPTPTitle'
>;

export const zodTPTParamInfo = z.object({
  TPTPId: z.number(),
  TPTPTitle: z.string(),
});

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
