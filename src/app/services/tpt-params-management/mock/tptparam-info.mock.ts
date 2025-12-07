import {
  TPTParamRelationToAnnouncementGroupAndSubGroup,
  TPTParamInfo,
} from '../model/tptparam-info.model';

export const mockTPTParamsInfo: TPTParamInfo[] = [
  {
    TPTPId: 1,
    TPTPTitle: 'دو باسکوله (ذوب آهنی)',
  },
  {
    TPTPId: 2,
    TPTPTitle: 'سه باسکوله (ذوب آهنی)',
  },
  {
    TPTPId: 3,
    TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
  },
  {
    TPTPId: 4,
    TPTPTitle: 'شب آخر',
  },
  {
    TPTPId: 5,
    TPTPTitle: 'دو محل بارگیری انبار نزدیک',
  },
  {
    TPTPId: 6,
    TPTPTitle: 'دو محل بارگیری انبار دور',
  },
  {
    TPTPId: 7,
    TPTPTitle: 'کلاف',
  },
  {
    TPTPId: 8,
    TPTPTitle: 'پروژه',
  },
  {
    TPTPId: 9,
    TPTPTitle: 'ذوب و انبار',
  },
  {
    TPTPId: 10,
    TPTPTitle: 'دومحل تخلیه (توافقی)',
  },
  {
    TPTPId: 11,
    TPTPTitle: 'تیرآهن نرمال',
  },
  {
    TPTPId: 12,
    TPTPTitle: 'میلگرد نرمال',
  },
  {
    TPTPId: 13,
    TPTPTitle: 'طرح شهری (روز تخلیه)',
  },
  {
    TPTPId: 14,
    TPTPTitle: 'طرح شهری محل خاص و پروژه  (شب تخلیه)',
  },
  {
    TPTPId: 15,
    TPTPTitle: 'طرح (شهرستان)',
  },
  {
    TPTPId: 16,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک بدون جابجایی)',
  },
  {
    TPTPId: 17,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور بدون جابجایی)',
  },
  {
    TPTPId: 18,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 50%)',
  },
  {
    TPTPId: 19,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 70%)',
  },
  {
    TPTPId: 20,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 50%)',
  },
  {
    TPTPId: 21,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 70%)',
  },
  {
    TPTPId: 22,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (جابجایی 100% = کرایه کامل شهری)',
  },
  {
    TPTPId: 23,
    TPTPTitle:
      'دو محل بارگیری ذوب و انبار (انبار دور با فاصله غیر متعارف = توافق دو صنف)',
  },
  {
    TPTPId: 24,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک بدون جابجایی)',
  },
  {
    TPTPId: 25,
    TPTPTitle: 'دو محل بارگیری انباری (انبار دور بدون جابجایی)',
  },
  {
    TPTPId: 26,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 50%)',
  },
  {
    TPTPId: 27,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 70%)',
  },
  {
    TPTPId: 28,
    TPTPTitle: 'دو محل بارگیری انباری (انبار نزدیک با جابجایی 100%)',
  },
  {
    TPTPId: 29,
    TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 50%)',
  },
  {
    TPTPId: 30,
    TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 70%)',
  },
  {
    TPTPId: 31,
    TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 100%)',
  },
  {
    TPTPId: 32,
    TPTPTitle:
      'دو محل بارگیری انباری (انبار دور با فاصله غیر متعارف = توافق دو صنف)',
  },
];

export const mockTPTParamsRelationToAnnouncementGroupAndSubGroupInfo: TPTParamRelationToAnnouncementGroupAndSubGroup[] =
  [
    {
      TPTPDId: 157,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 7,
      AnnouncementSGTitle:
        'برون شهری آهن آلات ذوبی                                                                             ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 158,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 8,
      AnnouncementSGTitle:
        'برون شهری شمش                                                                                       ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 159,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 9,
      AnnouncementSGTitle:
        'برون شهری صادراتی                                                                                   ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 161,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 14,
      AnnouncementSGTitle:
        'برون شهری آهن آلات انباری                                                                           ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 162,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 15,
      AnnouncementSGTitle:
        'شهری آهن آلات انباری                                                                                ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 160,
      TPTPId: 8,
      TPTPTitle: 'پروژه',
      AnnouncementId: 5,
      AnnouncementTitle:
        'اعلام بار تریلی شهری ذوب و سبا                                                                      ',
      AnnouncementSGId: 12,
      AnnouncementSGTitle:
        'شهری آهن آلات ذوبی                                                                                  ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 166,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 5,
      AnnouncementTitle:
        'اعلام بار تریلی شهری ذوب و سبا                                                                      ',
      AnnouncementSGId: 12,
      AnnouncementSGTitle:
        'شهری آهن آلات ذوبی                                                                                  ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 168,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 15,
      AnnouncementSGTitle:
        'شهری آهن آلات انباری                                                                                ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 167,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 14,
      AnnouncementSGTitle:
        'برون شهری آهن آلات انباری                                                                           ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 165,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 9,
      AnnouncementSGTitle:
        'برون شهری صادراتی                                                                                   ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 164,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 8,
      AnnouncementSGTitle:
        'برون شهری شمش                                                                                       ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 163,
      TPTPId: 11,
      TPTPTitle: 'تیرآهن نرمال',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 7,
      AnnouncementSGTitle:
        'برون شهری آهن آلات ذوبی                                                                             ',
      Cost: 7000000,
      Active: true,
    },
    {
      TPTPDId: 143,
      TPTPId: 3,
      TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 7,
      AnnouncementSGTitle:
        'برون شهری آهن آلات ذوبی                                                                             ',
      Cost: 14000000,
      Active: true,
    },
    {
      TPTPDId: 144,
      TPTPId: 3,
      TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 8,
      AnnouncementSGTitle:
        'برون شهری شمش                                                                                       ',
      Cost: 14000000,
      Active: true,
    },
    {
      TPTPDId: 145,
      TPTPId: 3,
      TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 9,
      AnnouncementSGTitle:
        'برون شهری صادراتی                                                                                   ',
      Cost: 14000000,
      Active: true,
    },
    {
      TPTPDId: 146,
      TPTPId: 3,
      TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
      AnnouncementId: 5,
      AnnouncementTitle:
        'اعلام بار تریلی شهری ذوب و سبا                                                                      ',
      AnnouncementSGId: 12,
      AnnouncementSGTitle:
        'شهری آهن آلات ذوبی                                                                                  ',
      Cost: 14000000,
      Active: true,
    },
    {
      TPTPDId: 138,
      TPTPId: 1,
      TPTPTitle: 'دو باسکوله (ذوب آهنی)',
      AnnouncementId: 5,
      AnnouncementTitle:
        'اعلام بار تریلی شهری ذوب و سبا                                                                      ',
      AnnouncementSGId: 12,
      AnnouncementSGTitle:
        'شهری آهن آلات ذوبی                                                                                  ',
      Cost: 6000000,
      Active: true,
    },
    {
      TPTPDId: 137,
      TPTPId: 1,
      TPTPTitle: 'دو باسکوله (ذوب آهنی)',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 9,
      AnnouncementSGTitle:
        'برون شهری صادراتی                                                                                   ',
      Cost: 6000000,
      Active: true,
    },
    {
      TPTPDId: 136,
      TPTPId: 1,
      TPTPTitle: 'دو باسکوله (ذوب آهنی)',
      AnnouncementId: 2,
      AnnouncementTitle:
        'تريلي برون شهري ذوب و سبا                                                                           ',
      AnnouncementSGId: 8,
      AnnouncementSGTitle:
        'برون شهری شمش                                                                                       ',
      Cost: 6000000,
      Active: true,
    },
    {
      TPTPDId: 288,
      TPTPId: 31,
      TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 100%)',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 14,
      AnnouncementSGTitle:
        'برون شهری آهن آلات انباری                                                                           ',
      Cost: 23000000,
      Active: true,
    },
    {
      TPTPDId: 289,
      TPTPId: 31,
      TPTPTitle: 'دو محل بارگیری انباری (انبار دور با جابجایی 100%)',
      AnnouncementId: 3,
      AnnouncementTitle:
        'اعلام بار انباری                                                                                    ',
      AnnouncementSGId: 15,
      AnnouncementSGTitle:
        'شهری آهن آلات انباری                                                                                ',
      Cost: 23000000,
      Active: true,
    },
  ];
