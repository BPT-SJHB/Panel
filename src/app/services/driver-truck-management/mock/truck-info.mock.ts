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
    TurnId: 13,
    TurnIssueDate: '1404/04/22',
    TurnIssueTime: '21:19:53',
    TruckDriver: ';;;محمد بابائي بندارتي',
    SoftwareUserName:
      'مرتضي شاهمرادي                                                                                      ',
    BillOfLadingNumber: '',
    OtaghdarTurnNumber: 'Z1404/000006',
    TurnStatusTitle: 'فعال',
    TurnStatusDescription: 'صادر شده',
    DateOfLastChanged: '',
    SequentialTurnTitle: 'مرتضي شاهمرادي',
  },
  MoneyWallet: {
    MoneyWalletId: 1,
    MoneyWalletCode: '0000001xsY',
    Balance: 10000000,
  },
};
