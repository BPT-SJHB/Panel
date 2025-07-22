
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-search-auto-complete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    InputGroupAddonModule,
    InputGroupModule
],
  templateUrl: './search-auto-complete.component.html',
  styleUrl: './search-auto-complete.component.scss',
})
export class SearchAutoCompleteComponent<T extends Record<string, any>>
  implements OnInit, OnChanges
{
  // Cache for lazy search results to optimize repeated queries
  private cachedResults: T[] = [];

  // Cache key to compare and avoid redundant searches (default to some fixed hash)
  private lastSearchKey =
    '7587ae60f0243cf7b6a15b4aa553d6d53c1ccf7401f6be1d5b8ad66ee7cf1d9d';

  suggestions: T[] = [];             // Current suggestions shown in dropdown
  showEmptyMessage = false;          // Show "No results found" message flag
  loading = false;                   // Loading state for async search

  focusedCached = false;             // Flag to manage caching behavior on focus

  // ---------- INPUTS ----------

  /** Placeholder text for the input box */
  @Input() placeholder = 'جستجو';

  /** Whether input is readonly */
  @Input() readOnly = false;

  /** Whether input is disabled */
  @Input() disabled = false;

  /** Icon CSS class to display in input */
  @Input() icon = 'pi pi-search';

  /** Label text shown instead of icon (if provided) */
  @Input() label = '';

  /** Caching strategy mode */
  @Input() cachingMode: 'CharacterPrefix' | 'Focus' = 'CharacterPrefix';

  /** Width CSS value for addon (icon/label) */
  @Input() addonWidth = '';

  /** Reactive FormControl bound to the input */
  @Input() control = new FormControl('');

  /** Enable or disable caching */
  @Input() cachingEnabled = true;

  /** Object property used for displaying suggestion labels */
  @Input() optionLabel = 'label';

  /** Object property used as suggestion value */
  @Input() optionValue = 'value';

  /** Minimum characters before triggering search */
  @Input() minLength = 3;

  /** List of all options for client-side filtering */
  @Input() allOptions: T[] = [];

  /** Whether to show icon inside input for selected option */
  @Input() showIconOptionSelected = false;

  /**
   * Optional asynchronous search function.
   * Should return a promise resolving to filtered results based on query.
   */
  @Input() lazySearch?: (query: string) => Promise<T[]>;

  // ---------- OUTPUTS ----------

  /** Emits current input string value */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits the selected suggestion item */
  @Output() selectSuggestion = new EventEmitter<T>();

  // ---------- LIFECYCLE HOOKS ----------

  /** Initialize the component, update control disabled state */
  ngOnInit(): void {
    this.setDisabledState();
  }

  /**
   * Detect changes on inputs such as disabled
   * Update the FormControl state accordingly.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  // ---------- PRIVATE HELPERS ----------

  /** Enable or disable the input control based on `disabled` input */
  private setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  /**
   * On input focus event handler
   * Immediately blur if input is disabled to prevent interaction.
   */
  onFocusInput(input: EventTarget | null): void {
    const inputElement = input as HTMLInputElement;
    if (this.disabled) {
      inputElement?.blur();
      return;
    }
  }

  /**
   * On input blur event handler
   * If readonly, mark control untouched to prevent validation.
   * Reset focusedCached flag for caching logic.
   */
  onBlurInput(_: EventTarget | null): void {
    if (this.readOnly) {
      this.control.markAsUntouched();
      return;
    }
    if (this.cachingMode === "Focus") {
      this.focusedCached = false;
      this.clearCached();
    }
  }

  // ---------- SEARCH HANDLER ----------

  /**
   * Handles user input search events.
   * Uses client-side filtering or lazy async search with caching.
   */
  async onSearch(event: { query: string }) {
    const query = event.query.trimStart();

    // Clear suggestions if query is too short
    if (query.length < this.minLength) {
      this.suggestions = [];
      this.showEmptyMessage = false;
      return;
    }

    // Client-side filtering when no async lazy search function provided
    if (!this.lazySearch) {
      this.suggestions = this.allOptions.filter((item) =>
        (item[this.optionLabel] as string)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      this.showEmptyMessage = this.suggestions.length === 0;
      return;
    }

    // Lazy search mode with caching enabled
    const currentKey = query.substring(0, this.minLength);

    if (this.cachingEnabled) {
      const isCharPrefixMatch =
        this.cachingMode === 'CharacterPrefix' &&
        currentKey === this.lastSearchKey;
        
      const isFocusMode = this.cachingMode === 'Focus' && this.focusedCached;
      
      if (isCharPrefixMatch || isFocusMode) {
        if (currentKey === this.lastSearchKey) {
          // Filter cached results to refine suggestions without calling lazySearch again
          this.suggestions = this.cachedResults.filter((item) =>
            (item[this.optionLabel] as string)
          .toLowerCase()
          .includes(query.toLowerCase())
        );
          this.showEmptyMessage = this.suggestions.length === 0;
          return;
        }
      }
    }

    // Fetch fresh results asynchronously from lazySearch
    try {
      this.loading = true;

      // Use cached key or full query depending on cachingEnabled flag
      const searchQuery = this.cachingEnabled ? currentKey : query;
      const result = await this.lazySearch(searchQuery);

      // Update cache and suggestions
      this.lastSearchKey = currentKey;
      this.cachedResults = result;
      this.suggestions = result;
      this.focusedCached = true;
      this.showEmptyMessage = result.length === 0;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Emits the selected suggestion when user picks an item.
   */
  onSelectAutoComplete(event: AutoCompleteSelectEvent) {
    this.selectSuggestion.emit(event.value);
  }

  /**
   * Emits the current input value on input changes.
   */
  onValueChanged(input: any) {
    this.valueChange.emit(input.value);
  }

  /**
   * Clears the cache to reset lazy search results.
   */
  clearCached(): void {
    this.lastSearchKey =
      '7587ae60f0243cf7b6a15b4aa553d6d53c1ccf7401f6be1d5b8ad66ee7cf1d9d';
    this.cachedResults = [];
  }
}
