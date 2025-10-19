---
sidebar_position: 1
title: PasswordInput
---

# 🔑 PasswordInputComponent

کامپوننت `PasswordInputComponent` یک ورودی برای رمز عبور فراهم می‌کند که قابلیت نمایش/عدم نمایش رمز عبور را دارد.  
این کامپوننت از **Reactive Forms** استفاده می‌کند و می‌تواند همراه با **ValidationField** برای اعتبارسنجی فرم‌ها کار کند.



## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | مقدار پیش‌فرض | توضیح |
|-----|-----|----------------|-------|
| `control` | `FormControl` | `new FormControl('')` | کنترل فرم برای ذخیره مقدار رمز عبور. |
| `validationField` | `ValidationField \| null` | `null` | مشخص می‌کند که این فیلد در کدام ValidationSchema اعتبارسنجی شود. |
| `placeholder` | `string` | `'رمز عبور'` | متن پیش‌فرض درون ورودی. |
| `readOnly` | `boolean` | `false` | تعیین می‌کند ورودی فقط خواندنی باشد یا خیر. |
| `disabled` | `boolean` | `false` | تعیین می‌کند ورودی غیرفعال باشد یا خیر. |
| `icon` | `string` | `'pi pi-user'` | آیکون نمایش داده شده در ورودی. |
| `label` | `string` | `''` | برچسب کنار ورودی. |
| `addonWidth` | `string \| null` | `null` | عرض افزودنی ورودی (Add-on). |

---

## ⚡ متدها (Methods)

### `togglePassword(): void`
این متد وضعیت نمایش یا عدم نمایش رمز عبور را تغییر می‌دهد.  
با کلیک روی دکمه چشم در ورودی، مقدار `hidePassword` معکوس می‌شود.

```ts
togglePassword(): void {
  this.hidePassword = !this.hidePassword;
}
````

---

## 🚀 نمونه استفاده

```html
<app-password-input
  [control]="form.get('password')!"
  [placeholder]="'رمز عبور خود را وارد کنید'"
></app-password-input>
```

---

## 📘 نکات مهم

* با کلیک روی آیکون چشم، رمز عبور نمایش داده یا مخفی می‌شود.
* از **Reactive Forms** پشتیبانی می‌کند و می‌توان اعتبارسنجی با ValidationField انجام داد.
* می‌توان ورودی را به صورت **غیرفعال** یا **فقط خواندنی** تنظیم کرد.
