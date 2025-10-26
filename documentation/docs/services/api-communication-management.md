---
sidebar_position: 1
---

# APICommunicationManagementService

> این سرویس به منظور یک گلوگاه برای ارتباط با API استفاده میشود. این سرویس باعث میشود تا بتوان نمونه داده ها(mockValue) را راحت تر مدیریت کرد، خروجی سرویس ها یک قالب ارور داشته باشند و اگر زمانی نیاز شد تا روش ارتباط با API تغییر کند، پروسه تغییر راحت تر شود.

## 🛠 توابع (Methods Overview)

|                (Method Name) نام تابع                 |    (Description) وظیفه    |
| :---------------------------------------------------: | :-----------------------: |
| [`CommunicateWithAPI_Post`](#communicatewithapi_post) | ارسال درخواست POST به API |
|  [`CommunicateWithAPI_Get`](#communicatewithapi_get)  | ارسال درخواست GET به API  |

---

## `CommunicateWithAPI_Post` 🇫

> هدف اصلی این تابع، ساده‌سازی مدیریت درخواست‌های HTTP و همچنین فراهم کردن امکان شبیه‌سازی (Mocking) پاسخ در محیط‌های غیرتولید است.

> پشتیبانی از Async/Await: با استفاده از firstValueFrom، کد ناهمگام را برای خوانایی بیشتر به شکل سنکرون می‌نویسد.

> مدیریت خطای یکپارچه: تمام خطاها را در یک مکان متمرکز (handleHttpError) مدیریت می‌کند.

### نوع درخواست (Request Type)

`POST`

### 📥 ساختار ورودی (Request Body Structure)

- **url**: string
- **bodyValue**: TBody
- **mockValue?**: TExpect
- **withCredentials**: boolean | false => برای فعال کردن امکان ارسال کوکی باید `true` باشد.

### 📤 ساختار خروجی (Expected Response Type)

`<ApiResponse<TExpect`

:::tip ApiResponse

[ساختار ApiResponse چیست؟](../models/api-response.md)

:::

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

> از متغییر ورودی `url` استفاده میکند.

### 📬 ساختار درخواست (API Request)

> از متغییر `bodyValue` استفاده میشود.

### ✅ ساختار پاسخ (API Response)

> متناسب با `TExpect` از ورودی تابع است.

### 🧪 نمونه داده پاسخ (Mock data)

> از متغییر `mockValue` استفاده میشود.

---

## `CommunicateWithAPI_Get` 🇫

> هدف اصلی این تابع، ساده‌سازی مدیریت درخواست‌های HTTP و همچنین فراهم کردن امکان شبیه‌سازی (Mocking) پاسخ در محیط‌های غیرتولید است.

> پشتیبانی از Async/Await: با استفاده از firstValueFrom، کد ناهمگام را برای خوانایی بیشتر به شکل سنکرون می‌نویسد.

> مدیریت خطای یکپارچه: تمام خطاها را در یک مکان متمرکز (handleHttpError) مدیریت می‌کند.

### نوع درخواست (Request Type)

`GET`

### 📥 ساختار ورودی (Request Body Structure)

- **url**: string
- **mockValue?**: TExpect
- **withCredentials**: boolean | false => برای فعال کردن امکان ارسال کوکی باید `true` باشد.

### 📤 ساختار خروجی (Expected Response Type)

`<ApiResponse<TExpect`

:::tip ApiResponse

[ساختار ApiResponse چیست؟](../models/api-response.md)

:::

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

> از متغییر ورودی `url` استفاده میکند.

### 📬 ساختار درخواست (API Request)

> ساختار درخواست ندارد. (Get Request)

### ✅ ساختار پاسخ (API Response)

> متناسب با `TExpect` از ورودی تابع است.

### 🧪 نمونه داده پاسخ (Mock data)

> از متغییر `mockValue` استفاده میشود.

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
