---
sidebar_position: 1
title: TimePickerInput 
---


این یک کامپوننت پیچیده و سطح پایین برای ورود **زمان (Time Picker)** است که از سه کنترل فرم داخلی (ساعت، دقیقه، ثانیه) استفاده می‌کند تا یک مقدار رشته‌ای واحد (به فرمت `HH:MM:SS`) را در کنترل فرم اصلی والد ذخیره کند.

-----

# 🕒 TimePickerInput Component

کامپوننت `TimePickerInput` یک فیلد ورودی سفارشی است که به کاربران اجازه می‌دهد یک زمان را با دقت **ساعت، دقیقه و ثانیه** وارد کنند. این کامپوننت برای نگهداری مقدار زمان به صورت یک رشته واحد با فرمت **`HH:MM:SS`** در یک `FormControl` اصلی طراحی شده و کاملاً با **Reactive Forms** انگولار سازگار است.

از دکمه‌های کنترلی برای افزایش و کاهش مداوم (با نگه داشتن ماوس) هر بخش زمان استفاده شده است.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl<any>` | `new FormControl('')` | **ضروری.** کنترل فرم ری‌اکتیو برای ذخیره مقدار زمان (به صورت رشته `HH:MM:SS`). |
| `validationField` | `ValidationField \| null` | `null` | نام فیلد در شمای اعتبارسنجی برای نمایش پیام‌های خطا. |
| `label` | `string \| undefined` | `undefined` | برچسب متنی که بالای ورودی نمایش داده می‌شود. |
| `readOnly` | `boolean` | `false` | اگر `true` باشد، ورودی فقط قابل مشاهده است. |
| `disabled` | `boolean` | `false` | اگر `true` باشد، کنترل فرم غیرفعال می‌شود و کاربر نمی‌تواند با آن تعامل کند. |

-----

## 🔄 مدیریت منطق و همگام‌سازی

این کامپوننت از سه `FormControl` داخلی (`hour`, `minutes`, `second`) برای مدیریت ورودی‌های مجزا استفاده می‌کند و وظیفه همگام‌سازی دو طرفه (Two-way Sync) را بر عهده دارد:

### ۱. همگام‌سازی Parent → Internal (درون‌گرا)

  * در متد `ngOnInit`، یک سابسکریپشن بر روی `control.valueChanges` ایجاد می‌شود.
  * زمانی که مقدار کنترل والد تغییر می‌کند (مثلاً از طریق `setValue()` برنامه)، متد `updateParentControl` اجرا می‌شود و رشته زمان (`HH:MM:SS`) را به سه قسمت تقسیم کرده و مقادیر را در کنترل‌های داخلی (`hour`, `minutes`, `second`) تنظیم می‌کند.

### ۲. همگام‌سازی Internal → Parent (برون‌گرا)

  * تغییرات در هر یک از کنترل‌های داخلی (ساعت، دقیقه یا ثانیه) باعث فراخوانی متد `updateParentControl()` می‌شود.
  * متد `updateParentControl` مقادیر داخلی را به فرمت **`HH:MM:SS`** درآورده و آن را در کنترل فرم اصلی (`control`) تنظیم می‌کند.
  * از پرچم `isInternalUpdate` برای جلوگیری از به‌روزرسانی‌های بازگشتی (Recursive Updates) در حلقه همگام‌سازی استفاده می‌شود.

### مدیریت محدوده زمانی (`enforceTimeRange`)

برای حفظ اعتبارسنجی زمان، متد `enforceTimeRange` بر روی تغییرات مقادیر اعمال می‌شود تا مطمئن شود:

  * ساعت بین **0 تا 23** است.
  * دقیقه بین **0 تا 59** است.
  * ثانیه بین **0 تا 59** است.

### توابع کنترل زمان (Increment/Decrement)

  * توابع `increment` و `decrement` مقادیر زمان را افزایش یا کاهش می‌دهند و از محدودیت‌های 0 تا Max عبور نمی‌کنند (و در صورت رسیدن به حد، به 0 یا Max برمی‌گردند).
  * متدهای `startContinuousChange` و `stopContinuousChange` امکان تغییر مداوم مقدار با نگه داشتن ماوس بر روی دکمه‌های بالا/پایین را فراهم می‌کنند.

-----

## ⚠️ نمایش خطاها

  * **`firstErrorMessage`:** این Getter اولین خطای اعتبارسنجی موجود در کنترل اصلی (`control.errors`) را با استفاده از شمای اعتبارسنجی (`ValidationSchema`) استخراج کرده و نمایش می‌دهد.

-----

## 🚀 نمونه استفاده (HTML)

```html
<!-- استفاده در یک فرم گروه: -->
<form [formGroup]="myForm">
  <app-time-picker-input
    [control]="myForm.get('startTime')!"
    label="زمان شروع"
    [validationField]="'StartTime'" 
  ></app-time-picker-input>
</form>

<!-- در کامپوننت TypeScript والد -->
// import { TimePickerInput } from '...'; // (اگر standalone نیست)

myForm = new FormGroup({
  startTime: new FormControl('10:30:00', [Validators.required]),
});
```