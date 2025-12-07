import { SoftwareUserProfile } from '../model/software-user-profile.model';

export const mockSoftwareUserProfile: SoftwareUserProfile = {
  RawSoftwareUser: {
    UserId: 21,
    UserName: 'مرتضي شاهمرادي',
    MobileNumber: '09132043148',
    UserTypeId: 2,
    UserActive: true,
    SMSOwnerActive: true,
    UserTypeTitle: 'ادمین سیستم',
  },
  MoneyWallet: {
    MoneyWalletId: 1,
    MoneyWalletCode: '0000001Ur1',
    Balance: 99999999,
  },
};
