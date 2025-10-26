---
sidebar_position: 1
title: SearchAutoCompleteFactory
---

# 🏭 SearchAutoCompleteFactory

کامپوننت `SearchAutoCompleteFactoryComponent` در واقع یک **Wrapper (پوشاننده)** برای کامپوننت `SearchAutoCompleteComponent` است. هدف این کامپوننت، **کاهش Boilerplate** در هنگام تعریف ورودی‌های پیچیده جستجو است.

به جای تعریف دستی تمام ورودی‌های `label`، `placeholder`، `lazySearch` و `optionLabel`، این کامپوننت تنها یک ورودی **`config`** می‌گیرد که توسط یک سرویس کارخانه‌ای (`AutoCompleteConfigFactoryService`) ایجاد شده است.

-----

## 📘 ویژگی‌های کلیدی

  * **Factory Pattern:** استفاده از سرویس `AutoCompleteConfigFactoryService` برای تزریق تمام تنظیمات ضروری.
  * **کاهش پیچیدگی:** توسعه‌دهنده به جای ده‌ها Input، تنها یک ورودی (`config`) را مدیریت می‌کند.
  * **Reusability بالا:** تعریف یکباره منطق و UI برای تمام انواع جستجو (شهر، شرکت حمل‌ونقل، محصول و...).
  * **مدیریت Addon:** امکان سفارشی‌سازی عرض بخش آیکون/برچسب.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| **`config`** | `AutoCompleteFilter \| null` | `null` | **ضروری.** یک آبجکت پیکربندی کامل که توسط سرویس `AutoCompleteConfigFactoryService` ایجاد شده است. |
| `addonWidth` | `string` | `'8rem'` | عرض بخش آیکون یا Addon در کنار فیلد ورودی. |

-----

## 🧠 منطق (Logic)

این کامپوننت هیچ منطق داخلی برای جستجو ندارد. تمام ورودی‌ها و منطق جستجو، انتخاب و مدیریت وضعیت‌ها به طور مستقیم از آبجکت **`config`** خوانده شده و به کامپوننت فرزند (`<app-search-auto-complete>`) منتقل می‌شود.

-----

### **اشاره به منبع کانفیگ** 💡

آبجکت ورودی **`config`** باید توسط متد **`create()`** از سرویس **`AutoCompleteConfigFactoryService`** ایجاد شود. این سرویس مسئولیت‌های زیر را بر عهده دارد:

1.  تعریف پیش‌فرض‌های ثابت (مانند `label`, `placeholder`, `minLength`, `cachingMode`) برای انواع مختلف جستجو (مثل `City`, `TransportCompany`, `Product`).
2.  تزریق توابع ناهمگام (`lazySearch`) مناسب برای هر نوع جستجو با استفاده از سرویس‌های API مختلف.
3.  تعریف توابع `select` و `valueChange` برای به‌روزرسانی نهایی `FormControl` مربوط به `ID/Code`.

-----

## 🚀 نمونه استفاده (HTML)

در کامپوننت والد، ابتدا سرویس `AutoCompleteConfigFactoryService` را تزریق کرده و سپس با متد `create()`، کانفیگ مورد نیاز را می‌سازید:

```typescript
// در کامپوننت والد (مثلاً my-form.component.ts)

// تزریق سرویس
private readonly configFactory = inject(AutoCompleteConfigFactoryService);
form = new FormGroup({
  cityId: new FormControl<number | null>(null), // فرم کنترل برای ذخیره ID شهر
  cityName: new FormControl(''), // فرم کنترل برای نمایش متن شهر
});

// ساخت کانفیگ شهر
cityConfig = this.configFactory.create(
  AutoCompleteType.City, 
  this.form.controls.cityId, // کنترل ID
  { 
    control: this.form.controls.cityName, // کنترل نمایش متن
    label: 'شهر محل بارگیری' 
  }
);
```

```html
<app-search-auto-complete-factory
  [config]="cityConfig"
  addonWidth="10rem"
></app-search-auto-complete-factory>
```

