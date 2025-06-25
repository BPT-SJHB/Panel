import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { SearchInputComponent } from '../../shared/inputs/search-input/search-input.component';
import { ButtonModule } from 'primeng/button';

interface SelectionKey {
  checked: boolean;
  partialChecked?: boolean;
  isHidden: boolean;
}

export interface TreeTableChangedData {
  parent?: any;
  children: any[];
}

@Component({
  selector: 'app-tree-table-checkbox',
  templateUrl: './tree-table-checkbox.component.html',
  styleUrl: './tree-table-checkbox.component.scss',
  imports: [TreeTableModule, NgClass, ButtonModule,SearchInputComponent],
})
export class TreeTableCheckboxComponent implements OnInit, OnChanges {
  @ViewChild('treeTable') tt!: TreeTable;

  @Input() tree: TreeNode[] = [];
  @Input() parentField = '';
  @Input() childField = '';
  @Input() cols: string[] = [];
  @Input() rows: string[][] = [];
  @Input() enabledSearch = false;
  @Input() searchFields: string[] = [];
  @Input() searchPlaceholder = '';
  @Input() paginator = false;
  @Input() rowsPerPage = 10;
  @Input() paginatorLocale = 'en';
  @Input() enabledAutoSearch: boolean = true;

  @Output() onTableCheckBoxChange = new EventEmitter<TreeTableChangedData>();
  @Output() onSearch = new EventEmitter<string>();

  treeMap = new Map<string, TreeNode>();
  selectionKeys: Record<string, SelectionKey> = {};
  lastSelectionKeys: Record<string, SelectionKey> = {};
  searchTerm = "";

  ngOnInit(): void {
    this.tree = this.initializeTree();
    this.buildTreeMap(this.tree);
    this.lastSelectionKeys = structuredClone(this.selectionKeys);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tree']) {
      this.tree = this.initializeTree();
      this.buildTreeMap(this.tree);
      this.lastSelectionKeys = structuredClone(this.selectionKeys);
    }
  }

  selectionKeysChanged(newKeys: Record<string, SelectionKey>): void {
    const allKeys = new Set([
      ...Object.keys(this.lastSelectionKeys),
      ...Object.keys(newKeys),
    ]);

    const children: any[] = [];
    let parent: any | null = null;

    for (const key of allKeys) {
      const old = this.lastSelectionKeys[key];
      const current = newKeys[key];

      const oldChecked = old?.checked ?? false;
      const oldPartial = old?.partialChecked ?? false;
      const newChecked = current?.checked ?? false;
      const newPartial = current?.partialChecked ?? false;

      const hasChanged = oldChecked !== newChecked || oldPartial !== newPartial;
      if (!hasChanged) continue;

      const node = this.treeMap.get(key);
      if (!node) continue;

      const isParent = key.length < 2;
      if (isParent) {
        const value = newChecked || newPartial;
        if (node.data[this.parentField] !== value) {
          node.data[this.parentField] = value;
          parent = node.data;
        }
      } else {
        if (node.data[this.childField] !== newChecked) {
          node.data[this.childField] = newChecked;
          children.push(node.data);
        }
      }
    }

    this.onTableCheckBoxChange.emit({ parent, children });
    this.lastSelectionKeys = structuredClone(newKeys);
  }

  private initializeTree(): TreeNode[] {
    this.selectionKeys = {};
    return this.tree.map((node, i) => this.setKeysRecursively(node, `${i}`));
  }

  private setKeysRecursively(node: TreeNode, path: string): TreeNode {
    const parentChecked = !!node.data?.[this.parentField];
    let hasCheckedChild = false;
    let hasUncheckedChild = false;

    const children =
      node.children?.map((child, i) => {
        const childKey = `${path}-${i}`;
        const checked = !!child.data?.[this.childField];
        this.selectionKeys[childKey] = { checked, isHidden: false };

        checked ? (hasCheckedChild = true) : (hasUncheckedChild = true);

        return { ...child, key: childKey };
      }) ?? [];

    const partialChecked = hasCheckedChild && hasUncheckedChild;
    const checked = partialChecked ? false : parentChecked;

    this.selectionKeys[path] = { checked, partialChecked, isHidden: false };
    return { ...node, key: path, children };
  }

  private buildTreeMap(nodes: TreeNode[]): void {
    for (const node of nodes) {
      if (!node.key) continue;
      this.treeMap.set(node.key, node);
      if (node.children?.length) {
        this.buildTreeMap(node.children);
      }
    }
  }

  filterTree(query: string): void {
    if (this.enabledAutoSearch) {
      this.filters(query);
      this.onSearch.emit(query);
    }
  }

  onClickSearch() {
    if (!this.enabledAutoSearch) {
      this.filters(this.searchTerm);
      this.onSearch.emit(this.searchTerm);
    }
  }

  private filters(query: string) {
    const q = query.trim().toLowerCase();
    this.tree.forEach((node) => {
      const parentMatch = this.searchFields.some((filed) =>
        node.data?.[filed]?.toLowerCase().includes(q)
      );

      let matchedChild = false;

      node.children?.forEach((child) => {
        const childMatch = this.searchFields.some((filed) =>
          child.data?.[filed]?.toLowerCase().includes(q)
        );
        if (childMatch) {
          child.styleClass = '';
          matchedChild = true;
        } else {
          child.styleClass = 'hidden';
        }
      });

      if (parentMatch || matchedChild) {
        node.styleClass = '';
      } else {
        node.styleClass = 'hidden';
      }
    });
  }
}
