import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl:'pagination.html',
  styleUrl:'pagination.css'
})
export class PaginationSimpleComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() totalItems = 0;

  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();
}
