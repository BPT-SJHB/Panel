import { Component, input } from '@angular/core';
import { AutoCompleteFilter } from 'app/services/auto-complete-config-factory/auto-complete-config-factory.service';
import { SearchAutoCompleteComponent } from '../search-auto-complete/search-auto-complete.component';

@Component({
  selector: 'app-search-auto-complete-factory',
  imports: [SearchAutoCompleteComponent],
  templateUrl: './search-auto-complete-factory.component.html',
  styleUrl: './search-auto-complete-factory.component.scss',
})
export class SearchAutoCompleteFactoryComponent {
  addonWidth = input('8rem');
  config = input<AutoCompleteFilter | null>(null);
}
