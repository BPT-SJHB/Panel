---
sidebar_position: 26
title: TreeTableCheckbox
---

# 🌳 Tree Table Checkbox Component

کامپوننت `TreeTableCheckboxComponent` یک کامپوننت UI مجدد استفاده‌پذیر برای نمایش داده‌های سلسله‌مراتبی (درختی) است. این کامپوننت با استفاده از **`TreeTable` PrimeNG** و منطق داخلی خود، امکان انتخاب موارد (با چک‌باکس) در سطوح والد و فرزند را فراهم می‌کند، همچنین قابلیت‌های **صفحه‌بندی (Paginator)** و **جستجوی پیشرفته** را نیز ارائه می‌دهد.

## ⚙️ ورودی‌ها (Inputs) و خروجی‌ها (Outputs)

| نام                               | نوع                    | پیش‌فرض | توضیح                                                                                                               |
| :-------------------------------- | :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------ |
| `@Input() tree`                   | `TreeNode[]`           | `[]`    | ساختار درختی اصلی داده‌ها که باید نمایش داده شود.                                                                   |
| `@Input() parentField`            | `string`               | `''`    | نام فیلدی در آبجکت `data` والد که وضعیت انتخاب (Checked/Partial) آن را ذخیره می‌کند.                                |
| `@Input() childField`             | `string`               | `''`    | نام فیلدی در آبجکت `data` فرزند که وضعیت انتخاب (Checked) آن را ذخیره می‌کند.                                       |
| `@Input() cols`                   | `string[]`             | `[]`    | لیست عنوان ستون‌ها برای نمایش در جدول.                                                                              |
| `@Input() enabledSearch`          | `boolean`              | `false` | آیا باکس جستجو فعال باشد یا خیر.                                                                                    |
| `@Input() enabledAutoSearch`      | `boolean`              | `true`  | اگر `true` باشد، جستجو به‌صورت خودکار هنگام تایپ انجام می‌شود؛ در غیر این صورت به کلیک روی دکمه جستجو نیاز دارد.    |
| `@Input() searchFields`           | `string[]`             | `[]`    | فیلدهایی از داده‌ها که جستجو باید روی آن‌ها اعمال شود.                                                              |
| `@Output() onTableCheckBoxChange` | `EventEmitter<...>`    | -       | زمانی که وضعیت چک‌باکس هر گره‌ای تغییر می‌کند، فعال می‌شود و داده‌های تغییر یافته (والد و فرزندان) را ارسال می‌کند. |
| `@Output() onSearch`              | `EventEmitter<string>` | -       | زمانی که یک عملیات جستجو (دستی یا خودکار) انجام می‌شود، فعال شده و رشته جستجو را ارسال می‌کند.                      |

---

## 🧠 مدیریت حالت و منطق چک‌باکس

این کامپوننت از دو ساختار داده کلیدی برای مدیریت انتخاب‌ها و بازیابی سریع گره‌ها استفاده می‌کند:

### ۱. ساختارهای داده داخلی

| نام                          | نوع                            | توضیح                                                                                                                                                                     |
| :--------------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`treeMap`**                | `Map<string, TreeNode>`        | یک Map که تمام گره‌های درخت را با استفاده از `key` منحصر به فردشان (تولید شده توسط متد `setKeysRecursively`) فهرست می‌کند. این ساختار برای بازیابی سریع گره‌ها ضروری است. |
| **`selectionKeys`**          | `Record<string, SelectionKey>` | آبجکتی که توسط `TreeTable` PrimeNG برای پیگیری وضعیت انتخاب هر گره استفاده می‌شود (Checked، PartialChecked و isHidden).                                                   |
| **`lastSelectionKeys`**      | `Record<string, SelectionKey>` | یک کپی از وضعیت `selectionKeys` در آخرین عملیات موفق، برای تعیین دقیق اینکه کدام گره تغییر کرده است.                                                                      |
| **`SelectionKey` Interface** | -                              | تعریف داخلی وضعیت گره: `{ checked: boolean, partialChecked?: boolean, isHidden: boolean }`.                                                                               |

### ۲. توابع اصلی مدیریت چک‌باکس

| متد                                  | نوع          | توضیح                                                                                                                                                                                                                                                                      |
| :----------------------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`initializeTree()`**               | `TreeNode[]` | درخت ورودی (`@Input() tree`) را پردازش اولیه می‌کند. این متد `selectionKeys` را بازنشانی کرده و با فراخوانی `setKeysRecursively` کلیدهای منحصر به فرد را به گره‌ها اختصاص می‌دهد.                                                                                          |
| **`setKeysRecursively(node, path)`** | `TreeNode`   | **منطق اصلی** برای تولید `key`های منحصر به فرد برای هر گره (به‌صورت سلسله‌مراتبی: `0-0-1`) و تعیین وضعیت اولیه چک‌باکس‌ها بر اساس داده‌های ورودی (`parentField` و `childField`). این متد وضعیت `partialChecked` را نیز محاسبه می‌کند.                                      |
| **`selectionKeysChanged(newKeys)`**  | `void`       | مهم‌ترین متد برای مدیریت خروجی. این متد تفاوت بین `lastSelectionKeys` و `newKeys` را پیدا می‌کند، مشخص می‌کند کدام والد و کدام فرزند تغییر کرده‌اند، و داده‌های اصلی گره‌ها را در آن فیلدها به‌روزرسانی می‌کند. در نهایت خروجی **`onTableCheckBoxChange`** را فعال می‌کند. |

---

## 🔍 منطق جستجو و فیلتر (Filtering)

| متد                     | نوع    | توضیح                                                                                                                                                                                                                                                       |
| :---------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`filterTree(query)`** | `void` | از طریق کامپوننت ورودی جستجو فراخوانی می‌شود. اگر `enabledAutoSearch` فعال باشد، فیلتر را اعمال می‌کند.                                                                                                                                                     |
| **`onClickSearch()`**   | `void` | تنها زمانی فراخوانی می‌شود که `enabledAutoSearch` غیرفعال باشد.                                                                                                                                                                                             |
| **`filters(query)`**    | `void` | **منطق فیلتر داخلی.** گره‌های درخت را به‌صورت کامل فیلتر می‌کند. اگر یک والد با کوئری جستجو مطابقت داشته باشد _یا_ حداقل یکی از فرزندان آن مطابقت داشته باشند، والد نمایش داده می‌شود. گره‌هایی که مطابقت ندارند، با اعمال کلاس **`hidden`** پنهان می‌شوند. |

## 🔄 چرخه‌حیات (Lifecycle Hooks)

| متد                              | توضیح                                                                                                           |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **`ngOnInit()`**                 | درخت را مقداردهی اولیه کرده (`initializeTree`)، `treeMap` را می‌سازد و `lastSelectionKeys` را تنظیم می‌کند.     |
| **`ngOnChanges(changes)`**       | اگر `@Input() tree` تغییر کند، تمام فرآیند‌های مقداردهی اولیه (Initialization) و ساخت درخت مجدداً انجام می‌شود. |
| **`@ViewChild('treeTable') tt`** | امکان دسترسی مستقیم به اینستنس `TreeTable` PrimeNG را برای کنترل‌های پیشرفته (اگر لازم باشد) فراهم می‌کند.      |

قطعاً. برای کامپوننت `TreeTableCheckboxComponent` که یک جدول درختی پیشرفته با چک‌باکس است، در زیر نمونه کد HTML استفاده از آن در یک کامپوننت والد به همراه نحوه تعریف داده‌های لازم در TypeScript آورده شده است.

---

## 🚀 نمونه کد استفاده از TreeTableCheckboxComponent

این مثال نشان می‌دهد که چگونه می‌توان از `TreeTableCheckboxComponent` برای مدیریت سلسله‌مراتب نقش‌ها (Permissions) در یک سیستم استفاده کرد، جایی که والدین (ماژول‌ها) و فرزندان (مجوزهای دسترسی) وجود دارند.

### ۱. مدل‌های داده‌ای مورد نیاز (TypeScript)

فرض می‌کنیم داده‌های ما به این شکل ساختار یافته‌اند:

```typescript
// permission.model.ts
export interface Permission {
  id: number;
  name: string;
  canAccess: boolean; // فیلد برای فرزندان
}

export interface Module {
  id: number;
  name: string;
  isManaged: boolean; // فیلد برای والد
  permissions: Permission[];
}
```

### ۲. کامپوننت والد (Parent Component)

```typescript
// role-permissions.component.ts
import { Component, OnInit } from "@angular/core";
import { TreeNode } from "primeng/api";
import { TreeTableChangedData } from "app/components/shared/tree-table-checkbox/tree-table-checkbox.component";
import { Module, Permission } from "./permission.model";
import { ToastService } from "app/services/toast-service/toast.service";

@Component({
  selector: "app-role-permissions",
  templateUrl: "./role-permissions.component.html",
  // ...
})
export class RolePermissionsComponent implements OnInit {
  private toast = inject(ToastService);

  // 1. تعریف داده‌های خام
  rawModules: Module[] = [
    {
      id: 1,
      name: "مدیریت کاربران",
      isManaged: true,
      permissions: [
        { id: 101, name: "افزودن کاربر", canAccess: true },
        { id: 102, name: "حذف کاربر", canAccess: false },
        { id: 103, name: "مشاهده لاگ", canAccess: true },
      ],
    },
    {
      id: 2,
      name: "مدیریت تیکت‌ها",
      isManaged: false,
      permissions: [
        { id: 201, name: "ارسال تیکت", canAccess: true },
        { id: 202, name: "بستن تیکت", canAccess: false },
      ],
    },
  ];

  // 2. ساختار درختی (TreeNode[])
  permissionTree: TreeNode[] = [];

  // 3. پیکربندی ستون‌ها برای نمایش
  tableColumns = ["ماژول / مجوز", "وضعیت دسترسی"];

  // 4. فیلدهای جستجو
  searchFields = ["name"];

  ngOnInit(): void {
    this.permissionTree = this.buildPermissionTree(this.rawModules);
  }

  private buildPermissionTree(modules: Module[]): TreeNode[] {
    return modules.map((mod) => ({
      data: mod,
      expanded: true, // باز بودن پیش‌فرض گره‌های والد
      children: mod.permissions.map((perm) => ({
        data: perm,
      })),
    }));
  }

  // 5. هندل کردن تغییرات چک‌باکس
  onPermissionChange(data: TreeTableChangedData) {
    if (data.parent) {
      console.log("والد تغییر کرد:", data.parent);
      this.toast.info(
        "تغییر والد",
        `وضعیت ماژول ${data.parent.name} به ${data.parent.isManaged} تغییر کرد.`
      );
    }
    if (data.children.length > 0) {
      console.log("فرزندان تغییر کردند:", data.children);
      this.toast.info(
        "تغییر مجوز",
        `تعداد ${data.children.length} مجوز به‌روزرسانی شد.`
      );
    }
    // در اینجا باید API برای ذخیره تغییرات فراخوانی شود
  }

  onSearch(query: string) {
    console.log("جستجو اعمال شد:", query);
    // منطق اضافی سمت سرور (در صورت لزوم)
  }
}
```

### ۳. قالب HTML (استفاده از کامپوننت)

```html
<div class="p-card p-4">
  <h3>تنظیم دسترسی‌های نقش</h3>
  <p>دسترسی‌های هر ماژول را برای این نقش مدیریت کنید.</p>

  <app-tree-table-checkbox
    [tree]="permissionTree"
    [cols]="tableColumns"
    [parentField]="'isManaged'"
    [childField]="'canAccess'"
    [enabledSearch]="true"
    [searchFields]="searchFields"
    searchPlaceholder="جستجو بر اساس نام ماژول یا مجوز..."
    [paginator]="true"
    [rowsPerPage]="5"
    (onTableCheckBoxChange)="onPermissionChange($event)"
    (onSearch)="onSearch($event)"
  ></app-tree-table-checkbox>
</div>
```
