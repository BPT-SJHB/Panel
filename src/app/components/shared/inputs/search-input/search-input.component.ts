import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { ValidationField } from 'app/constants/validation-schema';
import { TextInputComponent } from '../text-input/text-input.component';
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    TextInputComponent,
    ButtonComponent
],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent<T> implements OnInit, OnDestroy,OnChanges {
  private controlSubscription?: Subscription;

  // -------------------------
  // 🔧 Form & Validation
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
  @Input() searchButtonLabel = 'جستجو';
  @Input() disableSearchButton = false;

  // -------------------------
  // 🔍 Search Behavior
  // -------------------------
  @Input() staticData: T[] = [];
  @Input() asyncSearchFn?: (query: string) => Promise<T[]>;
  @Input() onSearchQuery?: (query: string) => Promise<void>;
  @Input() itemMatchesQuery?: (item: T, query: string) => boolean;
  @Input() minSearchLength = 3;
  @Input() autoTriggerSearch = false;
  @Input() enableCaching = true;
  @Input() debounceTimeMs = 300;
  @Input() fallbackToAllWhenQueryShort = false;

  // -------------------------
  // 📤 Output Events
  @Output() rawInput = new EventEmitter<string>(); // Emits raw user input
  @Output() searchResult = new EventEmitter<T[]>(); // Emits processed results

  // -------------------------
  // 🧠 Internal State
  private cachedResults: T[] = [];
  private lastCachedKey = '';

  /**
   * Subscribes to form control changes and triggers search if auto search is enabled.
   */
  ngOnInit(): void {
    this.controlSubscription = this.control.valueChanges
      .pipe(debounceTime(this.debounceTimeMs), distinctUntilChanged())
      .subscribe((value) => {
        if (this.autoTriggerSearch) {
          this.triggerSearch(value ?? '');
        }
      });
  }

  ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['staticData'] && !changes['staticData'].firstChange) {
      const query = this.control?.value ?? '';
      if (
        !this.asyncSearchFn &&
        this.autoTriggerSearch &&
        query.length >= this.minSearchLength
      ) {
        this.triggerSearch(query);
      }
    }
  }

  /**
   * Core search logic — chooses between static filtering, async search, or single-result search.
   */
  async performSearch(query: string, forceRefresh = false): Promise<T[]> {
    query = query.trimStart();

    // Show fallback data if query is too short
    if (query.length < this.minSearchLength) {
      return this.fallbackToAllWhenQueryShort ? this.staticData : [];
    }
    // onSearchQuery replaces the default search behavior
    if (this.onSearchQuery) {
      await this.onSearchQuery(query);
      return [];
    }

    if (!this.itemMatchesQuery) {
      return [];
    }

    // Static filtering
    if (!this.asyncSearchFn) {
      return this.staticData.filter((item) =>
        this.itemMatchesQuery!(item, query)
      );
    }

    // Cached async filtering
    const queryKey = query.substring(0, this.minSearchLength);
    if (
      !forceRefresh &&
      this.enableCaching &&
      queryKey === this.lastCachedKey
    ) {
      return this.cachedResults.filter((item) =>
        this.itemMatchesQuery!(item, query)
      );
    }

    const freshData = await this.asyncSearchFn(query);
    this.lastCachedKey = queryKey;
    this.cachedResults = freshData;
    return freshData;
  }

  /**
   * Exposed method to manually force refresh search results.
   */
  refreshSearch(): Promise<T[]> {
    const query = this.control.value ?? '';
    return this.performSearch(query, true);
  }

  /**
   * Trigger search and emit final results.
   */
  async triggerSearch(query: string): Promise<void> {
    const results = await this.performSearch(query);
    this.searchResult.emit(results);
  }

  /**
   * Handle raw input value change — emits unprocessed string.
   */
  onInputChanged(event: Event): void {
    const rawValue = (event.target as HTMLInputElement).value;
    this.rawInput.emit(rawValue);
  }

  /**
   * Triggered when user clicks the search button manually.
   */
  onSearchButtonClick(): void {
    if (!this.autoTriggerSearch) {
      this.control.markAllAsTouched();
      this.triggerSearch(this.control.value ?? '');
    }
  }
}
