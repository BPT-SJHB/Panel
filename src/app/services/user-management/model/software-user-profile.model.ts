import { Wallet } from 'app/services/wallet-management/model/wallet.model';

export interface SoftwareUserProfile {
  RawSoftwareUser: RawSoftwareUserForProfile;
  MoneyWallet: Wallet;
}

export interface RawSoftwareUserForProfile {
  UserId: number;
  UserName?: string;
  MobileNumber?: string;
  UserTypeId?: number;
  UserActive?: boolean;
  SMSOwnerActive?: boolean;
  UserTypeTitle?: string;
}
