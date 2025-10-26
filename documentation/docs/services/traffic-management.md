---
sidebar_position: 4
---

# TrafficServiceManagementService

## شماره پورت

`91`

---

## 🛠 توابع (Methods Overview)

|                (Method Name) نام تابع                 |                (Description) وظیفه                 |
| :---------------------------------------------------: | :------------------------------------------------: |
| [`RegisterTrafficCardType`](#registertrafficcardtype) | برای ایجاد یک نوع جدید از کارت تردد استفاده میشود. |
|     [`EditTrafficCardType`](#edittrafficcardtype)     |    برای ویرایش اطلاعات کارت تردد استفاده میشود.    |

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

`<`[`ApiResponse`](../models/api-response.md)`<`[`ShortResponse`](../models/short-response.md)

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCardType"
[API URL]:91/api/RegisteringTrafficCardType
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  RawTrafficCardType: TrafficCardType,
}
```

:::tip
ساختار [TrafficCardType](../models/traffic-card-type.md) چیست؟
:::

### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](../models/short-response.md#ساختار-model)

### 🧪 نمونه داده پاسخ (Mock data)

[`mockShortResponse`](../models/short-response.md#نمونه-داده-mock-data)

:::tip
چرا از سرویس [APICommunicationManagementService](./api-communication-management.md) استفاده شده است؟

همه درخواست ها در سرویس ها از طریق این سرویس به API ارسال میشوند.
:::

---

## `EditTrafficCardType`🇫

>

### نوع درخواست (HTTP Request Type)

`POST`

### 📥 ساختار ورودی تابع (Method Input)

```TypeScript
trafficCardTypeInfo: TrafficCardType
```

:::tip
ساختار [TrafficCardType](/documentation/docs/models/traffic-card-type.md#ساختار-model) چیست؟
:::

### 📤 ساختار خروجی تابع(Method Output)

`<`[`ApiResponse`](../models/short-response.md)`<`[`ShortResponse`](../models/short-response.md)

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.TrafficAPI.RegisterTrafficCardType"
[API URL]:91/api/RegisteringTrafficCardType
```

### 📬 ساختار درخواست (API Request)

```JSON
{
  SessionId: string,
  RawTrafficCardType: TrafficCardType,
}
```

:::tip
ساختار [TrafficCardType](/documentation/docs/models/traffic-card-type.md#ساختار-model) چیست؟
:::

### ✅ ساختار پاسخ (API Response)

[`ShortResponse`](/documentation/docs/models/short-response.md#ساختار-model)

### 🧪 نمونه داده پاسخ (Mock data)

[`mockShortResponse`](../models/short-response.md#نمونه-داده-mock-data)

:::tip

چرا از سرویس [APICommunicationManagementService](./api-communication-management.md) استفاده شده است؟

همه درخواست ها در سرویس ها از طریق این سرویس به API ارسال میشوند.
:::

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
