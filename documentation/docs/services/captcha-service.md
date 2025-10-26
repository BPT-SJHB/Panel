---
sidebar_position: 2
---

# CaptchaService

## 🛠 توابع (Methods Overview)

|   (Method Name) نام تابع    | (Description) وظیفه |
| :-------------------------: | :-----------------: |
| [`getCaptcha`](#getcaptcha) | درخواست تصویر کپچا  |

---

## `getCaptcha` 🇫

> دریافت تصویر کپچا برای اعتبارسنجی

### نوع درخواست (Request Type)

`Get`

### 📥 ساختار ورودی (Request Body Structure)

هیچ ورودی مورد نیاز نیست.

### 📤 ساختار خروجی (Expected Response Type)

`<ApiResponse<CaptchaChallenge`

```JSON title="CaptchaChallenge"
{
  sessionId: string;
  imageData: string;
}
```

:::tip ApiResponse

[ساختار ApiResponse چیست؟](../models/api-response.md)

:::

### 🌐 آدرس پایانه مورد استفاده (API Endpoint URL)

```txt title="API_ROUTES.SoftwareUserAPI.CAPTCHA"
[API URL]:81/api/GetCaptcha
```

### 📬 ساختار درخواست (API Request)

بدون بدنه درخواست (GET)

### ✅ ساختار پاسخ (API Response)

```json title="API Response"
{
  "SessionId": string,
  "Captcha": string
}
```

### 🧪 نمونه داده پاسخ (Mock data)

```JSON title="mockCaptcha"
{
  SessionId: 'cb3d7916307b7713875d7cf0fd9639e4a5qddt$oRi2A',
  Captcha:
    'iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAAC+jCIaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVCSURBVHhe7ZqhetwwEITvEQr7KqWFfZ3C0MLAwNDAwMDSwMDA0IOBga7W8bhzm11L8tmWfCeg7//OtlZr7XgkOzncdIfuT2iNl8fj95/d27cfPVOuX5KHlIsa98OSYmI2x7oA1iImZnOsnbJGMTGbY+2ItYuJ2Ryrcu5JTMzmWBVyr2JiNseqhJcgJmZzrIK8NDExm2NtzEsWE7M51ga8FjExr9axUOzU63NZi5jWvk+PV+9YKP4Sk1+bmErmkexYt4rHw6HrdPv9/7wXR9/0GPd46N451s1wHOcHenE9Sr+7e4pL7XE4j+vmiOzcIur76/n8md97yFuf9+Kcm8fSzHKs+4evxTlpSgyxeDwZQivmcxBcajxN6fcYxI5YT8Pxp5AnjrG4uD/npeMuVUSMq/ny6zO3jzDffJz7c37n5rEGsxwLReJie0yN+wCxhmLrycJxuS43bs+Q54fECIV6GI4jDsR1DO7Ax9Gf78fKa6roOeRxhON8SKMVQOeRGr8UsxwLxXgJBZPfelI0Y/Hkuufh6bTEysW0+sd4Oywp1rKK5ZGXG92fx8cyzcWV369//f4xcj49wxzIOB/DnOiHLTVuDSzvWBMifZPJDU2WKy5y8iRDWBOO9aYci8fBceRxsucJeS9R9DFeaJhfjsvnrf61srhjuQxj6GWM+6cUVeLAEU+WFRLcXfitxcT9x42/WpaE2HPKspiSjybH4/7ji8yQH65LjVsDZzmW17yN8BR5ckei8KFpEVtxuCiWOOA43PT1Oj5+4+3Xe5jkYRMn8/Lh45p8XZ8jHiLjodL51c5ZjiVNlhDcLBcuR1y6SF8+OWTGA03RhNh8vI8fcQTPOTxa+bB49G/0g/ON4nXGteLXyizH6pcVZ5L1K3JOXIv8dsQiTo0LspiE+OTA3+GsTxrymzf4/FD1LaPoPD6LrB9nEJF+y0R+yHfu/ZdilmPh5kyGtyNMuLUnsjgZT6j2QrF4IBeRN/D34Zwu8lR8LSZs9FMc2hKRd17HEb5G4tfO2V/ev1DZ91Jx4YRYJrw4LBY+jv767Q/0+sl57CmtL+Cj6ALRj8Wi87MIR+R+fUyjxe6/Ni7nWOHGseEUZ+B+s+IN5O9cur8nCo4/9Z1Mn+d4Qi3qk/7D/fL1evwYR0emxvH4uHX/NTPdscKNYWOtbVvIX9Ct/h5RPP0FHMSyM+6NqPjyOxYfzqL3MD0HcXB89JPzXGTup4sv8xHLw+NJPkSZF2v81LilOe+tcBDPOBkkOmsj7LG/jp5avVHFeLli8uKfLIckKhzX/a3xOQ8tei8Pj7hPi9ppefzU+CWZvccy/6thaHPe3uR66/sYFzH17cti34/EpZv3t0Ie39pj6fxieXjUcUGIWi/D0m8PIpu1xxqdi5q1PKbG6xkKzMWSmHrDHYunqfMRiojNPVNoPD6OW29nQjiK/K2Q++UUW4/PxMMW+1vknHG3YLJjrUVdzNR+S9EbfyzyhNt5/39WqtilxrWY5VhL0SvmVkwdfxRXcDjsIdGs5dGKw8Xe8n553JTrl+ZmjlVicpmlxwc5j62KvvV4wlUdq3QxS4+fwq2LvtV4iztW6WKWHv8cctG3yJ/HS7k+h4s4Vulilh5/LW55X0uLbLZjlS5m6fG35pb3uYTIirwVzuW1iakGzhVZ8e9YMTYx1cMckVXpWE1M9TMmsioci5NsYtofLZEVcywrmcb9E3Xd1LGamK6HqztWE9N1chXHamJqXMyxmpgamWc5VhNTo8dsx2piakxh9V/eG/fJKr+8N+6fzbEaV+Ch+wdKkhv05CZKMwAAAABJRU5ErkJggg==',
}
```

:::tip

چرا از سرویس [APICommunicationManagementService](./api-communication-management.md) استفاده شده است؟

همه درخواست ها در سرویس ها از طریق این سرویس به API ارسال میشوند.
:::

---

## 📚 موارد مرتبط (Related Documentation)

import DocCardList from '@theme/DocCardList';

<DocCardList/>
