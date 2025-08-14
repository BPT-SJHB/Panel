import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConfig } from 'app/constants/ui/table.ui';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ButtonComponent, ButtonSeverity } from '../button/button.component';
import { NgClass } from '@angular/common';

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
}

type SelectionMode = 'single' | 'multiple';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CheckboxModule, ButtonComponent, NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends object> {
  @Input() rows: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() config = TableConfig;

  @Input() enableCaptionButton = false;
  @Input() captionButtonLabel = 'جدید';
  @Output() clickCaptionButton = new EventEmitter<void>();

  @Input() selectionMode: SelectionMode = 'single';

  // Overload signatures — so parent gets correct type automatically
  @Output() rowSelect: EventEmitter<T>;
  @Output() rowSelectMultiple?: EventEmitter<T[]>;

  readonly ColumnType = TableColumnType;
  readonly defaultButtonSeverity: ButtonSeverity = 'green';

  constructor() {
    // Initialize correct emitter based on mode
    this.rowSelect = new EventEmitter<T>();
    this.rowSelectMultiple = new EventEmitter<T[]>();
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
}
