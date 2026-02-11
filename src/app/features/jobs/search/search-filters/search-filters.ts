import { Component } from '@angular/core';
import {UiButton} from '../../../../shared/components/ui-button/ui-button';
import {UiInput} from '../../../../shared/components/ui-input/ui-input';

@Component({
  selector: 'app-search-filters',
  imports: [
    UiButton,
    UiInput
  ],
  templateUrl: './search-filters.html',
  styleUrl: './search-filters.css',
})
export class SearchFilters {

}
