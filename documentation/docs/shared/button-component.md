---
sidebar_position: 13
title: Button
---

# 🔘 Button Component

کامپوننت `ButtonComponent` یک دکمه UI با قابلیت سفارشی‌سازی بالا است که بر پایه **Angular Signals** و **Tailwind CSS** طراحی شده است. این کامپوننت جلوه‌های بصری حرفه‌ای مانند **گرادیان‌های رنگی زیبا** و **سایه‌های پویا (Shadow Sync)** را برای هر سطح اهمیت (Severity) پیاده‌سازی می‌کند.

---

## ⚙️ ورودی‌ها (Inputs) و خروجی‌ها (Outputs)

تمام ورودی‌های این کامپوننت با استفاده از توابع `input()` انگولار تعریف شده‌اند.

| نام           | نوع                              | پیش‌فرض     | توضیح                                                                                                          |
| :------------ | :------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| `severity`    | `ButtonSeverity`                 | `'green'`   | سطح اهمیت یا رنگ دکمه: `primary`, `green`, `info`, `danger`, `warn`, `secondary`, `disabled`.                  |
| `label`       | `string`                         | `''`        | متن نمایش داده شده روی دکمه.                                                                                   |
| `size`        | `'small' \| 'large' \| 'normal'` | `'normal'`  | اندازه دکمه.                                                                                                   |
| `icon`        | `string`                         | `undefined` | کلاس آیکون (مانند کلاس‌های PrimeIcons).                                                                        |
| `disabled`    | `boolean`                        | `false`     | اگر `true` باشد، دکمه غیرفعال می‌شود و استایل `disabled` می‌گیرد.                                              |
| `shadow`      | `boolean`                        | `true`      | اگر `true` باشد، سایه به دکمه اضافه می‌شود.                                                                    |
| `syncShadow`  | `boolean`                        | `true`      | اگر `true` باشد، سایه رنگ دکمه را دنبال می‌کند (Shadow Sync). در غیر این صورت، از سایه پیش‌فرض استفاده می‌شود. |
| `styleClass`  | `string`                         | `''`        | کلاس‌های CSS اضافی برای استایل‌دهی بیشتر.                                                                      |
| `rounded`     | `boolean`                        | `false`     | (PrimeNG) دکمه را کاملاً گرد می‌کند.                                                                           |
| `raised`      | `boolean`                        | `false`     | (PrimeNG) دکمه را به‌صورت برجسته نمایش می‌دهد.                                                                 |
| **`onClick`** | `output<void>`                   |             | **خروجی.** هنگام کلیک کردن روی دکمه (در صورت فعال بودن) صادر می‌شود.                                           |

---

## 🎨 ساختار استایل‌دهی

تمامی استایل‌ها (شامل گرادیان‌ها، سایه‌ها و انیمیشن‌ها) به صورت ساختاریافته در آبجکت `style` تعریف شده‌اند و از متدهای سیگنال برای اعمال پویا استفاده می‌کنند.

### ۱. رنگ‌ها و گرادیان‌ها (`colors`)

برای هر `severity`، یک شیء رنگ تعریف شده که شامل گرادیان Tailwind (با پشتیبانی از حالت تاریک **`dark:`**) و دو نوع سایه است:

- **`gradient`**: کلاس‌های Tailwind برای اعمال گرادیان از بالا به پایین (e.g., `from-teal-500 to-emerald-700`).
- **`shadow.sync`**: یک سایه قوی که دقیقاً رنگ دکمه را منعکس می‌کند (e.g., `shadow-[...theme(colors.emerald.700)]`).
- **`shadow.normal`**: یک سایه عمومی‌تر و ملایم.

### ۲. انیمیشن و تعامل (`animation`)

کلاس‌های انیمیشن شامل:

- **`hover:scale-105`**: دکمه هنگام نگه داشتن ماوس کمی بزرگ‌تر می‌شود.
- **`active:translate-y-0.5 active:scale-95`**: دکمه هنگام کلیک شدن یک حس فشار (Press Effect) می‌دهد.

### ۳. مدیریت کلاس پویا (`styleHandler`)

- متد `styleHandler()` وظیفه اصلی ساخت کلاس‌های CSS نهایی برای دکمه را بر عهده دارد.
- این متد در `ngOnInit` و هنگام تغییر ورودی `disabled` در `ngOnChanges` اجرا می‌شود.
- بر اساس ورودی `disabled` و `severity`، ترکیب مناسبی از کلاس‌های اندازه، گرادیان و سایه انتخاب شده و به سیگنال `this.class` اختصاص می‌یابد.
- اگر دکمه `disabled` باشد، استایل و سایه `disabled` اعمال می‌شود و انیمیشن‌های تعاملی حذف می‌شوند.

---

## 🚀 نمونه استفاده (HTML)

```html
<div class="flex flex-col gap-4">
  <!-- دکمه پیش فرض: رنگ سبز، سایه سینک شده -->
  <app-button
    [label]="'ثبت سفارش'"
    [severity]="'green'"
    (onClick)="submitOrder()"
    [size]="'large'"
  ></app-button>

  <!-- دکمه هشدار: اندازه کوچک، سایه ثابت (normal) -->
  <app-button
    [label]="'اعمال فیلتر'"
    [severity]="'warn'"
    [size]="'small'"
    [syncShadow]="false"
    [icon]="'pi pi-search'"
  ></app-button>

  <!-- دکمه غیرفعال -->
  <app-button
    [label]="'دسترسی مسدود است'"
    [severity]="'danger'"
    [disabled]="true"
    [size]="'normal'"
  ></app-button>
</div>
```
