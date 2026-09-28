import { Injectable } from '@angular/core';

export interface PrintCardField {
  label: string;
  value: string | number | null | undefined;
  fullWidth?: boolean;
}

export interface PrintCardSection {
  title?: string;
  fields: PrintCardField[];
}

export interface PrintCardSignature {
  label: string;
}

export interface PrintCardItem {
  title: string;
  subtitle?: string;
  badge?: string;
  sections: PrintCardSection[];
  footerNote?: string;
  signatures?: PrintCardSignature[];
}

export interface PrintCardsOptions {
  documentTitle: string;
  cards: PrintCardItem[];
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'A5';
  showCounter?: boolean;
}

export interface PrintTableColumn<T = any> {
  header: string;
  field: keyof T | string;
  formatter?: (val: any, row: T) => string;
  compact?: boolean;
  align?: 'right' | 'center' | 'left';
}

export interface PrintTableOptions<T = any> {
  title: string;
  columns: PrintTableColumn<T>[];
  data: T[];
  landscape?: boolean;
  subtitle?: string;
  showIndex?: boolean;
  customHeaderHtml?: string;
  customFooterHtml?: string;
}

export interface PrintElementOptions {
  title?: string;
  landscape?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private static readonly VAZIRMATN_FONT_CSS = `
    @font-face {
      font-family: 'Vazirmatn';
      src: url('/fonts/vazirmatn/Vazirmatn-RD-FD-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Vazirmatn';
      src: url('/fonts/vazirmatn/Vazirmatn-RD-FD-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  `;

  /**
   * Universal Voucher / Card Print:
   * Dynamic, configurable multi-section vouchers (e.g. permits, waybills, receipts)
   * with whole-word wrapping, custom signatures, sections, and zero horizontal clipping.
   */
  public printCards(options: PrintCardsOptions): void {
    if (!options.cards || options.cards.length === 0) {
      console.warn('[PrintService] No cards provided to printCards.');
      return;
    }

    const docTitle = options.documentTitle || 'گزارش چاپی';
    const orientation = options.orientation || 'portrait';
    const pageSize = options.pageSize || 'A4';
    const showCounter = options.showCounter !== false;
    const dateFa = new Date().toLocaleDateString('fa-IR');

    const cardsHtml = options.cards
      .map((card, idx) => {
        const sectionsHtml = card.sections
          .map(sec => {
            const secTitle = sec.title
              ? `<div class="section-title">${sec.title}</div>`
              : '';
            const fieldsHtml = sec.fields
              .map(
                f => `
                <div class="field-box ${f.fullWidth ? 'col-span-full' : ''}">
                  <span class="field-label">${f.label}:</span>
                  <span class="field-value">${f.value ?? '-'}</span>
                </div>
              `
              )
              .join('');

            return `
              <div class="section-container">
                ${secTitle}
                <div class="fields-grid">
                  ${fieldsHtml}
                </div>
              </div>
            `;
          })
          .join('');

        const signaturesHtml = card.signatures?.length
          ? `
            <div class="signatures">
              ${card.signatures.map(s => `<div class="sig-box">${s.label}</div>`).join('')}
            </div>
          `
          : '';

        return `
          <div class="permit-card">
            <!-- Card Header -->
            <div class="card-header">
              <div class="header-main">
                <span class="permit-title">${card.title}</span>
                ${card.subtitle ? `<span class="permit-subtitle">${card.subtitle}</span>` : ''}
              </div>
              <div class="header-side">
                ${card.badge ? `<span class="badge">${card.badge}</span>` : ''}
                ${showCounter ? `<span class="card-counter">برگ ${idx + 1} از ${options.cards.length}</span>` : ''}
              </div>
            </div>

            <!-- Card Body / Sections -->
            <div class="card-body">
              ${sectionsHtml}
            </div>

            <!-- Card Footer -->
            <div class="card-footer">
              ${signaturesHtml}
              <div class="footer-meta">
                <span>تاریخ چاپ: ${dateFa}</span>
                ${card.footerNote ? `<span>${card.footerNote}</span>` : ''}
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
        <head>
          <meta charset="utf-8">
          <title>${docTitle}</title>
          <style>
            ${PrintService.VAZIRMATN_FONT_CSS}

            @page {
              size: ${pageSize} ${orientation};
              margin: 10mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            html, body {
              font-family: 'Vazirmatn', Tahoma, sans-serif;
              direction: rtl;
              text-align: right;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
              color: #1e293b;
              font-size: 10px;
            }
            .permit-card {
              border: 2px solid #0f172a;
              border-radius: 8px;
              margin-bottom: 12mm;
              padding: 10px 14px;
              background-color: #ffffff;
              page-break-inside: avoid;
            }
            .card-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #0f172a;
              padding-bottom: 6px;
              margin-bottom: 8px;
            }
            .permit-title {
              font-size: 13px;
              font-weight: 700;
              color: #0f172a;
              margin-left: 10px;
            }
            .permit-subtitle {
              font-size: 10px;
              color: #475569;
              font-weight: 400;
            }
            .header-side {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .badge {
              background-color: #f1f5f9;
              border: 1px solid #cbd5e1;
              color: #0f172a;
              font-size: 9px;
              font-weight: 700;
              padding: 2px 8px;
              border-radius: 4px;
            }
            .card-counter {
              font-size: 9px;
              color: #64748b;
            }
            .section-container {
              margin-bottom: 6px;
            }
            .section-title {
              font-size: 9.5px;
              font-weight: 700;
              color: #1e293b;
              background-color: #f8fafc;
              border-right: 3px solid #0f172a;
              padding: 2px 6px;
              margin-bottom: 4px;
            }
            .fields-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 4px 8px;
            }
            .field-box {
              display: flex;
              align-items: baseline;
              gap: 4px;
              padding: 2px 0;
              font-size: 9px;
              line-height: 1.3;
            }
            .col-span-full {
              grid-column: 1 / -1;
            }
            .field-label {
              color: #475569;
              font-weight: 700;
              white-space: nowrap;
            }
            .field-value {
              color: #0f172a;
              font-weight: 500;
              word-break: normal;
              overflow-wrap: normal;
            }
            .card-footer {
              border-top: 1px dashed #94a3b8;
              margin-top: 8px;
              padding-top: 6px;
            }
            .signatures {
              display: flex;
              justify-content: space-around;
              margin-bottom: 6px;
            }
            .sig-box {
              border-bottom: 1px dotted #64748b;
              width: 140px;
              text-align: center;
              font-size: 8.5px;
              color: #64748b;
              padding-bottom: 20px;
            }
            .footer-meta {
              display: flex;
              justify-content: space-between;
              font-size: 8px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          ${cardsHtml}
        </body>
      </html>
    `;

    this.renderHtmlInIframe(html);
  }

  /**
   * Universal Tabular Print:
   * Data-driven semantic <table> from any dataset and column configuration.
   */
  public printTable<T extends object>(options: PrintTableOptions<T>): void {
    if (!options.data || options.data.length === 0) {
      console.warn('[PrintService] No data provided to printTable.');
      return;
    }

    const title = options.title || 'گزارش';
    const orientation = options.landscape !== false ? 'landscape' : 'portrait';
    const showIndex = options.showIndex !== false;
    const dateFa = new Date().toLocaleDateString('fa-IR');

    const theadCols = options.columns
      .map(
        col =>
          `<th class="${col.compact ? 'col-compact' : 'col-flexible'}" style="text-align: ${col.align || (col.compact ? 'center' : 'right')}">${col.header}</th>`
      )
      .join('');

    const tbodyRows = options.data
      .map((row, index) => {
        const cells = options.columns
          .map(col => {
            const rawVal = (row as Record<string, any>)[col.field as string];
            const val = col.formatter ? col.formatter(rawVal, row) : (rawVal ?? '-');
            const cssClass = col.compact ? 'col-compact' : 'col-flexible';
            const align = col.align || (col.compact ? 'center' : 'right');
            return `<td class="${cssClass}" style="text-align: ${align}">${val}</td>`;
          })
          .join('');
        const indexCell = showIndex
          ? `<td class="row-num col-compact">${index + 1}</td>`
          : '';
        return `<tr>${indexCell}${cells}</tr>`;
      })
      .join('');

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            ${PrintService.VAZIRMATN_FONT_CSS}

            @page {
              size: A4 ${orientation};
              margin: 8mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            html, body {
              font-family: 'Vazirmatn', Tahoma, sans-serif;
              direction: rtl;
              text-align: right;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
              color: #000000;
              font-size: 10px;
            }
            .header-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #1f2937;
              padding-bottom: 6px;
              margin-bottom: 10px;
            }
            .header-title {
              font-size: 14px;
              font-weight: 700;
              margin: 0;
            }
            .header-meta {
              font-size: 10px;
              color: #4b5563;
              display: flex;
              gap: 16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              table-layout: auto;
              direction: rtl;
            }
            thead {
              display: table-header-group;
            }
            tr {
              page-break-inside: avoid;
            }
            th, td {
              border: 1px solid #9ca3af;
              padding: 4px 6px;
              font-size: 9px;
              line-height: 1.4;
              word-break: normal;
              overflow-wrap: normal;
              white-space: normal;
              hyphens: none;
            }
            th {
              background-color: #e5e7eb;
              font-weight: 700;
              color: #111827;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .col-compact {
              width: 1%;
              white-space: nowrap !important;
            }
            .col-flexible {
              min-width: 60px;
            }
            .row-num {
              width: 28px;
              font-weight: 700;
              text-align: center;
              background-color: #f3f4f6;
            }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <h1 class="header-title">${title}</h1>
              ${options.subtitle ? `<div style="font-size: 10px; color: #4b5563; margin-top: 2px;">${options.subtitle}</div>` : ''}
            </div>
            <div class="header-meta">
              <span>تعداد رکورد: <strong>${options.data.length}</strong></span>
              <span>تاریخ چاپ: <strong>${dateFa}</strong></span>
            </div>
          </div>
          ${options.customHeaderHtml || ''}
          <table>
            <thead>
              <tr>
                ${showIndex ? '<th class="row-num col-compact">ردیف</th>' : ''}
                ${theadCols}
              </tr>
            </thead>
            <tbody>
              ${tbodyRows}
            </tbody>
          </table>
          ${options.customFooterHtml || ''}
        </body>
      </html>
    `;

    this.renderHtmlInIframe(html);
  }

  /**
   * Element-based printing fallback for static/custom styled DOM containers.
   */
  public printElement(elementId: string, options: PrintElementOptions = {}): void {
    const content = document.getElementById(elementId);
    if (!content) {
      console.warn(`[PrintService] Element with id '${elementId}' not found.`);
      return;
    }

    const title = options.title || document.title || 'چاپ';
    const orientation = options.landscape ? 'landscape' : 'portrait';

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            ${PrintService.VAZIRMATN_FONT_CSS}
            @page { size: A4 ${orientation}; margin: 10mm; }
            html, body {
              font-family: 'Vazirmatn', Tahoma, sans-serif;
              direction: rtl;
              text-align: right;
              margin: 0;
            }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `;

    this.renderHtmlInIframe(html);
  }

  private renderHtmlInIframe(html: string): void {
    const frame = document.createElement('iframe');
    frame.style.position = 'fixed';
    frame.style.right = '10000px';
    frame.style.bottom = '10000px';
    frame.style.width = '0';
    frame.style.height = '0';
    frame.style.border = '0';
    document.body.appendChild(frame);

    const doc = frame.contentWindow?.document;
    if (!doc) {
      frame.remove();
      return;
    }

    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 1000);
    }, 250);
  }
}
