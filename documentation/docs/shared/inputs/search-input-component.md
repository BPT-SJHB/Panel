---
sidebar_position: 1
title: SearchInput
---

# 🔎 SearchInputComponent

کامپوننت `SearchInputComponent` یک فیلد ورودی جستجو است که قابلیت‌های پیشرفته‌ای برای مدیریت داده‌های **محلی (Static)** و **ناهمگام (Async)** فراهم می‌کند. این کامپوننت با **Reactive Forms** سازگار بوده و شامل مکانیسم‌های کشینگ، فیلترینگ خودکار و قابلیت فعال‌سازی جستجو بر اساس زمان توقف تایپ (`debounceTime`) است.

-----

## 📘 ویژگی‌های کلیدی

  * **پشتیبانی دوگانه:** قابلیت جستجوی داده‌ها از لیست محلی (`staticData`) یا از طریق یک تابع ناهمگام (`asyncSearchFn`).
  * **جستجوی خودکار:** فعال‌سازی جستجو به‌صورت خودکار در حین تایپ، با استفاده از `debounceTime` برای بهینه‌سازی عملکرد.
  * **کشینگ (Caching):** استفاده از کش برای نتایج جستجوی سرور، با کلید بر اساس حداقل طول جستجو (`minSearchLength`) برای کاهش درخواست‌های تکراری.
  * **Reactive Forms:** اتصال به `FormControl` انگولار.
  * **سفارشی‌سازی UI:** قابلیت تنظیم آیکون، برچسب دکمه جستجو، و عرض بخش Addon.

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl<string \| null \| undefined>` | `new FormControl('')` | **ضروری.** کنترل فرم ری‌اکتیو. |
| `placeholder` | `string` | `''` | متن راهنما درون فیلد. |
| `icon` | `string` | `'pi pi-search'` | کلاس آیکون نمایش داده شده در ورودی. |
| `searchButtonLabel` | `string` | `'جستجو'` | برچسب دکمه جستجو. |
| `disableSearchButton` | `boolean` | `false` | غیرفعال کردن دکمه جستجو. |
| `language` | `'en' \| 'fa'` | `'fa'` | محدودیت زبان ورودی. |
| `type` | `'text' \| 'number'` | `'text'` | نوع ورودی (متن یا عدد). |
| `readOnly` | `boolean` | `false` | حالت فقط‌خواندنی. |
| `disabled` | `boolean` | `false` | غیرفعال کردن کنترل. |
| `addonWidth` | `string \| null` | `null` | عرض بخش آیکون یا Addon. |
| `validationField` | `ValidationField \| null` | `null` | نوع فیلد برای نمایش خطاهای اعتبارسنجی. |
| `id` | `string` | `uuidV4()` | شناسه‌ی یکتا. |
| **`staticData`** | `T[]` | `[]` | لیست داده‌ها برای فیلترینگ محلی. |
| **`asyncSearchFn`** | `(query: string) => Promise<T[]>` | `undefined` | تابع ناهمگام برای واکشی داده‌ها از سرور. |
| **`onSearchQuery`** | `(query: string) => Promise<void>` | `undefined` | یک تابع جایگزین که در صورت وجود، منطق جستجوی داخلی را لغو می‌کند و تنها رویداد جستجو را اجرا می‌نماید. |
| **`itemMatchesQuery`** | `(item: T, query: string) => boolean` | `undefined` | **ضروری برای جستجوی لوکال/کش.** متد فیلترینگ برای مقایسه آیتم با کوئری. |
| **`autoTriggerSearch`** | `boolean` | `false` | جستجوی خودکار در حین تایپ (با زمان تأخیر). |
| **`debounceTimeMs`** | `number` | `300` | زمان تأخیر (به میلی‌ثانیه) پیش از شروع جستجو در حالت `autoTriggerSearch`. |
| **`minSearchLength`** | `number` | `3` | حداقل طول کوئری برای فعال‌سازی جستجو. |
| **`enableCaching`** | `boolean` | `true` | فعال‌سازی کش برای نتایج `asyncSearchFn`. |
| **`fallbackToAllWhenQueryShort`** | `boolean` | `false` | اگر کوئری از `minSearchLength` کوتاه‌تر بود، کل `staticData` برگردانده شود. |

-----

## 📤 رویدادها (Outputs)

| نام | نوع | توضیح |
| :--- | :--- | :--- |
| `rawInput` | `EventEmitter<string>` | انتشار هنگام تغییر مقدار خام ورودی توسط کاربر. |
| `searchResult` | `EventEmitter<T[]>` | انتشار پس از اتمام جستجو و ارائه نتایج نهایی (مخصوصاً در حالت‌های جستجوی داخلی). |

-----

## 🧠 منطق و متدها

| متد | توضیح |
| :--- | :--- |
| **`ngOnInit()`** | ثبت `Subscription` برای `control.valueChanges` که با `debounceTime` و `distinctUntilChanged` بهینه‌سازی شده و در صورت فعال بودن `autoTriggerSearch`، متد `triggerSearch` را فراخوانی می‌کند. |
| **`ngOnDestroy()`** | لغو اشتراک `controlSubscription` برای جلوگیری از Memory Leak. |
| **`performSearch(query: string)`** | متد هسته که منطق جستجو (لوکال، ناهمگام با کش، یا `onSearchQuery`) را مدیریت کرده و نتایج را برمی‌گرداند. |
| **`triggerSearch(query: string)`** | اجرای `performSearch` و انتشار نهایی نتایج از طریق `searchResult`. |
| **`refreshSearch()`** | متدی برای اجرای اجباری جستجو با نادیده‌گرفتن کش (Force Refresh). |
| **`onSearchButtonClick()`** | فراخوانی `triggerSearch` به‌صورت دستی در صورت کلیک کاربر روی دکمه جستجو و غیرفعال بودن `autoTriggerSearch`. |

-----

## 🚀 نمونه استفاده (HTML)

این کامپوننت شامل یک `TextInputComponent` داخلی و یک `ButtonComponent` است.

```html
<app-search-input
  [control]="form.get('productName')!"
  placeholder="جستجوی محصول..."
  icon="pi pi-box"
  searchButtonLabel="جستجو کن"
  [autoTriggerSearch]="true"
  [debounceTimeMs]="500"
  [minSearchLength]="2"
  [asyncSearchFn]="searchProductApi" 
  [itemMatchesQuery]="matchProductItem"
  (searchResult)="handleResults($event)"
></app-search-input>
```

```typescript
// در کامپوننت والد
// فرض کنید T از نوع Product است: { name: string, price: number }

// 1. تابع جستجوی ناهمگام
searchProductApi = async (query: string): Promise<Product[]> => {
  // شبیه سازی فراخوانی سرویس
  return this.productService.search(query); 
};

// 2. تابع فیلترینگ (برای فیلتر کردن نتایج کش شده یا لوکال)
matchProductItem = (item: Product, query: string): boolean => {
  return item.name.toLowerCase().includes(query.toLowerCase());
};

// 3. مدیریت نتایج
handleResults(products: Product[]): void {
  console.log('نتایج جستجوی نهایی:', products);
  //... منطق نمایش نتایج
}
```