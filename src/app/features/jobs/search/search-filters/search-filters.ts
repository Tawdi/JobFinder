import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UiButton} from '../../../../shared/components/ui-button/ui-button';
import {UiInput} from '../../../../shared/components/ui-input/ui-input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-filters',
  imports: [
    UiButton,
    UiInput,
    FormsModule
  ],
  templateUrl: './search-filters.html',
  styleUrl: './search-filters.css',
})
export class SearchFilters {
  @Input() category: string | null = '';
  @Input() level: string | null = '';
  @Input() location: string | null = '';
  @Input() sortOrder: string = 'descending';

  @Output() onCategoryChange = new EventEmitter<string>();
  @Output() onLevelChange = new EventEmitter<string>();
  @Output() onLocationChange = new EventEmitter<string>();
  @Output() onSortChange = new EventEmitter<boolean>();
  @Output() onClear = new EventEmitter<void>();
}
