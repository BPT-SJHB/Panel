# Print & Reporting System Documentation

This document explains the unified **Print & Reporting Service** (`PrintService`) in `src/app/services/print/print.service.ts`.

---

## 1. Architecture & Design Principles

- **Zero External Dependencies:** Built on native browser iframe rendering and CSS `@media print` standards.
- **True RTL & Persian Digit Support:** Pre-configures `@font-face` for `Vazirmatn-RD-FD` (Persian numerals) and enforces `direction: rtl; text-align: right`.
- **Pure Data-Driven:** Never scrapes or clones active UI DOM nodes (preventing PrimeNG sort icon artifacts, paginator leakage, and hidden row loss).
- **Whole-Word Wrapping:** Configures `word-break: normal` and `overflow-wrap: normal` so Persian words never split mid-character across line wraps.

---

## 2. API Reference & Print Modes

### A. Tabular Reports (`printTable<T>`)
Used for tabular reports (audit logs, data lists, financial ledgers).

```typescript
export interface PrintTableColumn<T = any> {
  header: string;                                   // Column header title
  field: keyof T | string;                          // Object property key
  formatter?: (val: any, row: T) => string;         // Custom cell renderer
  compact?: boolean;                                // If true, shrinks to 1% width (IDs, codes, dates)
  align?: 'right' | 'center' | 'left';              // Text alignment (default: right, compact: center)
}

export interface PrintTableOptions<T = any> {
  title: string;                                    // Document main title
  subtitle?: string;                                 // Optional subtitle
  columns: PrintTableColumn<T>[];                   // Column definitions
  data: T[];                                        // Full dataset array (unpaginated)
  landscape?: boolean;                              // Default: true (A4 landscape)
  showIndex?: boolean;                              // If true (default), adds a "ردیف" counter column
  customHeaderHtml?: string;                        // Optional HTML banner before table
  customFooterHtml?: string;                        // Optional HTML summary/totals after table
}
```

#### Usage Example:
```typescript
@Component({ ... })
export class MyReportComponent {
  private readonly printService = inject(PrintService);
  readonly rows = signal<Transaction[]>([]);

  printLedger() {
    this.printService.printTable({
      title: 'گزارش تراکنش‌های مالی',
      subtitle: 'حساب شرکت حمل و نقل',
      landscape: true,
      columns: [
        { header: 'شناسه', field: 'id', compact: true },
        { header: 'تاریخ', field: 'date', compact: true },
        { header: 'مبلغ (ریال)', field: 'amount', formatter: (val) => Number(val).toLocaleString('fa-IR') },
        { header: 'توضیحات', field: 'description' },
      ],
      data: this.rows(),
    });
  }
}
```

---

### B. Voucher / Permit Card Layout (`printCards`)
Used for official documents (bills of lading, parking entrance permits, receipts, waybills) that contain many fields (15–25+) that cannot fit on standard spreadsheet widths.

```typescript
export interface PrintCardField {
  label: string;                                    // Label (e.g., 'نام راننده')
  value: string | number | null | undefined;        // Value to display
  fullWidth?: boolean;                              // If true, spans all 4 grid columns
}

export interface PrintCardSection {
  title?: string;                                   // Section title (e.g., 'مشخصات ناوگان')
  fields: PrintCardField[];                         // Key-value pairs
}

export interface PrintCardSignature {
  label: string;                                    // Label for stamp / sign box
}

export interface PrintCardItem {
  title: string;                                    // Document title
  subtitle?: string;                                 // Reference numbers / Load IDs
  badge?: string;                                   // Status badge (e.g., 'تایید شده')
  sections: PrintCardSection[];                     // 4-column responsive grid sections
  footerNote?: string;                              // Legal disclaimer or extra note
  signatures?: PrintCardSignature[];                // Signature boxes
}

export interface PrintCardsOptions {
  documentTitle: string;
  cards: PrintCardItem[];
  orientation?: 'portrait' | 'landscape';          // Default: portrait
  pageSize?: 'A4' | 'A5';                           // Default: A4 (fits 2 cards per page with page-break-inside: avoid)
  showCounter?: boolean;                            // Shows 'برگ ۱ از N' counter
}
```

#### Usage Example:
```typescript
@Component({ ... })
export class MyPermitComponent {
  private readonly printService = inject(PrintService);

  printPermit(data: LoadPermission) {
    this.printService.printCards({
      documentTitle: 'مجوز بارگیری کالا',
      orientation: 'portrait',
      cards: [{
        title: 'مجوز رسمی بارگیری',
        subtitle: `شماره بار: ${data.LoadId}`,
        badge: 'تایید نهایی',
        signatures: [
          { label: 'مهر و امضاء شرکت حمل' },
          { label: 'امضاء راننده' }
        ],
        sections: [
          {
            title: 'مشخصات مسیر و کالا',
            fields: [
              { label: 'نوع کالا', value: data.GoodTitle },
              { label: 'مبدا', value: data.LoadSourceCity },
              { label: 'مقصد', value: data.LoadTargetCity },
              { label: 'آدرس تخلیه', value: data.Address, fullWidth: true }
            ]
          }
        ]
      }]
    });
  }
}
```

---

### C. Element Fallback (`printElement`)
Used when printing custom, pre-styled static DOM elements directly by element ID:

```typescript
this.printService.printElement('custom-voucher-div', {
  title: 'قبض پارکینگ',
  landscape: false
});
```

---

## 3. How to Add New Reports (Developer Checklist)

1. **Inject Service:**
   ```typescript
   private readonly printService = inject(PrintService);
   ```
2. **Choose Mode:**
   - Use `printTable` for list/ledger data.
   - Use `printCards` for multi-field vouchers or receipts.
3. **Trigger via Button:**
   ```html
   <app-button
     label="چاپ"
     icon="pi pi-print"
     severity="info"
     (onClick)="printReport()"
   />
   ```
