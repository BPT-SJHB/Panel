import { TruckComposedInfo, TruckInfo } from '../model/truck-info.model';

export const mockTruckInfo: TruckInfo = {
  TruckId: 5,
  LoaderTypeId: 605,
  Pelak: '673ع32',
  Serial: '52',
  SmartCardNo: '2305365',
};

export const mockTruckComposedInfo: TruckComposedInfo = {
  Truck: {
    TruckId: 2,
    LoaderTypeId: 505,
    Pelak: '451ع22',
    Serial: '13',
    SmartCardNo: '2305364',
  },
  TruckDriver: {
    DriverId: 1,
    NameFamily: ';محمد;عباسي',
    NationalCode: '5759871382',
    MobileNumber: '09131210201',
    FatherName: 'قياقلي',
    DrivingLicenseNo: '4010300402',
    Address: '',
    SmartCardNo: '1228050',
  },
  Turn: {
    nEnterExitId: 1,
    TruckId: 2,
    LicensePlate: '451ع22-13',
    EnterDate: '1404/03/11',
    EnterTime: '00:00:00',
    TruckDriver: ';محمد;عباسي',
    UserName: 'مرتضي شاهمرادي',
    BillOfLadingNumber: '1404/1/12',
    OtaghdarTurnNumber: 'T1404/00001',
    TurnStatusTitle: 'فعال',
  },
  MoneyWallet: {
    MoneyWalletId: 1,
    MoneyWalletCode: '0000001xsY',
    Balance: 10000000,
  },
};
