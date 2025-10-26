---
sidebar_position: 1
title: CaptchaInput
---


# 🔐 CaptchaInputComponent

کامپوننت `CaptchaInputComponent` برای نمایش و به‌روزرسانی تصاویر کپچا در فرم‌ها استفاده می‌شود.  
این کامپوننت از **دو حالت سرویس** (`default` و `ticket`) پشتیبانی می‌کند و هنگام شروع و یا رفرش، تصویر جدید کپچا را دریافت می‌کند.  
این کامپوننت با **Reactive Forms** یکپارچه است و می‌توان متن کپچا و شناسه جلسه (session ID) را در فرم ذخیره کرد.



## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | مقدار پیش‌فرض | توضیح |
|-----|-----|----------------|-------|
| `captchaServiceType` | `'default' \| 'ticket'` | `'default'` | مشخص می‌کند از کدام سرویس کپچا استفاده شود. |
| `sessionIdControl` | `FormControl` | `new FormControl('')` | نگهداری شناسه جلسه کپچا. |
| `captchaInputControl` | `FormControl` | `new FormControl('')` | نگهداری متن وارد شده توسط کاربر برای کپچا. |

---

## 🧠 چرخه حیات (Lifecycle)

### `ngOnInit(): void`
این متد هنگام **ایجاد کامپوننت** اجرا می‌شود و بلافاصله یک تصویر کپچا دریافت می‌کند.

```ts
ngOnInit(): void {
  this.getCaptchaInformation();
}
```

## نمونه استفاده
```html
<app-password-input
  [control]="form.get('password')!"
  [placeholder]="'رمز عبور خود را وارد کنید'"
></app-password-input>
```


## 📘 نکات مهم

* با کلیک روی آیکون چشم، رمز عبور نمایش داده یا مخفی می‌شود.
* از **Reactive Forms** پشتیبانی می‌کند و می‌توان اعتبارسنجی با ValidationField انجام داد.
* می‌توان ورودی را به صورت **غیرفعال** یا **فقط خواندنی** تنظیم کرد.