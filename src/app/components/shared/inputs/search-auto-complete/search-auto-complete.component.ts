import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextInputComponent } from '../text-input/text-input.component';
import { NgClass } from '@angular/common';
import { uuidV4 } from 'app/utils/uuid';

@Component({
  selector: 'app-search-auto-complete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    TextInputComponent,
    InputGroupAddonModule,
    InputGroupModule,
    NgClass,
  ],
  templateUrl: './search-auto-complete.component.html',
  styleUrl: './search-auto-complete.component.scss',
})
export class SearchAutoCompleteComponent<T extends Record<string, any>>
  implements AfterViewInit
{
  @ViewChild('dropdownContainer', { static: true })
  dropdownContainer!: ElementRef<HTMLElement>;

  private cachedResults: T[] = [];
  private lastSearchKey = '---';
  private width = signal('100%');

  suggestions = signal<T[]>([]);
  loading = signal<boolean>(false);
  hoverIndex = signal(0);
  isDropDownHidden = signal(true);

  isResultEmpty = computed(
    () =>
      this.suggestions().length === 0 &&
      !this.loading() &&
      (this.control.value?.length ?? 0) >= this.minLength,
  );

  @Input() placeholder = 'جستجو';
  @Input() id = uuidV4();
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() icon = 'pi pi-search';
  @Input() label = '';
  @Input() cachingMode: 'CharacterPrefix' | 'Focus' = 'CharacterPrefix';
  @Input() addonWidth = '';
  @Input() control = new FormControl('');
  @Input() cachingEnabled = true;
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() minLength = 3;
  @Input() allOptions: T[] = [];
  @Input() showIconOptionSelected = false;
  @Input() lazySearch?: (query: string) => Promise<T[]>;

  @Output() valueChange = new EventEmitter<string>();
  @Output() selectSuggestion = new EventEmitter<T>();

  ngAfterViewInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.hoverIndex.set(-1);
      this.onSearch(value || '');
      this.isDropDownHidden.set(false);
      this.valueChange.emit(value || '');
    });
  }

  onFocusInput(input: HTMLInputElement | null): void {
    this.width.set(`${input?.clientWidth}px`);

    if (this.cachingMode === 'Focus') {
      this.onSearch(this.control.value ?? '');
    }
    this.isDropDownHidden.set(false);
  }

  private filterSuggestions(source: T[], query: string): T[] {
    const q = query.toLowerCase();
    return source.filter((item) =>
      (item[this.optionLabel] as string).toLowerCase().includes(q),
    );
  }

  private async fetchAndCacheSuggestions(query: string) {
    const currentKey = query.substring(0, this.minLength);
    const searchQuery = this.cachingEnabled ? currentKey : query;

    try {
      this.loading.set(true);
      const result = await this.lazySearch!(searchQuery);
      this.lastSearchKey = currentKey;
      this.cachedResults = result;
      this.suggestions.set(result);
    } finally {
      this.loading.set(false);
    }
  }

  async onSearch(term: string) {
    const query = term.trimStart();

    if (query.length < this.minLength) {
      this.suggestions.set([]);
      return;
    }

    if (!this.lazySearch) {
      this.suggestions.set(this.filterSuggestions(this.allOptions, query));
      return;
    }

    const currentKey = query.substring(0, this.minLength);
    if (this.cachingEnabled && currentKey === this.lastSearchKey) {
      this.suggestions.set(this.filterSuggestions(this.cachedResults, query));
      return;
    }

    await this.fetchAndCacheSuggestions(query);
  }

  onSelectAutoComplete(value: T) {
    this.control.setValue(value[this.optionLabel] || this.control.value);
    this.selectSuggestion.emit(value);
    this.isDropDownHidden.set(true);
  }

  clearCached(): void {
    this.lastSearchKey = '---';
    this.cachedResults = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const inside = this.dropdownContainer.nativeElement.contains(
      event.target as Node,
    );
    if (!inside) {
      this.isDropDownHidden.set(true);
      this.clearCached();
    }
  }

  onKeydown(event: KeyboardEvent) {
    const len = this.suggestions().length;
    if (len === 0) return;

    const code = event.code;
    const current = this.hoverIndex();

    switch (code) {
      case 'Enter': {
        event.preventDefault();
        const selected = this.suggestions()[current];
        if (selected) {
          this.onSelectAutoComplete(selected);
        }
        break;
      }
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        const delta = code === 'ArrowDown' ? 1 : -1;
        const next = (current + delta + len) % len;
        this.hoverIndex.set(next);
        this.scrollToIndex(next);
        break;
      }
      default:
        break;
    }
  }

  private scrollToIndex(index: number) {
    requestAnimationFrame(() => {
      const item = document.getElementById(`${this.id}-${index}`);
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  getDropDownStyle() {
    const valueLen = this.control.value?.length ?? 0;
    let count = this.suggestions().length - 1;
    if (this.isDropDownHidden() || valueLen < this.minLength) {
      return { height: '0px', width: this.width() };
    }

    count = Math.max(count, 1);
    const itemHeight = 3.55; // px per item
    const max = itemHeight * 4; // max px
    const height = Math.min(itemHeight * count, max);
    return { height: `${height}rem`, width: this.width() };
  }
}
