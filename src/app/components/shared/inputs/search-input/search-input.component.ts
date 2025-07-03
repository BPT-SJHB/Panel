import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  imports: [
    CommonModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent  {
  @Input() placeholder: string = 'جستجو';
  @Input() initialValue: string = '';
  @Input() showClearButton: boolean = true;
  @Input() icon:string ='pi pi-search'
  @Input() label:string = ''
  @Input() addonWidth = '';
  @Input() showSelectIcon:boolean = false;
  @Input() readOnly:boolean = false;
  @Input() control = new FormControl('');

  @Input() autoComplete: boolean = false;
  @Input() autoCompleteOptionLabel = 'label';
  @Input() autoCompleteOptionValue = 'value';
  @Input() autoCompleteMinLength: number = 3;
  @Input() lazySearch!: (query: string) => Promise<any[]>;

  @Output() input = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() selectAutoComplete = new EventEmitter<AutoCompleteSelectEvent>();

  _searchTerm: string = '';
  showEmptyMessage: boolean = false;
  autoCompleteItem: any[] = [];

  ngOnInit() {
    this._searchTerm = this.initialValue;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.valueChange.emit(value);
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  onValueChange(value: string) {
    this.searchTerm = value;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm.trim());
    }
  }

  onSelectAutoComplete(event: AutoCompleteSelectEvent) {
    this.selectAutoComplete.emit(event);
  }

  onClear() {
    this.searchTerm = '';
    this.cleared.emit();
    this.search.emit('');
  }

  async onLazySearch(event: { query: string }) {
    const term = event.query.trimStart();

    if (term.length < this.autoCompleteMinLength) {
      this.autoCompleteItem = [];
      this.showEmptyMessage = false;
      return;
    }

    const result = await this.lazySearch(term);

    this.autoCompleteItem = result;
    this.showEmptyMessage = this.autoCompleteItem.length === 0;
  }
}
