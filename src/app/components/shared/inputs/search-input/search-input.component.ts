import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { ValidationField } from 'app/constants/validation-schema';
import { TextInputComponent } from '../text-input/text-input.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent<T> {
  @Input() control = new FormControl('');
  @Input() autoSearch = false;
  @Input() validationField: ValidationField | null = null;
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() icon = 'pi pi-user';
  @Input() label = '';
  @Input() addonWidth: string | null = null;
  @Input() data: T[] = [];
  @Input() lazySearch?: (query: string) => Promise<T[]>;

  @Input() cachingEnabled = true;
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() minLength = 3;

  // ✅ Optional custom filtering function
  @Input() filterFn?: (item: T, query: string) => boolean;

  @Output() input = new EventEmitter<any>();
  @Output() search = new EventEmitter<T[]>();

  cachedData: T[] = [];
  lastSearchKey: string = '';
  buttonLabel: string = 'جستجو';

  async searchData(query: string,forceUpdate = false): Promise<T[]> {
    query = query.trimStart();

    if (query.length < this.minLength) {
      return [];
    }

    if (!this.filterFn) return [];

    if (!this.lazySearch) {
      return this.data.filter((item) => this.filterFn!(item, query));
    }

    const currentKey = query.substring(0, this.minLength);

    if (!forceUpdate && this.cachingEnabled && currentKey === this.lastSearchKey) {
      return this.cachedData.filter((item) => this.filterFn!(item, query));
    }

    // Fetch fresh results
    const result = await this.lazySearch(query);
    this.lastSearchKey = currentKey;
    this.cachedData = result;
    return result;
  }

  async refreshSearch(): Promise<T[]> {
    const query = this.control.value ?? '';
    return await this.searchData(query, true);
  }

  async onSearch(query: string): Promise<void> {
    const filterData = await this.searchData(query);
    this.search.emit(filterData);
  }

  onInputValueChange(event: { query: string }) {
    this.input.emit(event);
    if (this.autoSearch) this.onSearch(event.query);
  }

  clickSearchButton() {
    if (!this.autoSearch) this.onSearch(this.control.value ?? '');
  }
}
