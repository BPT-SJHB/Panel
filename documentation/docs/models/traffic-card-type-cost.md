---
sidebar_position: 5
---

# TrafficCardTypeCost

## ساختار (Model)

```JSON title="TrafficCardTypeCost" 
{
  TrafficCardTypeId: number;
  EntryBaseCost: number;
  NoCostStoppageDuration: number;
  ExcessStoppageDuration: number;
  ExcessStoppageCost: number;
}
```

## نمونه داده (Mock data)

```JSON title="mockTrafficCardTypeCosts"
[
  {
    TrafficCardTypeId: 1,
    EntryBaseCost: 100000,
    NoCostStoppageDuration: 24,
    ExcessStoppageDuration: 24,
    ExcessStoppageCost: 50000,
  },
  {
    TrafficCardTypeId: 2,
    EntryBaseCost: 400000,
    NoCostStoppageDuration: 48,
    ExcessStoppageDuration: 24,
    ExcessStoppageCost: 110000,
  },
]
```

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>