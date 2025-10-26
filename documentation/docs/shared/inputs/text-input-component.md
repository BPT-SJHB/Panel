---
sidebar_postion: 1
title: TextInput
---

# 🧩 TextInputComponent

یک کامپوننت **ورودی چندمنظوره** برای فرم‌ها که به‌طور کامل از **Reactive Forms** انگولار استفاده می‌کند. این کامپوننت ویژگی‌هایی مانند اعتبارسنجی پیشرفته، فرمت‌دهی خودکار (مانند اعداد و پلاک خودرو)، و پشتیبانی از محدودیت‌های زبان (فارسی و انگلیسی) را ارائه می‌دهد.

-----

## 📘 ویژگی‌های کلیدی

`TextInputComponent` برای مدیریت انواع ورودی (متن، عدد، رمز عبور) در محیط‌های چندزبانه طراحی شده است:

  * **پشتیبانی از زبان:** امکان محدود کردن ورودی به زبان فارسی (`fa`)، انگلیسی (`en`)، یا هر دو (`any`).
  * **فرمت‌دهی خودکار:** اعمال فرمت‌های خاص مانند `currency` (جداکننده هزارگان) و `carPlate` (پلاک خودرو).
  * **اعتبارسنجی و خطا:** نمایش پیام‌های خطای فرم بر اساس `ValidationSchema` پروژه.
  * **عناصر جانبی:** پشتیبانی از نمایش آیکن (`icon`)، برچسب (`label`)، و دکمه کناری (`buttonIcon`).
  * **سازگاری بالا:** سازگار با کتابخانه‌های UI محبوب مانند **PrimeNG**.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl` | `new FormControl()` | **ضروری.** کنترل فرم ری‌اکتیو برای اتصال داده. |
| `validationField` | `ValidationField \| null` | `null` | کلید فیلد برای نمایش پیام‌های خطا از **ValidationSchema**. |
| `type` | `'password' \| 'text' \| 'number'` | `'text'` | نوع ورودی (برای حفظ کنترل بر فرمت، `number` نیز به صورت متنی رندر می‌شود). |
| `language` | `'fa' \| 'en' \| 'any'` | `'fa'` | محدودیت زبان کیبورد ورودی. |
| `format` | `'none' \| 'currency' \| 'carPlate'` | `'none'` | نوع فرمت‌دهی خودکار به مقدار ورودی. |
| `placeholder` | `string` | `''` | متن راهنما درون ورودی. |
| `icon` | `string` | `'pi pi-user'` | کلاس آیکن (مثلاً از PrimeIcons) در سمت راست فیلد. |
| `label` | `string` | `''` | برچسب متنی سمت راست فیلد. |
| `buttonIcon` | `string` | `''` | کلاس آیکن دکمه کناری (سمت راست ورودی). |
| `buttonDisabled` | `boolean` | `false` | غیرفعال‌سازی دکمه کناری. |
| `readOnly` | `boolean` | `false` | حالت فقط‌خواندنی. |
| `disabled` | `boolean` | `false` | غیرفعال کردن کنترل (همگام با `control.disable()`). |
| `id` | `string` | `uuidV4()` | شناسه یکتا برای فیلد (بیشتر برای Accessibility). |
| `addonWidth` | `string \| null` | `null` | تعیین عرض بخش addon (برچسب یا آیکن). |

-----

## 📤 رویدادها (Outputs)

| نام | نوع | توضیح |
| :--- | :--- | :--- |
| `clickButton` | `EventEmitter<void>` | کلیک روی دکمه‌ی کناری فیلد. |
| `input` | `EventEmitter<HTMLInputElement>` | تغییر مقدار ورودی. |
| `focus` | `EventEmitter<HTMLInputElement>` | فوکوس روی فیلد. |
| `blur` | `EventEmitter<HTMLInputElement>` | از دست دادن فوکوس. |
| `keydown` | `EventEmitter<KeyboardEvent>` | فشرده شدن کلید در ورودی. |

-----

## 🧠 متدهای داخلی و Lifecycle Hooks

### **Lifecycle Hooks**

| متد | توضیح |
| :--- | :--- |
| `ngOnInit()` | مقداردهی اولیه، تنظیم وضعیت `disabled` کنترل، و ثبت **subscribe** برای تغییرات مقدار (`valueChanges`). |
| `ngOnChanges()` | واکنش به تغییر وضعیت `@Input() disabled` و همگام‌سازی آن با کنترل. |
| `ngOnDestroy()` | **لغو اشتراک** از `valueChanges` جهت جلوگیری از **memory leak**. |

### **ویژگی‌های محاسباتی (Getters)**

  * `firstErrorMessage`: اولین پیام خطای فیلد را برای نمایش زیر ورودی برمی‌گرداند.
  * `isDisabled`: وضعیت غیرفعال‌بودن فیلد را بررسی می‌کند.
  * `getType`: برای ورودی‌های `number`، مقدار `'text'` را برمی‌گرداند تا فرآیند فرمت‌دهی عددی تحت کنترل کامپوننت باشد.

### **متدهای کلیدی (Methods)**

| متد | توضیح |
| :--- | :--- |
| `valueChange($event: Event)` | مدیریت تغییرات مقدار ورودی: **پاک‌سازی** (`sanitizeInput`)، **اعمال فرمت** (`applyFormat`)، و انتشار رویداد `input`. |
| `sanitizeInput(input: HTMLInputElement)` | پاک‌سازی ورودی بر اساس `@Input() language` و `@Input() type`. در صورت ورود کاراکتر غیرمجاز، یک **Toast هشدار** نمایش می‌دهد. |
| `applyFormat(value: string)` | اعمال فرمت‌های `currency` یا `carPlate` و به‌روزرسانی مقدار کنترل. |
| `formatCurrency(value: string)` | جداکننده هزارگان (`,`) را به عدد اضافه می‌کند. |
| `getNumberFromInput(value: string)` | فقط اعداد (فارسی یا انگلیسی) را از رشته استخراج و در صورت لزوم، اعداد فارسی را به انگلیسی تبدیل می‌کند. |

-----

## 💡 نکات استفاده

  * **Reactive Forms:** اتصال `FormControl` به ورودی `control` اجباری است.
  * **کنترل زبان:** در حالت `language='fa'`، اعداد انگلیسی به‌صورت خودکار به فارسی تبدیل می‌شوند و Toast Service در صورت تشخیص زبان کیبورد نامناسب (با تأخیر ۴ ثانیه‌ای برای جلوگیری از تکرار)، هشدار می‌دهد.
  * **نمایش خطا:** برای فعال شدن مکانیسم نمایش خطا، باید مقدار `validationField` را تنظیم کنید.

-----

## 🧱 وابستگی‌ها

  * **@angular/forms:** `Reactive Forms` (برای `FormControl`).
  * **PrimeNG Modules:** `InputGroupModule`, `InputGroupAddonModule`, `MessageModule`, `ButtonModule`.
  * **NgPersianDatepickerModule** (احتمالاً برای ابزارهای مرتبط با فارسی‌سازی).
  * **ToastService** (برای نمایش هشدارهای پاک‌سازی ورودی).

-----

## 🧾 نمونه کد (HTML)

```html
<app-text-input
  [control]="form.controls['username']"
  validationField="username"
  placeholder="نام کاربری"
  icon="pi pi-user"
  label="نام کاربری"
  [language]="'fa'"
  (input)="onInput($event)"
></app-text-input>

<app-text-input
  [control]="form.controls['amount']"
  placeholder="مبلغ پرداختی"
  [type]="'number'"
  [format]="'currency'"
  label="مبلغ"
></app-text-input>
```