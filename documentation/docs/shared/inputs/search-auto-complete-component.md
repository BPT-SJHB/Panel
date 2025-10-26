---
sidebar_position: 1
title: SearchAutoComplete
---


# 🔍 SearchAutoCompleteComponent

کامپوننت `SearchAutoCompleteComponent` یک ورودی پیشرفته جستجو با قابلیت **تکمیل خودکار (Autocomplete)** است که از **Reactive Forms** انگولار و **PrimeNG** بهره می‌برد. این کامپوننت برای جستجوی داده‌ها از منابع محلی یا سرویس‌های API از طریق یک تابع `lazySearch` طراحی شده و شامل مکانیسم‌های کشینگ هوشمند برای بهینه‌سازی عملکرد است.

-----

## 📘 ویژگی‌های کلیدی

  * **Reactive Forms:** اتصال به `FormControl` برای مدیریت ورودی جستجو.
  * **کشینگ هوشمند:** امکان کش کردن نتایج جستجو بر اساس پیشوند کاراکترها (`CharacterPrefix`) یا فوکوس (`Focus`) برای کاهش درخواست‌های API.
  * **جستجوی تنبل (Lazy Search):** قابلیت فراخوانی یک تابع ناهمگام (`Promise`) برای واکشی داده‌ها از سرور.
  * **کنترل UI:** مدیریت کامل نمایش لیست پیشنهادات، لودینگ، و ناوبری با کیبورد (`ArrowUp/Down`, `Enter`).
  * **سفارشی‌سازی:** قابلیت تعیین آیکون، برچسب، و محدودیت طول حداقل جستجو (`minLength`).

-----

## ⚙️ ورودی‌ها (Inputs)

| نام | نوع | پیش‌فرض | توضیح |
| :--- | :--- | :--- | :--- |
| `control` | `FormControl` | `new FormControl('')` | **ضروری.** کنترل فرم ری‌اکتیو برای اتصال داده. |
| `lazySearch` | `(query: string) => Promise<T[]>` | `undefined` | **تابع جستجو.** متدی برای فراخوانی API و واکشی پیشنهادات. |
| `allOptions` | `T[]` | `[]` | لیست کامل گزینه‌ها (برای جستجوی لوکال در صورت عدم وجود `lazySearch`). |
| `minLength` | `number` | `3` | حداقل تعداد کاراکتر برای شروع عملیات جستجو. |
| `cachingEnabled` | `boolean` | `true` | فعال یا غیرفعال کردن مکانیسم کشینگ. |
| `cachingMode` | `'CharacterPrefix' \| 'Focus'` | `'CharacterPrefix'` | نحوه اعمال کشینگ: **`CharacterPrefix`** (پیشوند کاراکترها) یا **`Focus`** (فقط هنگام فوکوس). |
| `optionLabel` | `keyof T` | `undefined` | کلید (Property) آبجکت `T` که باید به عنوان متن نمایش داده شود. |
| `placeholder` | `string` | `'جستجو'` | متن راهنما درون ورودی. |
| `icon` | `string` | `'pi pi-search'` | کلاس آیکون نمایش داده شده در ورودی. |
| `label` | `string` | `''` | برچسب متنی کنار ورودی. |
| `addonWidth` | `string` | `''` | عرض بخش آیکون یا Addon. |
| `readOnly` | `boolean` | `false` | حالت فقط‌خواندنی. |
| `disabled` | `boolean` | `false` | غیرفعال کردن کنترل. |
| `language` | `'fa' \| 'en'` | `'fa'` | محدودیت زبان ورودی. |
| `showIconOptionSelected` | `boolean` | `false` | نمایش آیکون کنار گزینه‌ی انتخاب شده. |
| `optionValue` | `string` | `'value'` | (استفاده نشده در کد بزودی حذف خواهد شد در نسخه پیشن مورد استفاده قرار می گرفت) |
| `id` | `string` | `uuidV4()` | شناسه‌ی یکتا برای کامپوننت. |

-----

## 📤 رویدادها (Outputs)

| نام | نوع | توضیح |
| :--- | :--- | :--- |
| `valueChange` | `EventEmitter<string>` | انتشار هنگام تغییر مقدار ورودی توسط کاربر. |
| `selectSuggestion` | `EventEmitter<T>` | انتشار هنگام انتخاب یک پیشنهاد از لیست. |

-----

## 🧠 منطق و متدها

| متد/ویژگی | نوع | توضیح |
| :--- | :--- | :--- |
| `onSearch(term: string)` | `Async Method` | هسته‌ی جستجو: بررسی `minLength`، استفاده از کش، و در صورت لزوم، فراخوانی `fetchAndCacheSuggestions`. |
| `fetchAndCacheSuggestions()` | `Async Method` | اجرای `lazySearch`، ذخیره نتایج در `cachedResults` و به‌روزرسانی `suggestions`. |
| `filterSuggestions()` | `Private Method` | فیلتر کردن لیست گزینه‌ها بر اساس کوئری فعلی (لوکال). |
| `onFocusInput()` | `Method` | تنظیم عرض Dropdown و شروع جستجو در حالت `cachingMode: 'Focus'`. |
| `onSelectAutoComplete(value: T)` | `Method` | تنظیم مقدار ورودی به برچسب گزینه انتخاب شده و انتشار رویداد `selectSuggestion`. |
| `onKeydown(event: KeyboardEvent)` | `HostListener` | مدیریت ناوبری با کیبورد (`ArrowUp/Down`) و انتخاب با `Enter`. |
| `onDocumentClick(event: MouseEvent)` | `HostListener` | بستن لیست پیشنهادات در صورت کلیک خارج از کامپوننت و پاکسازی کش. |
| `isResultEmpty` | `Computed Signal` | محاسبه وضعیت نمایش پیام "نتیجه‌ای یافت نشد". |
| `getDropDownStyle()` | `Method` | محاسبه و بازگرداندن استایل ارتفاع و عرض Dropdown بر اساس تعداد نتایج. |

-----

## 🚀 نمونه استفاده (HTML)

```html
<form [formGroup]="userForm">
  <app-search-auto-complete
    [control]="userForm.get('userId')!"
    placeholder="جستجوی کاربران..."
    [minLength]="4"
    [optionLabel]="'fullName'" 
    [lazySearch]="searchUsers" 
    [cachingMode]="'CharacterPrefix'"
    (selectSuggestion)="onUserSelected($event)"
  ></app-search-auto-complete>
</form>

// فرض کنید T از نوع User است: { id: number, fullName: string }
searchUsers = async (query: string): Promise<User[]> => {
  // این تابع با فراخوانی API، نتایج را برمی‌گرداند.
  return this.userService.findUsers(query).toPromise(); 
};
```

-----

## 💡 نکات استفاده

  * **نوع عمومی (Generic):** این کامپوننت از نوع عمومی `<T>` استفاده می‌کند، بنابراین اطمینان حاصل کنید که ورودی `optionLabel` با یکی از کلیدهای آبجکت `T` مطابقت داشته باشد.
  * **کشینگ:** در حالت پیش‌فرض (`CharacterPrefix`)، اگر حداقل ۳ کاراکتر اول ورودی یکسان باشد، درخواست جدیدی به سرور ارسال نمی‌شود و از نتایج کش شده استفاده می‌گردد.
  * **کنترل کامل:** این کامپوننت شامل کامپوننت داخلی `TextInputComponent` برای مدیریت ورودی اصلی است.
  * **بسته‌شدن هوشمند:** با کلیک یا فوکوس خارج از کامپوننت، لیست پیشنهادات به صورت خودکار بسته می‌شود.