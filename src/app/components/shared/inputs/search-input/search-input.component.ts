import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-search-input',
  imports: [InputGroupAddonModule, InputGroupModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Input() placeholder: string = 'جستجو';
  @Input() initialValue: string = '';
  @Input() showClearButton: boolean = true;

  @Output() input = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();

  _searchTerm: string = '';

  ngOnInit() {
    this._searchTerm = this.initialValue;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.valueChange.emit(this._searchTerm);
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm.trim());
    }
  }

  onClear() {
    this.searchTerm = '';
    this.cleared.emit();
    this.search.emit('');
  }
}
