---
sidebar_position: 7
---

# TrafficInfo

## ساختار (Model)

```TypeScript title="TrafficInfo"
{
  EntryExit: string;
  EntryExitColor: string;
  TrafficPicture: string | null;
  MoneyWallet: Wallet;
  TrafficStoppageCost: number;
  Payable: number;
}
```

- EntryExit => "Entry" | "Exit"
- EntryExitColor => "Red" | "Green"
- MoneyWallet => کیف پول کاربر
- Payable => مبلغ قابل پرداخت
- TrafficPicture => تصویر تردد
- TrafficStoppageCost => هزینه تردد و توقف

## نمونه داده (Mock data)

```JSON title="mockTrafficInfo"
{
  EntryExit: 'Entry',
  EntryExitColor: 'Red',
  TrafficPicture: null,
  MoneyWallet: {
    MoneyWalletId: 90,
    MoneyWalletCode: '0000090BaK',
    Balance: 0,
  },
  TrafficStoppageCost: 1010,
  Payable: 10,
}
```

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
