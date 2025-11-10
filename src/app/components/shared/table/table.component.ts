import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TableConfig } from 'app/constants/ui/table.ui';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonComponent, ButtonSeverity } from '../button/button.component';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortEvent } from 'primeng/api';

export enum TableColumnType {
  TEXT,
  ICON,
  BUTTON,
  BUTTON_ICON,
  BOOLEAN,
  CHECKBOX,
}

export interface TableColumn<T extends object> {
  header: string;
  field: keyof T;
  type?: TableColumnType;
  class?: string | ((row: T) => string);
  buttonSeverity?: ButtonSeverity;
  onAction?: (row: T) => void | Promise<void>;
  sorting?: boolean;
  format?: 'currency';
}

type SelectionMode = 'single' | 'multiple';

export const editCell = {
  config: {
    header: 'ویرایش',
    type: TableColumnType.BUTTON_ICON,
    buttonSeverity: 'info' as ButtonSeverity,
    class: 'py-3 scale-90',
    sorting: false,
  },
  value: 'pi pi-pencil',
};

export const deleteCell = {
  config: {
    header: 'حذف',
    type: TableColumnType.BUTTON_ICON,
    buttonSeverity: 'danger' as ButtonSeverity,
    class: 'py-3 scale-90',
    sorting: false,
  },
  value: 'pi pi-trash',
};

export interface TablePage {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CheckboxModule, ButtonComponent, NgClass, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends object> {
  @Input() rows: (T | null)[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() config = TableConfig;
  @Input() rowClass: string | ((row: T) => string) = '';
  @Input() enableCaptionButton = false;
  @Input() captionButtonLabel = 'جدید';
  @Input() loading = false;
  @Input() customSort = false;
  @Output() clickCaptionButton = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<TablePage>();
  @Output() sortFunction = new EventEmitter<SortEvent>();
  @Input() selectionMode?: SelectionMode;

  // Overload signatures — so parent gets correct type automatically
  @Output() rowSelect: EventEmitter<T>;
  @Output() rowUnSelect: EventEmitter<T>;
  @Output() rowUnSelectMultiple: EventEmitter<T[]>;
  @Output() rowSelectMultiple?: EventEmitter<T[]>;

  readonly ColumnType = TableColumnType;
  readonly defaultButtonSeverity: ButtonSeverity = 'green';
  selectedItems: T[] = [];
  private readonly tablePage = signal<TablePage>({
    pageSize: this.config.rows,
    page: 1,
  });

  constructor() {
    this.rowSelect = new EventEmitter<T>();
    this.rowSelectMultiple = new EventEmitter<T[]>();

    this.rowUnSelect = new EventEmitter<T>();
    this.rowUnSelectMultiple = new EventEmitter<T[]>();
  }

  async onCheckboxChange(
    event: CheckboxChangeEvent,
    row: T,
    column: TableColumn<T>
  ) {
    row[column.field] = event.checked as T[keyof T];
    await column.onAction?.(row);
  }

  getColumnClass(column: TableColumn<T>, row: T): string {
    return typeof column.class === 'function'
      ? column.class(row)
      : (column.class ?? '');
  }

  getTdClass(row: T): string {
    return typeof this.rowClass === 'function'
      ? this.rowClass(row)
      : this.rowClass;
  }

  getColumnType(column: TableColumn<T>): TableColumnType {
    return column.type ?? TableColumnType.TEXT;
  }

  rowTableSelect<M>(data: M) {
    if (!data) return;

    if (Array.isArray(data)) {
      this.rowSelectMultiple?.emit(data as T[]);
    } else {
      this.rowSelect.emit(data as unknown as T);
    }
  }

  rowTableUnSelect<M>(data: M) {
    if (!data) return;

    if (Array.isArray(data)) {
      this.rowUnSelectMultiple?.emit(data as T[]);
    } else {
      this.rowUnSelect.emit(data as unknown as T);
    }
  }

  hasSorting(column: TableColumn<T>): boolean {
    return this.rows.length > 1 && (column.sorting ?? true);
  }

  applyFormat(column: TableColumn<T>, value: string): string {
    if (column?.format === 'currency') {
      const num = Number(value);
      if (isNaN(num)) {
        return value;
      }
      return this.formatCurrency(value.toString());
    }
    return value;
  }

  onPageChange(event: TablePageEvent) {
    const page = event.first / event.rows + 1;
    const pageSize = event.rows;
    this.pageChange.emit({ page, pageSize });
  }

  onCustomSort(event: SortEvent) {
    this.sortFunction.emit(event);
  }

  isFirstRowPage(i: number): boolean {
    let base = this.tablePage().page - 1;
    base *= this.tablePage().pageSize;
    if (i === base) {
      return true;
    }
    return false;
  }

  clearSelections() {
    this.selectedItems = [];
  }
  private formatCurrency(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
