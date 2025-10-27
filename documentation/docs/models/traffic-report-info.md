---
sidebar_position: 6
---

# TrafficReportInfo

## ساختار (Model)

```TypeScript title="TrafficReportInfo"
{
  EntryExitId: number;
  EntryShamsiDate: string;
  EntryTime: string;
  EntryTrafficCardNo: string;
  EntrySoftwareUser: string;
  EntryCost: number;
  EntryGateTitle: string;
  ExitShamsiDate: string;
  ExitTime: string;
  ExitTrafficCardNo: string;
  ExitSoftwareUser: string;
  ExitCost: number;
  ExitGateTitle: string;
  FlagA: boolean;
}
```

## نمونه داده (Mock data)

```JSON title="mockTrafficReportInfos"
[
  {
    EntryExitId: 1000,
    EntryShamsiDate: '1404/08/01',
    EntryTime: '00:00:00',
    EntryTrafficCardNo: '0000090BaK',
    EntrySoftwareUser:
      'مرتضي شاهمرادي                                                                                      ',
    EntryCost: 1000,
    EntryGateTitle: 'ورودی تریلی',
    ExitShamsiDate: '1404/08/01',
    ExitTime: '17:00:00',
    ExitTrafficCardNo: '0000090BaK',
    ExitSoftwareUser:
      'مرتضي شاهمرادي                                                                                      ',
    ExitCost: 200,
    ExitGateTitle: 'خروجی تریلی',
    FlagA: true,
  },
]
```

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
