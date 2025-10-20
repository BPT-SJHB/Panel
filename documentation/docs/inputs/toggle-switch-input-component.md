---
sidebar_position: 1
title: ToggleSwitchInput
---

# ⚪ ToggleSwitchInput Component

کامپوننت `ToggleSwitchInputComponent` یک ورودی سوئیچ دو حالته (Toggle Switch) است که برای انتخاب بین دو وضعیت **منطقی (Boolean)**، معمولاً فعال و غیرفعال، استفاده می‌شود. این کامپوننت یک Wrapper برای کامپوننت PrimeNG `p-toggleSwitch` است و قابلیت سفارشی‌سازی استایل و مدیریت حالت **فقط‌خواندنی** را فراهم می‌کند.

-----

## 📘 ویژگی‌های کلیدی

  * **Reactive Forms:** اتصال مستقیم به `FormControl` برای ذخیره مقدار `boolean` (true/false).
  * **سفارشی‌سازی استایل:** تنظیمات داخلی برای ابعاد، رنگ‌ها، و افکت‌ها (مانند سایه) که بر اساس وضعیت سوئیچ به‌روزرسانی می‌شوند.
  * **سایه پویا:** سایه اطراف سوئیچ بر اساس وضعیت فعال/غیرفعال بودن تغییر می‌کند (سبز برای فعال، خاکستری برای غیرفعال).
  * **قابلیت فقط‌خواندنی:** پشتیبانی از حالت `readonly` برای جلوگیری از تعامل کاربر.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl` | `new FormControl(true)` | **ضروری.** کنترل فرم ری‌اکتیو برای مدیریت مقدار (`boolean`). |
| `label` | `string` | `''` | برچسب متنی که کنار سوئیچ نمایش داده می‌شود. |
| `labelWidth` | `string` | `''` | عرض اختصاص داده شده به بخش برچسب. |
| `readonly` | `boolean` | `false` | اگر `true` باشد، کاربر نمی‌تواند وضعیت سوئیچ را تغییر دهد. |

-----

## 🧠 منطق و مدیریت استایل

| متد/ویژگی | توضیح |
| :--- | :--- |
| **`ngOnInit()` / `ngAfterViewInit()`** | متد `ngOnInit` سایه اولیه را تنظیم می‌کند. در `ngAfterViewInit`، به تغییرات `control.valueChanges` سابسکرب می‌شود تا هر بار که مقدار سوئیچ تغییر کرد، متد `setShadowColor` را فراخوانی کند. |
| **`setShadowColor(status: boolean)`** | این متد وضعیت فعال بودن (`status`) را دریافت کرده و متغیر سیگنال `customToggleSwitchTokens` را به‌روزرسانی می‌کند. اگر فعال باشد، سایه فعال (سبز) و در غیر این صورت، سایه غیرفعال (خاکستری) اعمال می‌شود. |
| **`customToggleSwitchTokens`** | یک `signal` که تنظیمات استایل‌های سفارشی (بر اساس PrimeNG) را نگهداری می‌کند و امکان به‌روزرسانی پویا (مثل تغییر سایه) را فراهم می‌سازد. |

-----

## 🚀 نمونه استفاده (HTML)

```html
<app-toggle-switch-input
  [control]="form.get('isActive')!"
  label="وضعیت فعال بودن حساب کاربری"
  labelWidth="15rem"
  [readonly]="isAccountSuspended"
></app-toggle-switch-input>
```

```typescript
// در کامپوننت والد
myForm = new FormGroup({
  isActive: new FormControl(true),
});
```