export interface RelationOfAnnouncementSubGroupAndProvince {
  ProvinceId: number;
  ProvinceName: string;
  AnnouncementId: number;
  AnnouncementTitle: string;
  AnnouncementSGId: number;
  AnnouncementSGTitle: string;
}

export type RegisterAndDeleteRelationOfAnnouncementSubGroupAndProvinceInfo =
  Pick<
    RelationOfAnnouncementSubGroupAndProvince,
    'ProvinceId' | 'AnnouncementSGId'
  >;
