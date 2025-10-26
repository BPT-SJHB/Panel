---
sidebar_position: 16
title: Table
---

# 📊 Table Component

کامپوننت `TableComponent` یک کامپوننت جدولی عمومی (Generic Table) است که قابلیت‌های پیشرفته‌ای مانند **صفحه‌بندی (Pagination)**، **مرتب‌سازی (Sorting)**، **تعامل با سلول‌ها** (دکمه، آیکون، چک‌باکس) و **انتخاب ردیف** را برای نمایش ساختاریافته داده‌ها فراهم می‌کند.

این کامپوننت با استفاده از PrimeNG `p-table` پیاده‌سازی شده و از تایپ‌های عمومی (Generics) انگولار (`<T extends object>`) برای تضمین امنیت نوع داده‌ها بهره می‌برد.

---

## ⚙️ تایپ‌ها و ساختار داده‌ها

### `TableColumn<T>`

این اینترفیس نحوه نمایش و تعامل با هر ستون در جدول را تعریف می‌کند:

| ویژگی            | نوع                                 | توضیح                                                                                                                |
| :--------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `header`         | `string`                            | متن سربرگ ستون.                                                                                                      |
| `field`          | `keyof T`                           | نام فیلد در آبجکت داده (`T`) که قرار است نمایش داده شود.                                                             |
| `type`           | `TableColumnType`                   | **اختیاری.** نوع المنت نمایش داده شده در سلول (متن، دکمه، چک‌باکس و ...). پیش‌فرض: `TEXT`.                           |
| `class`          | `string \| ((row: T) => string)`    | **اختیاری.** کلاس‌های CSS برای استایل‌دهی به سلول. می‌تواند یک تابع باشد که بر اساس داده‌های ردیف کلاس را تولید کند. |
| `buttonSeverity` | `ButtonSeverity`                    | **فقط برای نوع `BUTTON` و `BUTTON_ICON`.** رنگ و اهمیت دکمه.                                                         |
| `onAction`       | `(row: T) => void \| Promise<void>` | **فقط برای دکمه‌ها و چک‌باکس‌ها.** تابعی که هنگام تعامل با المنت در آن سلول اجرا می‌شود.                             |
| `sorting`        | `boolean`                           | **اختیاری.** اگر `false` باشد، مرتب‌سازی را برای این ستون غیرفعال می‌کند. پیش‌فرض: `true`.                           |
| `format`         | `'currency'`                        | **اختیاری.** اعمال فرمت‌بندی خاص (فعلاً فقط `currency` برای اعداد).                                                  |

### `TableColumnType`

یک Enum که نوع محتوای قابل نمایش در سلول جدول را مشخص می‌کند:

- **`TEXT`**: متن ساده (پیش‌فرض).
- **`ICON`**: یک آیکون (نیاز به تعریف کلاس آیکون در فیلد دارد).
- **`BUTTON`**: یک دکمه متنی.
- **`BUTTON_ICON`**: یک دکمه با آیکون (مانند ویرایش یا حذف).
- **`BOOLEAN`**: نمایش `true`/`false` به صورت متنی یا آیکون.
- **`CHECKBOX`**: یک چک‌باکس تعاملی.

---

## 🎨 استایل‌های اکشن پرکاربرد

استایل‌های از پیش تعریف شده برای ستون‌های عملیاتی رایج:

| متغیر        | مقدار          | توضیح                                                  |
| :----------- | :------------- | :----------------------------------------------------- |
| `editCell`   | `pi pi-pencil` | آیکون مداد برای عملیات **ویرایش** با اهمیت `info`.     |
| `deleteCell` | `pi pi-trash`  | آیکون سطل زباله برای عملیات **حذف** با اهمیت `danger`. |

این‌ها آبجکت‌های آماده‌ای هستند که می‌توانند به آرایه `columns` اضافه شوند.

---

## ⚙️ ورودی‌ها (Inputs) و خروجی‌ها (Outputs)

| نام                            | نوع                              | توضیح                                                               |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------ |
| `@Input() rows`                | `(T \| null)[]`                  | آرایه داده‌هایی که قرار است در جدول نمایش داده شوند.                |
| `@Input() columns`             | `TableColumn<T>[]`               | پیکربندی آرایه‌ای ستون‌ها.                                          |
| `@Input() rowClass`            | `string \| ((row: T) => string)` | **اختیاری.** کلاس CSS برای اعمال به تگ `<tr>` ردیف‌ها.              |
| `@Input() enableCaptionButton` | `boolean`                        | اگر `true` باشد، یک دکمه در بالای جدول (Caption) نمایش داده می‌شود. |
| `@Input() captionButtonLabel`  | `string`                         | متن دکمه Caption (پیش‌فرض: 'جدید').                                 |
| `@Input() loading`             | `boolean`                        | نمایش یک لودینگ ایندیکیتور در زمان بارگذاری داده‌ها.                |
| `@Input() customSort`          | `boolean`                        | اگر `true` باشد، مرتب‌سازی به صورت دستی توسط والد مدیریت می‌شود.    |
| `@Input() selectionMode`       | `'single' \| 'multiple'`         | **اختیاری.** فعال‌سازی انتخاب تک‌ردیفی یا چندردیفی.                 |
| `@Output() clickCaptionButton` | `EventEmitter<void>`             | هنگام کلیک بر روی دکمه Caption صادر می‌شود.                         |
| `@Output() pageChange`         | `EventEmitter<TablePage>`        | هنگام تغییر صفحه‌بندی (Pagination) صادر می‌شود.                     |
| `@Output() sortFunction`       | `EventEmitter<SortEvent>`        | هنگام مرتب‌سازی سفارشی صادر می‌شود (`customSort` باید `true` باشد). |
| `@Output() rowSelect`          | `EventEmitter<T>`                | هنگام انتخاب یک ردیف (در حالت `single`) صادر می‌شود.                |
| `@Output() rowSelectMultiple`  | `EventEmitter<T[]>`              | هنگام انتخاب ردیف‌ها (در حالت `multiple`) صادر می‌شود.              |

---

## 🧠 منطق‌های داخلی کلیدی

1.  **`onCheckboxChange`**: مقدار چک‌باکس را به فیلد مربوطه در آبجکت داده‌ها اعمال کرده و تابع `onAction` ستون را فراخوانی می‌کند.
2.  **`applyFormat`**: در حال حاضر فقط فرمت‌بندی **`currency`** را اعمال می‌کند، که اعداد را با کاما جدا می‌کند.
3.  **`getColumnClass` / `getTdClass`**: این متدها منطق توابعی را که به عنوان کلاس در `TableColumn` یا `rowClass` تعریف شده‌اند، اجرا می‌کنند تا کلاس‌های CSS سفارشی و پویا اعمال شوند.
4.  **`rowTableSelect` / `rowTableUnSelect`**: این متدها برای مدیریت رویدادهای داخلی PrimeNG در زمان انتخاب/عدم انتخاب ردیف استفاده می‌شوند و مطمئن می‌شوند که خروجی‌ها (`rowSelect`, `rowSelectMultiple` و...) با نوع داده‌های صحیح صادر شوند.

## 🚀 نمونه کد استفاده از TableComponent

این مثال نحوه تعریف آرایه ستون‌ها (`columns`)، تعریف داده‌ها (`rows`) و مدیریت رویدادهای جدول (مانند صفحه‌بندی و دکمه کپشن) را در یک کامپوننت والد نشان می‌دهد.

### ۱. تعریف مدل داده (مدل پرسنل)

ابتدا مدل داده‌ای که قرار است در جدول نمایش داده شود را تعریف می‌کنیم:

```typescript
// personnel.model.ts
export interface Personnel {
  id: number;
  name: string;
  nationalCode: string; // کد ملی
  salary: number; // حقوق
  isActive: boolean;
  department: string;
  edit: string; // برای ستون ویرایش
  delete: string; // برای ستون حذف
}
```

---

### ۲. کامپوننت والد (PersonnelListComponent)

در این کامپوننت، پیکربندی ستون‌ها انجام شده و داده‌ها مدیریت می‌شوند.

```typescript
// personnel-list.component.ts
import { Component, OnInit } from "@angular/core";
import {
  TableColumn,
  TableColumnType,
  deleteCell,
  editCell,
  TablePage,
} from "app/components/shared/table/table.component";
import { Personnel } from "./personnel.model";
import { ToastService } from "app/services/toast-service/toast.service";
// ... سایر ایمپورت‌ها

@Component({
  selector: "app-personnel-list",
  templateUrl: "./personnel-list.component.html",
  // ...
})
export class PersonnelListComponent implements OnInit {
  // تزریق سرویس‌ها
  private toast = inject(ToastService);

  // 📄 داده‌های جدول
  personnelRows: Personnel[] = [
    {
      id: 1,
      name: "علی احمدی",
      nationalCode: "0012345678",
      salary: 50000000,
      isActive: true,
      department: "مالی",
      edit: editCell.value,
      delete: deleteCell.value,
    },
    {
      id: 2,
      name: "زهرا کریمی",
      nationalCode: "0029876543",
      salary: 75000000,
      isActive: false,
      department: "فروش",
      edit: editCell.value,
      delete: deleteCell.value,
    },
    // ... داده‌های بیشتر
  ];

  // 📐 پیکربندی ستون‌ها
  personnelColumns: TableColumn<Personnel>[] = [
    { header: "شناسه", field: "id", sorting: true, class: "font-bold" },
    { header: "نام و نام خانوادگی", field: "name" },
    { header: "کد ملی", field: "nationalCode" },
    {
      header: "حقوق (ریال)",
      field: "salary",
      type: TableColumnType.TEXT,
      format: "currency",
    },
    { header: "وضعیت فعال", field: "isActive", type: TableColumnType.BOOLEAN },
    {
      header: "واحد سازمانی",
      field: "department",
      // کلاس سفارشی بر اساس داده‌های ردیف
      class: (row) =>
        row.department === "مالی" ? "text-blue-600" : "text-orange-600",
    },
    // ستون ویرایش
    {
      ...editCell.config,
      field: "edit",
      onAction: async (row) => await this.onEditPersonnel(row),
    },
    // ستون حذف
    {
      ...deleteCell.config,
      field: "delete",
      onAction: async (row) => await this.onDeletePersonnel(row),
    },
  ];

  // 🧠 توابع مدیریت اکشن‌ها
  async onEditPersonnel(row: Personnel) {
    this.toast.info("ویرایش", `شما پرسنل ${row.name} را ویرایش می‌کنید.`);
    // منطق باز کردن مودال ویرایش
  }

  async onDeletePersonnel(row: Personnel) {
    // منطق باز کردن دیالوگ تأیید حذف
    this.toast.danger("حذف", `پرسنل ${row.name} حذف شد.`);
  }

  onNewPersonnel() {
    this.toast.success("افزودن", "آماده برای ثبت پرسنل جدید.");
    // منطق باز کردن مودال ثبت جدید
  }

  onPaginationChange(event: TablePage) {
    console.log("تغییر صفحه:", event);
    // منطق واکشی داده‌های جدید برای صفحه (event.page)
  }

  // ...
}
```

---

### ۳. قالب HTML

```html
<div class="card p-4">
  <h2 class="text-xl font-bold mb-4">لیست پرسنل</h2>

  <app-table
    [rows]="personnelRows"
    [columns]="personnelColumns"
    [enableCaptionButton]="true"
    captionButtonLabel="افزودن پرسنل جدید"
    (clickCaptionButton)="onNewPersonnel()"
    (pageChange)="onPaginationChange($event)"
    [loading]="isLoading"
    [rowClass]="'hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer'"
    selectionMode="single"
    (rowSelect)="onRowSelect($event)"
  ></app-table>
</div>
```
