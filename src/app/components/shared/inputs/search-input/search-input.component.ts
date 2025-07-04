import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { ValidationField } from 'app/constants/validation-schema';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    TextInputComponent,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent<T> implements OnInit, OnDestroy {
  private valueChangesSub?: Subscription;

  // -------------------------
  // 🔧 Core Control
  // -------------------------
  @Input() control = new FormControl('');
  @Input() validationField: ValidationField | null = null;

  // -------------------------
  // 🎨 UI Customization
  // -------------------------
  @Input() placeholder = '';
  @Input() label = '';
  @Input() icon = 'pi pi-search';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() addonWidth: string | null = null;
  @Input() buttonLabel = 'جستجو';

  // -------------------------
  // 🔍 Search Behavior
  // -------------------------
  @Input() data: T[] = [];
  @Input() lazySearch?: (query: string) => Promise<T[]>;
  @Input() filterFn?: (item: T, query: string) => boolean;
  @Input() minLength = 3; // Minimum length to start filtering
  @Input() optionLabel = 'label'; // Property to show in dropdown (if applicable)
  @Input() optionValue = 'value'; // Property to use as value (if applicable)
  @Input() autoSearch = false; // If true, triggers search on input change
  @Input() cachingEnabled = true; // Enables simple caching for repeated queries
  @Input() debounceInputChanged = 300; // Delay before triggering auto search (ms)
  @Input() showAllWhenQueryTooShort = false;

  // -------------------------
  // 📤 Output Events
  // -------------------------
  @Output() input = new EventEmitter<string>(); // Emits on raw user input (no debounce)
  @Output() search = new EventEmitter<T[]>(); // Emits on actual search result

  // -------------------------
  // 🧠 Internal State
  // -------------------------
  cachedData: T[] = [];
  lastSearchKey = '';

  /**
   * Subscribe to control value changes with debounce and trigger search if autoSearch is enabled.
   */
  ngOnInit(): void {
    this.valueChangesSub = this.control.valueChanges
      .pipe(debounceTime(this.debounceInputChanged), distinctUntilChanged())
      .subscribe((value) => {
        if (this.autoSearch) {
          this.onSearch(value ?? '');
        }
      });
  }

  /**
   * Unsubscribe to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  /**
   * Main search logic, supports optional lazy loading and basic caching.
   */
  async searchData(query: string, forceUpdate = false): Promise<T[]> {
    query = query.trimStart();

    if (query.length < this.minLength || !this.filterFn) {
      if (this.showAllWhenQueryTooShort) {
        return this.data; // return full data when flag is true
      }
      return []; // otherwise return empty
    }

    // Static filtering (local)
    if (!this.lazySearch) {
      return this.data.filter((item) => this.filterFn!(item, query));
    }

    // Cached filtering logic
    const currentKey = query.substring(0, this.minLength);
    if (
      !forceUpdate &&
      this.cachingEnabled &&
      currentKey === this.lastSearchKey
    ) {
      return this.cachedData.filter((item) => this.filterFn!(item, query));
    }

    // Lazy load new results
    const result = await this.lazySearch(query);
    this.lastSearchKey = currentKey;
    this.cachedData = result;
    return result;
  }

  /**
   * Public method to force refresh search results (bypasses cache).
   */
  refreshSearch(): Promise<T[]> {
    const query = this.control.value ?? '';
    return this.searchData(query, true);
  }

  /**
   * Triggers a search and emits the result.
   */
  async onSearch(query: string): Promise<void> {
    const results = await this.searchData(query);
    this.search.emit(results);
  }

  /**
   * Emits raw input text immediately (e.g., for external filtering).
   */
  onInputValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.input.emit(value);
  }

  /**
   * Called when the user clicks the search button manually.
   */
  clickSearchButton(): void {
    if (!this.autoSearch) {
      this.onSearch(this.control.value ?? '');
    }
  }
}
