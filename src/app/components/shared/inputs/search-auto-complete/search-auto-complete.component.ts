import { CommonModule } from '@angular/common';
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
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
  templateUrl: './search-auto-complete.component.html',
  styleUrl: './search-auto-complete.component.scss',
})
export class SearchAutoCompleteComponent<T extends Record<string, any>>
  implements OnInit, OnChanges
{
  private cachedResults: T[] = []; // Cache for lazy search results to optimize repeated queries
  private lastSearchKey = ''; // Key for cache comparison to avoid redundant searches

  suggestions: T[] = []; // List of suggestions currently displayed
  showEmptyMessage = false; // Flag to show "No results found" message
  loading = false;

  // ---------- INPUTS ----------

  /** Placeholder text displayed inside the input box */
  @Input() placeholder = 'جستجو';

  /** Whether the input is read-only */
  @Input() readOnly = false;

  /** Whether the input is disabled */
  @Input() disabled = false;

  /** CSS class for the icon displayed on the left side of the input */
  @Input() icon = 'pi pi-search';

  /** Text label shown instead of the icon when provided */
  @Input() label = '';

  /** CSS width for the icon or label addon */
  @Input() addonWidth = '';

  /** FormControl bound to the input for reactive forms integration */
  @Input() control = new FormControl('');

  /** Enable caching of lazy search results for performance */
  @Input() cachingEnabled = true;

  /** Object property name used to display the label for suggestions */
  @Input() optionLabel = 'label';

  /** Object property name used as the value for suggestions */
  @Input() optionValue = 'value';

  /** Minimum number of characters before search is triggered */
  @Input() minLength = 3;

  /** List of all options to filter when using normal (client-side) search */
  @Input() allOptions: T[] = [];

  /** Whether to show an icon inside the input when an option is selected */
  @Input() showIconOptionSelected = false;

  /**
   * Optional async function for lazy search mode.
   * Should return a promise resolving to filtered results based on the query.
   */
  @Input() lazySearch?: (query: string) => Promise<T[]>;

  // ---------- OUTPUTS ----------

  /** Emits the current input value when it changes */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits the selected suggestion item when a user selects one */
  @Output() selectSuggestion = new EventEmitter<T>();

  // ---------- LIFECYCLE HOOKS ----------

  /** Initialize component state and control disabled state */
  ngOnInit(): void {
    this.setDisabledState();
  }

  /**
   * Detect changes on @Input properties (disabled)
   * to update the FormControl disabled/enabled state accordingly.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState();
    }
  }

  // ---------- PRIVATE HELPERS ----------

  /** Enable or disable the FormControl based on the `disabled` input */
  private setDisabledState(): void {
    if (this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  /** On input focus: blur immediately if disabled to prevent interaction */
  onFocusInput(input: EventTarget | null): void {
    const inputElement = input as HTMLInputElement;
    if (this.disabled) {
      inputElement?.blur();
    }
  }

  /** On input blur: mark untouched if readonly to prevent validations */
  onBlurInput(_: EventTarget | null): void {
    if (this.readOnly) {
      this.control.markAsUntouched();
    }
  }

  // ---------- SEARCH HANDLER ----------

  /**
   * Handles searching for suggestions.
   * Uses client-side filtering if no lazySearch function provided.
   * Otherwise, calls lazySearch for async fetching with optional caching.
   */
  async onSearch(event: { query: string }) {
    const query = event.query.trimStart();

    // Clear suggestions if query is too short
    if (query.length < this.minLength) {
      this.suggestions = [];
      this.showEmptyMessage = false;
      return;
    }

    // Client-side filtering mode
    if (!this.lazySearch) {
      this.suggestions = this.allOptions.filter((item) =>
        (item[this.optionLabel] as string)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      this.showEmptyMessage = this.suggestions.length === 0;
      return;
    }

    // Lazy search mode with caching
    const currentKey = query.substring(0, this.minLength);

    if (this.cachingEnabled && currentKey === this.lastSearchKey) {
      // Filter cached results to refine suggestions
      this.suggestions = this.cachedResults.filter((item) =>
        (item[this.optionLabel] as string)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      this.showEmptyMessage = this.suggestions.length === 0;
      return;
    }

    // Fetch fresh results asynchronously
    try {
      this.loading = true;
      const searchQuery = this.cachingEnabled ? currentKey : query;
      const result = await this.lazySearch(searchQuery);
      this.lastSearchKey = currentKey;
      this.cachedResults = result;
      this.suggestions = result;
      this.showEmptyMessage = result.length === 0;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Emits the selected suggestion when the user picks an item.
   */
  onSelectAutoComplete(event: AutoCompleteSelectEvent) {
    this.selectSuggestion.emit(event.value);
  }

  onValueChanged(input: any) {
    this.valueChange.emit(input.value);
  }
}
