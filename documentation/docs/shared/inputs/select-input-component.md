---
sidebar_position: 1
title: SelectInput
---


# 🔽 SelectInput Component

کامپوننت `SelectInputComponent` یک ورودی نوع **انتخاب (Dropdown)** است که برای انتخاب یک مقدار از میان لیستی از گزینه‌ها طراحی شده است. این کامپوننت به‌طور کامل از **Reactive Forms** انگولار پشتیبانی می‌کند و با کامپوننت‌های **PrimeNG** ساخته شده است.

-----

## 📘 ویژگی‌های کلیدی

  * **Reactive Forms:** اتصال مستقیم به `FormControl` برای مدیریت مقدار انتخاب شده.
  * **ورودی‌های ساده:** دریافت گزینه‌ها در قالب آرایه‌ای از `{ label: string, value: T }`.
  * **مدیریت وضعیت:** پشتیبانی از حالت‌های **غیرفعال** (`disabled`) و **فقط‌خواندنی** (`readOnly`).
  * **سفارشی‌سازی UI:** قابلیت تنظیم آیکون، برچسب، و متن Placeholder.
  * **نوع عمومی (Generic):** استفاده از نوع عمومی `<T>` برای سازگاری با انواع مختلف داده در `value`.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl<T \| null>` | `new FormControl(null)` | **ضروری.** کنترل فرم ری‌اکتیو برای ذخیره مقدار انتخاب شده. |
| `options` | `{ label: string; value: T }[]` | `[]` | لیست گزینه‌های در دسترس برای انتخاب. |
| `placeholder` | `string` | `''` | متن راهنما درون ورودی. |
| `icon` | `string` | `'pi pi-user'` | کلاس آیکون نمایش داده شده در سمت راست ورودی. |
| `label` | `string` | `''` | برچسب متنی کنار ورودی. |
| `readOnly` | `boolean` | `false` | اگر `true` باشد، کاربر نمی‌تواند وضعیت را تغییر دهد. |
| `disabled` | `boolean` | `false` | اگر `true` باشد، کنترل فرم غیرفعال خواهد بود. |
| `addonWidth` | `string \| null` | `null` | عرض بخش آیکون یا Addon. |

-----

## 🧠 منطق و متدها

| متد/ویژگی | توضیح |
| :--- | :--- |
| **`ngOnInit()` / `ngOnChanges()`** | فراخوانی `setDisabledState` در زمان بارگذاری و هنگام تغییر ورودی `@Input() disabled` برای همگام‌سازی وضعیت کنترل. |
| **`setDisabledState()`** | تنظیم فعال/غیرفعال بودن `control` بدون ارسال رویداد تغییر. |
| **`onFocusInput()`** | جلوگیری از فوکوس روی فیلد اگر کنترل غیرفعال باشد. |
| **`onBlurInput()`** | اگر فیلد در حالت `readOnly` باشد، آن را به حالت `markAsUntouched` برمی‌گرداند. |
| **`compareFn(o1: any, o2: any)`** | متد مقایسه‌گر برای کامپوننت انتخاب PrimeNG، که برابری ساده مقادیر را بررسی می‌کند. |

-----

## 🚀 نمونه استفاده (HTML)

برای استفاده از این کامپوننت، باید یک آرایه از گزینه‌ها و `FormControl` مربوطه را به آن ارسال کنید.

```html
<app-select-input
  [control]="form.get('cityId')!"
  placeholder="انتخاب شهر"
  icon="pi pi-map-marker"
  label="شهر"
  [options]="citiesList"
  [disabled]="isFormLocked"
></app-select-input>
```

```typescript
// در کامپوننت والد
citiesList = [
  { label: 'تهران', value: 1 },
  { label: 'اصفهان', value: 2 },
  { label: 'مشهد', value: 3 },
];
// ... form = new FormGroup({ cityId: new FormControl<number | null>(null) });
```

-----

## 📘 نکات توسعه

  * **وابستگی‌ها:** این کامپوننت از `SelectModule` (PrimeNG Dropdown) برای نمایش لیست گزینه‌ها استفاده می‌کند.
  * **نوع عمومی:** استفاده از `<T>` تضمین می‌کند که نوع داده ذخیره شده در `FormControl` و `value` گزینه‌ها با هم تطابق دارند.
  * **همگام‌سازی:** مدیریت دقیق وضعیت‌های `disabled` و `readOnly` از طریق متدهای Lifecycle تضمین می‌کند که وضعیت UI با وضعیت `FormControl` همواره هماهنگ است.
