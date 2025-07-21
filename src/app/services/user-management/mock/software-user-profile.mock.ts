import { SoftwareUserProfile } from '../model/software-user-profile.model';

export const mockSoftwareUserProfile: SoftwareUserProfile = {
  RawSoftwareUser: {
    UserId: 7003,
    UserName: 'حسن;عباسي',
    MobileNumber: '09133155865',
    UserTypeId: 3,
    UserActive: true,
    SMSOwnerActive: false,
    UserTypeTitle: 'راننده',
  },
  MoneyWallet: {
    MoneyWalletId: 1,
    MoneyWalletCode: '0000001xsY',
    Balance: 10000000,
  },
};
