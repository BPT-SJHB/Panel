---
sidebar_position: 1
title: شروع کار
---

## مقدمه
این سند برای توسعه‌دهندگان سامانه تهیه شده و شامل آموزش‌ها و توضیحات لازم برای شروع برنامه‌نویسی و توسعه پروژه است.

سامانه از **Angular نسخه 20** و **PrimeNG نسخه 20** استفاده می‌کند و امکان ایجاد رابط کاربری مدرن، تعاملی و واکنش‌گرا را فراهم می‌کند.

---

## پیش‌نیازها

قبل از شروع، باید ابزارهای زیر روی سیستم شما نصب باشند:

### 1. Node.js
نسخه 18 یا بالاتر توصیه می‌شود.  
بررسی نسخه:

<div class="ltr">
```bash
node -v
````

</div>

### 2. npm یا Yarn

npm به صورت پیش‌فرض با Node.js نصب می‌شود.
بررسی نسخه:

<div class="ltr">
```bash
npm -v
```
</div>

### 3. Angular CLI

برای مدیریت پروژه‌های Angular لازم است.
نصب:

<div class="ltr">
```bash
npm install -g @angular/cli
```
</div>

بررسی نسخه:

<div class="ltr">
```bash
ng version
```
</div>

---

## نصب وابستگی‌ها

تمام پکیج‌ها و کتابخانه‌های مورد نیاز پروژه را نصب کنید:

```bash
npm install
```

یا اگر از Yarn استفاده می‌کنید:

```bash
yarn install
```

> این دستور تمام وابستگی‌ها را از `package.json` نصب می‌کند.

---

## ساختار پروژه

```
src/
├── app                               # پوشه اصلی اپلیکیشن
│   ├── app.component.html            # قالب (Template) ریشه برنامه
│   ├── app.component.scss            # استایل ریشه برنامه
│   ├── app.component.ts              # کلاس و منطق ریشه برنامه
│   ├── app.config.ts                 # پیکربندی کلی برنامه
│   ├── app.routes.ts                 # تعریف مسیرها و ناوبری
│   ├── components                    # کامپوننت‌های قابل استفاده مجدد
│   │   ├── forms                     # کامپوننت‌های فرم
│   │   ├── shared                    # کامپوننت‌های عمومی (دکمه، کارت و غیره)
│   │   └── trees                     # کامپوننت‌های درختی / hierarchical
│   ├── constants                     # ثابت‌ها و مقادیر ثابت
│   │   ├── api.ts                    # مسیرها و URLهای API
│   │   ├── error-messages.ts         # پیام‌های خطا
│   │   ├── routes.ts                 # مسیرهای ثابت برنامه
│   │   ├── tab-component-registry.ts # ثبت کامپوننت‌ها برای تب‌ها
│   │   ├── Titles.ts                 # عناوین صفحات و کامپوننت‌ها
│   │   ├── ui                        # تنظیمات رابط کاربری
│   │   └── validation-schema.ts      # قوانین اعتبارسنجی فرم‌ها
│   ├── data                          # داده‌ها و مدل‌ها
│   │   ├── mock                      # داده‌های شبیه‌سازی برای تست
│   │   └── model                     # مدل‌های TypeScript
│   ├── guard                         # محافظت از مسیرها و دسترسی‌ها
│   │   ├── dashboard-guard           # محافظت از داشبورد
│   │   └── login-guard               # محافظت از صفحات ورود
│   ├── interfaces                    # اینترفیس‌ها و قراردادهای TypeScript
│   │   ├── on-view-activated.interface.ts   # اینترفیس وقتی ویو فعال می‌شود
│   │   └── on-view-deactivated.interface.ts # اینترفیس وقتی ویو غیرفعال می‌شود
│   ├── pages                          # صفحات اصلی برنامه
│   │   ├── auth                      # ورود و ثبت‌نام
│   │   ├── dashboard                 # داشبورد اصلی
│   │   ├── home                      # صفحه اصلی
│   │   └── tickets                   # مدیریت تیکت‌ها
│   ├── services                       # سرویس‌ها و منطق برنامه
│   │   ├── user-management           # مدیریت کاربران
│   │   ├── wallet-management         # مدیریت کیف پول
│   │   ├── ticket-service-management# مدیریت تیکت‌ها
│   │   ├── api-communication-management # ارتباط با API
│   │   ├── toast-service             # نمایش پیام‌های Toast
│   │   ├── loader-types              # انواع لودر
│   │   └── ...                       # سایر سرویس‌ها مثل load, report, travel-time و غیره
│   ├── store                          # مدیریت وضعیت برنامه (State Management)
│   │   ├── content-manager
│   │   ├── sidebar
│   │   └── tab
│   ├── themes                         # استایل و تم برنامه
│   │   ├── theme.scss
│   │   └── theme.ts
│   └── utils                          # توابع کمکی و عمومی
├── environments                        # تنظیمات محیطی (Dev / Prod)
│   ├── environment.development.ts
│   └── environment.ts
├── index.html                           # صفحه HTML اصلی
├── main.ts                              # نقطه شروع برنامه Angular
├── styles.scss                          # استایل عمومی
└── tailwind.css                         # استایل Tailwind
```

> نکات مهم:
>
> * `components` برای کامپوننت‌های کوچک و قابل استفاده مجدد است.
> * `pages` شامل صفحات اصلی برنامه است.
> * `services` برای ارتباط با API و مدیریت داده‌ها استفاده می‌شود.
> * `shared` شامل کامپوننت‌ها و توابع مشترک در چند صفحه است.

---

## اجرای پروژه

برای اجرای پروژه در محیط توسعه:

```bash
ng serve
```

* پروژه روی `http://localhost:4200` اجرا می‌شود.
* تغییرات کد به صورت خودکار در مرورگر اعمال می‌شوند (Hot Reload).

> برای تغییر پورت اجرای پروژه:

```bash
ng serve --port 4300
```

---

## نکات توسعه

* از **Angular CLI** برای ایجاد کامپوننت، سرویس و ماژول استفاده کنید:

```bash
ng generate component components/my-component
ng generate service services/my-service
```

* از **PrimeNG** برای ایجاد کامپوننت‌های UI تعاملی استفاده می‌شود.
* ساختار ماژولار و پوشه‌بندی برنامه، قابلیت توسعه و نگهداری را آسان می‌کند.
* برای مدیریت وضعیت، از **store** و الگوهای state management استفاده کنید.

---

## منابع و لینک‌های مفید

* [مستندات Angular](https://angular.io/docs)
* [مستندات PrimeNG](https://www.primefaces.org/primeng/)
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
