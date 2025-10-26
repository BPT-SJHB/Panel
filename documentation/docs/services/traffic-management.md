---
sidebar_position: 4
---

# TrafficServiceManagementService

## شماره پورت

`91`

---

## 🛠 توابع (Methods Overview)

|                (Method Name) نام تابع                 |                  (Description) وظیفه                  |
| :---------------------------------------------------: | :---------------------------------------------------: |
| [`RegisterTrafficCardType`](#registertrafficcardtype) |  برای ایجاد یک نوع جدید از کارت تردد استفاده میشود.   |
|     [`EditTrafficCardType`](#edittrafficcardtype)     |     برای ویرایش اطلاعات کارت تردد استفاده میشود.      |
|     [`GetTrafficCardTypes`](#gettrafficcardtypes)     | برای دریافت لیست همه نوع کارت‌های تردد استفاده میشود. |
| [`GetTrafficCardTempTypes`](#gettrafficcardtemptypes) | برای دریافت لیست همه نوع کارت‌های موقت استفاده میشود. |
|     [`RegisterTrafficCard`](#registertrafficcard)     |        برای ثبت کارت تردد جدید استفاده میشود.         |
|         [`GetTrafficCosts`](#gettrafficcosts)         |  برای دریافت لیست هزینه‌های کارت تردد استفاده میشود.  |
|     [`RegisterTrafficCost`](#registertrafficcost)     |     برای ثبت هزینه جدید کارت تردد استفاده میشود.      |

---

## `RegisterTrafficCardType`🇫

> این تابع برای ایجاد نوع جدیدی از کارت تردد استفاده میشود.

### نوع درخواست (Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
trafficCardTypeName: string
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`ShortResponse`](../models/short-response.md)``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCardType"
[API URL]:91/api/RegisteringTrafficCardType
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  TrafficCardTypeTitle: string
}
```

### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](../models/short-response.md#ساختار-model)

### 🧪 نمونه داده پاسخ (Mock data)

[`mockShortResponse`](../models/short-response.md#نمونه-داده-mock-data)

---

## `EditTrafficCardType`🇫

> برای ویرایش اطلاعات کارت تردد استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
trafficCardTypeInfo: TrafficCardType
```

:::tip
ساختار [TrafficCardType](/documentation/docs/models/traffic-card-type#ساختار-model) چیست؟
:::

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`ShortResponse`](../models/short-response.md)``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCardType"
[API URL]:91/api/RegisteringTrafficCardType
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  RawTrafficCardType: TrafficCardType
}
```

:::tip
ساختار [TrafficCardType](/documentation/docs/models/traffic-card-type#ساختار-model) چیست؟
:::
### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](../models/short-response.md#ساختار-model)

---

## `GetTrafficCardTypes`🇫

> برای دریافت لیست همه نوع کارت‌های تردد استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
{}
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`TrafficCardType`](../models/traffic-card-type.md)`[]>``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.GetTrafficCardTypes"
[API URL]:91/api/GetTrafficCardTypes
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string
}
```

### ✅ ساختار پاسخ (API Response)

[`TrafficCardType`](../models/traffic-card-type.md)[]

### 🧪 نمونه داده پاسخ (Mock data)

[`mockTrafficCardTypes`](../services/traffic-management/mock/traffic-card-type.mock.ts)

---

## `GetTrafficCardTempTypes`🇫

> برای دریافت لیست همه نوع کارت‌های موقت استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
{}
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`TrafficCardTempType`](../models/traffic-card-temp-type.md)`[]>``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.GetTrafficCardTempTypes"
[API URL]:91/api/GetTrafficCardTempTypes
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string
}
```

### ✅ ساختار پاسخ (API Response)

[`TrafficCardTempType`](../models/traffic-card-temp-type.md)[]

### 🧪 نمونه داده پاسخ (Mock data)

[`mockTrafficCardTempTypes`](../services/traffic-management/mock/traffic-card-temp-type.mock.ts)

---

## `RegisterTrafficCard`🇫

> برای ثبت کارت تردد جدید استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
trafficCardNumber: string,
trafficCardTypeId: number,
trafficCardTempTypeId: number
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`ShortResponse`](../models/short-response.md)``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCard"
[API URL]:91/api/RegisterTrafficCard
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  TrafficCardNo: string,
  TrafficCardTypeId: number,
  TrafficCardTempTypeId: number
}
```

### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](/documentation/docs/models/short-response#ساختار-model)
[`ShortResponse`](../models/short-response.md#ساختار-model)

### 🧪 نمونه داده پاسخ (Mock data)

[`mockShortResponse`](../models/short-response.md#نمونه-داده-mock-data)

---

## `GetTrafficCosts`🇫

> برای دریافت لیست هزینه‌های کارت تردد استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
{}
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`TrafficCardTypeCost`](../models/traffic-card-type-cost.md)`[]>``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.GetTrafficCosts"
[API URL]:91/api/GetTrafficCosts
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string
}
```

### ✅ ساختار پاسخ (API Response)

[`TrafficCardTypeCost`](../models/traffic-card-type-cost.md)[]

### 🧪 نمونه داده پاسخ (Mock data)

[`mockTrafficCardTypeCosts`](../services/traffic-management/mock/traffic-card-type-cost.mock.ts)

---

## `RegisterTrafficCost`🇫

> برای ثبت هزینه جدید کارت تردد استفاده میشود.

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
trafficCost: RawTrafficCost
```

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/api-response.md)`<`[`ShortResponse`](../models/short-response.md)``>`

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCost"
[API URL]:91/api/RegisterTrafficCost
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  ...RawTrafficCost
}
```

### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](../models/short-response.md#ساختار-model)

### 🧪 نمونه داده پاسخ (Mock data)

[`mockShortResponse`](../models/short-response.md#نمونه-داده-mock-data)

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
