---
sidebar_position: 13
title: توسعه فرم
---

# 🧩 راهنمای توسعه کامپوننت‌های فرم در Angular



## 🏗️ مقدمه

این سند توضیح می‌دهد که چطور باید **کامپوننت‌های فرم‌محور** در پروژه ساخته شوند تا:

* مدیریت خطا، لودینگ و Toast یکپارچه باشد
* رفتار همه‌ی فرم‌ها مشابه و قابل پیش‌بینی باشد
* منطق درخواست‌ها و اعتبارسنجی‌ها در یک ساختار مشخص و تمیز پیاده شود

---

## ⚙️ کلاس پایه و الگوی لودینگ

تمام کامپوننت‌هایی که شامل عملیات async (مانند ارسال فرم) هستند باید از کلاس پایه‌ی
`BaseLoading`
ارث‌بری کنند.

این کار باعث می‌شود کامپوننت به قابلیت‌های زیر دسترسی داشته باشد:

* `this.toast`: برای نمایش پیام‌ها
* `this.loading()`: سیگنال واکنشی وضعیت لودینگ
* `this.withLoading(fn)`: برای اجرای امن عملیات async و جلوگیری از ارسال‌های تکراری

### نمونه

```ts
this.withLoading(async () => {
  const response = await this.service.SomeApiCall();
  if (!checkAndToastError(response, this.toast)) return;
});
```

**دلیل:**

* جلوگیری از کلیک دوباره و درخواست تکراری
* مدیریت خودکار وضعیت دکمه‌ها هنگام لود
* نمایش پیام خطا یا موفقیت به‌صورت استاندارد

---

## 🔄 جلوگیری از درخواست‌های تکراری

در تمام متدهایی که عملیات async انجام می‌دهند (مثل `createTicket`) باید از `withLoading` استفاده شود:

```ts
if (this.form.invalid || this.loading()) return;

this.withLoading(async () => {
  // عملیات امن
});
```

هیچ‌وقت از متغیرهایی مثل `isLoading` به‌صورت دستی استفاده نکنید.
مدیریت لودینگ باید فقط از طریق `BaseLoading` انجام شود.

---

## 🧱 ساخت فرم با FormBuilder

تمام فرم‌ها باید با `FormBuilder` ساخته شوند و از `ValidationSchema` برای قوانین اعتبارسنجی استفاده کنند.

### نمونه

```ts
private readonly fb = inject(FormBuilder);

readonly form = this.fb.group({
  username: this.fb.control('', ValidationSchema.mobile),
  title: this.fb.control('', ValidationSchema.title),
});
```

**اصول:**

* از `fb` برای ساخت تمام کنترل‌ها استفاده شود
* کنترل‌ها تایپ‌شده باشند (`FormControl<T>`)
* اعتبارسنجی‌ها فقط از `ValidationSchema` خوانده شوند، نه به‌صورت inline

---

## 🧩 متد دسترسی به کنترل‌ها

هر فرم باید متدی داشته باشد تا کنترل‌ها را به‌صورت تایپ‌شده برگرداند:

```ts
ctrl<T>(name: keyof typeof this.form.controls): FormControl<T> {
  return this.form.get(name) as FormControl<T>;
}
```

نمونه‌ی استفاده:

```ts
this.ctrl<string>('username').setValue('09120000000');
```

این روش باعث می‌شود اشتباه تایپی در نام کنترل‌ها رخ ندهد و TypeScript بتواند نوع داده را تشخیص دهد.

---

## 📤 ارسال فرم

الگوی استاندارد ارسال فرم همیشه به این شکل است:

1. بررسی صحت فرم (`invalid`) و وضعیت لودینگ
2. اجرای async درون `withLoading`
3. بررسی پاسخ با `checkAndToastError`
4. ریست یا بروزرسانی فرم پس از موفقیت

### نمونه:

```ts
if (this.form.invalid || this.loading()) return;

this.withLoading(async () => {
  const result = await this.service.Submit(this.form.value);
  if (!checkAndToastError(result, this.toast)) return;
  this.form.reset();
});
```

---

## 🧩 تزریق وابستگی‌ها (Dependency Injection)

از متد `inject()` به‌جای سازنده (constructor) استفاده کنید:

```ts
private readonly router = inject(Router);
private readonly service = inject(SomeService);
```

**مزیت‌ها:**

* سازنده تمیزتر می‌شود
* با کامپوننت‌های standalone سازگار است
* برای ارث‌بری ساده‌تر است

---

## 🧠 استفاده از سیگنال‌ها (Signals)

برای مدیریت وضعیت (state)‌های UI مثل فعال بودن کپچا، لیست‌ها، یا داده‌های موقتی از `signal` و `input` استفاده کنید.

### نمونه

```ts
readonly activeCaptcha = signal<boolean>(false);
readonly ticketTypes = signal<SelectOption[]>([]);
```

در صورت نیاز به واکنش نسبت به تغییر ورودی‌ها، از `effect()` استفاده کنید:

```ts
effect(() => {
  this.ctrl('username').setValue(this.phone());
});
```

---

## 🧮 قوانین اعتبارسنجی (ValidationSchema)

تمام فرم‌ها باید از `ValidationSchema` استفاده کنند:

```ts
this.fb.control('', ValidationSchema.mobile)
```

اگر قانون جدیدی نیاز بود، باید در فایل `validation-schema.ts` اضافه شود، نه داخل خود کامپوننت.
این باعث یکپارچگی در رفتار فرم‌ها می‌شود.

---

## 🧰 مدیریت خطا و Toast

همیشه از توابع کمکی موجود در `app/utils` استفاده کنید.
هرگز به‌صورت دستی `if (!response.success)` ننویسید.

### توابع استاندارد

* ✅ `checkAndToastError(response, this.toast)` → بررسی خطا و نمایش Toast
* ✅ `copyTextAndToast(text, this.toast)` → کپی متن و نمایش Toast موفقیت

---

## 💬 نمایش Toast

از `this.toast` که از `BaseLoading` به ارث رسیده استفاده کنید.
نباید `ToastService` را مستقیماً inject کنید.

هدف: **یکپارچگی ظاهر و رفتار Toast‌ها در تمام کامپوننت‌ها.**

---

## 🔐 کپچا و وضعیت‌های ثانویه

اگر فرم شامل مراحل امنیتی مثل کپچا است، با `signal` کنترل شود:

```ts
readonly activeCaptcha = signal<boolean>(false);
```

در زمان بروز خطای خاص (مثل Unauthorized)، این مقدار باید تغییر کند:

```ts
if (result.error?.code === TicketErrorCodes.Unauthorized) {
  this.activeCaptcha.set(true);
}
```

---

## 🧭 مسیرها و Navigation

برای هدایت کاربر از `Router` به همراه ثابت‌های `APP_ROUTES` استفاده کنید:

```ts
this.router.navigate([APP_ROUTES.TICKET.TRACK], {
  queryParams: { phone: this.trackPhone(), trackingCode: trackCode },
});
```

مسیرها نباید به‌صورت رشته‌ی خام نوشته شوند.

---

## 📦 مدیریت فایل و زیرکامپوننت‌ها

در صورتی که فرم شامل بخش‌هایی مانند آپلود فایل یا کپچا است،
باید از کامپوننت‌های مجزا استفاده شود:

* `TicketFilesUploadComponent`
* `TicketGuardCaptchaFormComponent`

کامپوننت والد فقط وضعیت آن‌ها را با `signal` کنترل کند.

---

## 🧰 ساختار کلی کامپوننت

```
@Component
extends BaseLoading
 ├── inject(): fb, router, services
 ├── define signals: state variables
 ├── define form: fb + ValidationSchema
 ├── ctrl(): form accessor helper
 ├── ngOnInit(): load initial data
 ├── withLoading(): async loaders
 ├── submit handler(): main logic
 ├── helpers(): copy, track, toast
```

---

## ✅ چک‌لیست ساخت فرم جدید

| مورد                | توضیح                                  |
| ------------------- | -------------------------------------- |
| BaseLoading         | ارث‌بری شده باشد                       |
| inject()            | برای تمام وابستگی‌ها استفاده شود       |
| withLoading()       | تمام عملیات async داخل آن اجرا شود     |
| ValidationSchema    | برای تمام کنترل‌ها استفاده شود         |
| FormBuilder         | فرم با `fb` ساخته شود                  |
| ctrl()              | برای دسترسی کنترل‌ها وجود داشته باشد   |
| checkAndToastError  | برای بررسی پاسخ‌ها استفاده شود         |
| signals             | برای stateها استفاده شود               |
| input()             | برای ورودی‌ها استفاده شود              |
| Router + APP_ROUTES | برای ناوبری استفاده شود                |
| Toast               | فقط از `BaseLoading.toast` استفاده شود |
| Captcha/Uploads     | از کامپوننت جداگانه استفاده شود        |

---

## 🧭 فلسفه کلی طراحی فرم‌ها

فرم‌ها باید:

* **مستقل (Self-contained)** باشند
* **واکنشی (Reactive)** باشند نه imperatively
* **اعلامی (Declarative)** باشند تا منطق واضح و ساده بماند
* **یکپارچه (Unified)** باشند از نظر UX، Toast، و لودینگ

---

آیا می‌خواهی در ادامه نسخه‌ی آماده‌ی **الگوی اولیه‌ی ساخت کامپوننت فرم (Template Component)** هم بنویسم؟
یعنی فایلی مثل `form-component-template.ts` که شامل ساختار خالی با `BaseLoading`, `fb`, `signals`, و `withLoading` باشد تا برای ساخت فرم جدید فقط کپی شود؟



```javascript
/**
 * 🧩 قالب استاندارد ساخت کامپوننت‌های فرم در پروژه
 *
 * هدف این فایل:
 *  - جلوگیری از تکرار کد بین فرم‌ها
 *  - حفظ یکپارچگی در Toast، لودینگ، و اعتبارسنجی
 *  - الگوی آماده برای هر فرم جدید (ساخت، ویرایش، ورود، ثبت‌نام، و ...)
 *
 * مراحل استفاده:
 *  1️⃣ فایل را کپی کن و نام کلاس، سلکتور و فایل HTML را تغییر بده.
 *  2️⃣ سرویس مربوط به فرم خودت را inject کن.
 *  3️⃣ فیلدهای فرم را طبق ValidationSchema تنظیم کن.
 *  4️⃣ متد submit را طبق نیاز تغییر بده.
 */

import { Component, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { TextInputComponent } from 'app/components/shared/inputs/text-input/text-input.component';
import { BaseLoading } from 'app/components/shared/component-base/base-loading';
import { checkAndToastError } from 'app/utils/api-utils';
import { ValidationSchema } from 'app/constants/validation-schema';
import { APP_ROUTES } from 'app/constants/routes';
import { ToastService } from 'app/services/toast-service/toast.service'; // از BaseLoading می‌آید، نیازی به inject جدا نیست

@Component({
  selector: 'app-form-template', // ← تغییر نام بر اساس کامپوننت واقعی
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
  templateUrl: './form-template.component.html', // ← فایل HTML مخصوص خودت
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent extends BaseLoading {
  // 🧱 تزریق وابستگی‌ها
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  // private readonly myService = inject(MyService); ← سرویس خودت را اینجا بگذار

  // ⚙️ سیگنال‌ها برای مدیریت state
  readonly title = signal<string>('فرم نمونه');
  readonly successMessage = signal<string | null>(null);

  // 🧾 ساخت فرم با ValidationSchema مرکزی
  readonly form = this.fb.group({
    username: this.fb.control<string>('', ValidationSchema.mobile),
    title: this.fb.control<string>('', ValidationSchema.title),
    description: this.fb.control<string>('', ValidationSchema.description),
  });

  // ⚙️ متد عمومی برای دسترسی به کنترل‌ها
  ctrl<T>(controlName: keyof typeof this.form.controls): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  constructor() {
    super();
    // اگر نیاز به واکنش به تغییرات داشته باشی، از effect استفاده کن:
    effect(() => {
      // مثلا مقدار اولیه را از ورودی‌ها بگیر
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // داده‌های اولیه (مثل dropdownها) را اینجا لود کن
  }

  /**
   * 📤 ارسال فرم
   *  الگوی عمومی برای تمام فرم‌ها:
   *   - بررسی اعتبار و وضعیت لودینگ
   *   - اجرای عملیات async درون withLoading
   *   - مدیریت Toast و خطا با checkAndToastError
   */
  async submit(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.withLoading(async () => {
      const payload = {
        username: this.ctrl<string>('username').value,
        title: this.ctrl<string>('title').value,
        description: this.ctrl<string>('description').value,
      };

      // 🔸 درخواست اصلی به API
      // const response = await this.myService.SubmitForm(payload);
      // if (!checkAndToastError(response, this.toast)) return;

      // 🔹 پس از موفقیت:
      this.successMessage.set('فرم با موفقیت ارسال شد ✅');
      this.form.reset();
    });
  }

  /**
   * 📄 ناوبری (اختیاری)
   * اگر پس از موفقیت نیاز به هدایت کاربر باشد، از APP_ROUTES استفاده کن.
   */
  navigateToList(): void {
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
```