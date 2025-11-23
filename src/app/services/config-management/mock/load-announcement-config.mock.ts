import { LoadAnnouncementConfig } from '../model/load-announcement-config.model';

export const mockLoadAnnouncementConfigs: LoadAnnouncementConfig[] = [
  {
    COLAId: 1,
    COLAName:
      'LoadAnnounceTimeCycle                                                                               ',
    COLATitle: 'زمانبندی اعلام بار',
    AnnouncementId: 0,
    AnnouncementSGId: 0,
    COLAIndex: 0,
    COLAIndexTitle: 'ساعات',
    Description: 'سیکل های زمانبندی اعلام بار که با نشانه دش از هم جدا شده اند',
    COLAValue: '10:00:00-23:00:00',
  },
  {
    COLAId: 1,
    COLAName:
      'LoadAnnounceTimeCycle                                                                               ',
    COLATitle: 'زمانبندی اعلام بار',
    AnnouncementId: 3,
    AnnouncementSGId: 14,
    COLAIndex: 0,
    COLAIndexTitle: 'ساعات',
    Description: 'اعلام بار انباری برون شهری',
    COLAValue: '11:00:00-10:00:00-12:00:00-14:00:00',
  },
];
