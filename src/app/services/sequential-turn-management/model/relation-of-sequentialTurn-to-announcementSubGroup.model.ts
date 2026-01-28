import z from 'zod';

export interface announcementSubGroupInRelationOfSequentialTurn {
  AnnouncementSGId: number;
  AnnouncementSGTitle?: string;
}

export const zodAnnouncementSubGroupInRelationOfSequentialTurn = z.object({
  AnnouncementSGId: z.number(),
  AnnouncementSGTitle: z.string().optional(),
});

export interface RelationOfSequentialTurnToAnnouncementSubGroup {
  SeqTurnId: number;
  SeqTurnTitle?: string;
  AnnouncementSubGroups: announcementSubGroupInRelationOfSequentialTurn[];
}

export const zodRelationOfSequentialTurnToAnnouncementSubGroup = z.object({
  SeqTurnId: z.number(),
  SeqTurnTitle: z.string().optional(),
  AnnouncementSubGroups: z.array(
    zodAnnouncementSubGroupInRelationOfSequentialTurn
  ),
});
