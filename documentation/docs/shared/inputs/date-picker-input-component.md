---
sidebar_postion: 1
title: DatePickerInput
--- 

# 📅 DatePickerInput Component

کامپوننت `DatePickerInput` یک **ورودی انتخاب تاریخ شمسی (Jalali)** است که با استفاده از کتابخانه **ng-persian-datepicker** ساخته شده است. این کامپوننت به‌طور کامل از **Reactive Forms** انگولار پشتیبانی می‌کند.

-----

## 📘 ویژگی‌های کلیدی

  * **تقویم شمسی (Jalali):** استفاده از `ng-persian-datepicker` برای ارائه یک تجربه بومی.
  * **Reactive Forms:** اتصال مستقیم به `FormControl` انگولار.
  * **وضعیت‌ها:** مدیریت آسان حالت‌های **فعال/غیرفعال** (`disabled`) و **فقط‌خواندنی** (`readOnly`).
  * **اعتبارسنجی:** نمایش پیام‌های خطای فرم بر اساس `ValidationSchema` پروژه.
  * **سفارشی‌سازی:** قابلیت تغییر آیکون و موقعیت نمایش تقویم (`top` یا `bottom`).

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl<unknown>` | `new FormControl('')` | **ضروری.** کنترل فرم ری‌اکتیو برای اتصال داده. |
| `validationField` | `ValidationField \| null` | `null` | نوع فیلد برای نمایش پیام‌های خطا از **ValidationSchema**. |
| `placeholder` | `string` | `''` | متن راهنما درون فیلد. |
| `icon` | `string` | `'pi pi-calendar'` | کلاس آیکون (مثلاً از PrimeIcons) در سمت راست فیلد. |
| `label` | `string` | `''` | برچسب متنی فیلد. |
| `datePickerPosition` | `'top' \| 'bottom'` | `'bottom'` | موقعیت باز شدن تقویم نسبت به ورودی. |
| `readOnly` | `boolean` | `false` | فیلد را فقط‌خواندنی می‌کند. |
| `disabled` | `boolean` | `false` | غیرفعال کردن کنترل. |
| `addonWidth` | `string \| null` | `null` | عرض بخش آیکون یا Addon. |

-----

## 💡 متدهای کلیدی و Lifecycle

کامپوننت از متدهای Lifecycle برای همگام‌سازی وضعیت `disabled` با `FormControl` استفاده می‌کند:

  * **`ngOnInit()` / `ngOnChanges()`:** برای تنظیم وضعیت `disabled` کنترل در شروع و هنگام تغییر ورودی.
  * **`setDisabledState()`:** تنظیم فعال/غیرفعال بودن کنترل بدون ارسال رویداد اضافی به انگولار.
  * **`onBlurInput()`:** در صورت `readOnly` بودن فیلد، آن را به حالت `markAsUntouched` برمی‌گرداند تا اعتبار سنجی‌های غیرضروری اجرا نشوند.
  * **`firstErrorMessage` (Getter):** اولین پیام خطا را بر اساس `ValidationSchema` پروژه استخراج می‌کند.

-----

## 🚀 نمونه استفاده (HTML)

برای استفاده از این کامپوننت در فرم‌های واکنشی، کافی است `FormControl` مربوطه و `validationField` را به آن ارسال کنید:

```html
<app-date-picker-input
  [control]="form.get('birthDate')!"
  label="تاریخ تولد"
  placeholder="انتخاب تاریخ"
  validationField="birthDate"
  [disabled]="false"
  datePickerPosition="top"
></app-date-picker-input>
```

-----

## 📘 نکات توسعه

  * **وابستگی‌ها:** برای تقویم از `ng-persian-datepicker` و برای استایلینگ ورودی و پیام‌های خطا از **PrimeNG** استفاده شده است.
  * **اعتبارسنجی:** پیام‌های خطا از طریق `validationField` و با ارجاع به **ValidationSchema** پروژه مدیریت می‌شوند.
  * **ReactiveForms:** سازگاری کامل با متدهای `disable()` و `enable()` کنترل فرم.
