---
sidebar_position: 1
title: CheckboxInput
---


# ✅ CheckboxInputComponent
کامپوننت `CheckboxInputComponent` یک ورودی نوع **چک‌باکس** ارائه می‌دهد که به‌طور کامل از **Reactive Forms** انگولار پشتیبانی می‌کند. این کامپوننت برای جمع‌آوری ورودی‌های منطقی (بله/خیر) در فرم‌ها طراحی شده است.

-----

## 📘 ویژگی‌های کلیدی

  * **Reactive Forms:** اتصال مستقیم به `FormControl` برای مدیریت مقدار **`boolean`** (true/false).
  * **مدیریت وضعیت:** پشتیبانی از حالت‌های **غیرفعال** (`disabled`) و **فقط‌خواندنی** (`readOnly`).
  * **سفارشی‌سازی:** امکان تعیین برچسب (`label`) و شناسه HTML (`inputId`).

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl` | `new FormControl(false)` | **ضروری.** کنترل فرم ری‌اکتیو برای ذخیره مقدار (Boolean). |
| `label` | `string` | `''` | برچسب متنی کنار چک‌باکس. |
| `readOnly` | `boolean` | `false` | اگر `true` باشد، کاربر نمی‌تواند وضعیت چک‌باکس را تغییر دهد. |
| `disabled` | `boolean` | `false` | اگر `true` باشد، چک‌باکس غیرفعال خواهد بود. |
| `inputId` | `string` | `'checkbox-input'` | شناسه‌ی HTML ورودی، مفید برای Accessibility. |

-----

## 🧠 متدهای داخلی و Lifecycle

این کامپوننت از متدهای Lifecycle برای همگام‌سازی وضعیت ورودی با کنترل فرم استفاده می‌کند:

  * **`ngOnInit()` / `ngOnChanges()`:** تنظیم وضعیت `disabled` کنترل در زمان بارگذاری و هنگام تغییر ورودی `@Input() disabled`.
  * **`setDisabledState()`:** متدی داخلی که وضعیت فعال یا غیرفعال بودن `control` را تنظیم می‌کند تا با UI همگام باشد.

-----

## 🚀 نمونه استفاده (HTML)

برای استفاده از این کامپوننت در فرم‌های واکنشی، کافی است `FormControl` مربوطه را به آن ارسال کنید:

```html
<app-checkbox-input
  [control]="form.get('agree')!"
  [label]="'موافقت با شرایط و مقررات'"
  [readOnly]="!isUserAuthenticated"
></app-checkbox-input>
```

-----

## 📘 نکات توسعه

  * **وابستگی‌ها:** این کامپوننت احتمالاً از کامپوننت چک‌باکس **PrimeNG** (با سینتکس `<p-checkbox>`) استفاده می‌کند، همانطور که در مثال قالب دیده می‌شود.
  * **کنترل وضعیت:** وضعیت نهایی غیرفعال بودن (در قالب)، با ترکیب `[disabled]="disabled || readOnly"` تعیین می‌شود.
  * **Reactive Forms:** مقدار چک‌باکس (Boolean) به‌طور مستقیم در `FormControl` مربوطه قابل رصد و کنترل است.