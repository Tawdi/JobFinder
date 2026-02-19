import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStatus } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-stats.html',
  styleUrl: './application-stats.css'
})
export class ApplicationStats {
  @Input({transform: numberAttribute}) totalCount = 0;
  @Input({transform: numberAttribute}) pendingCount = 0;
  @Input({transform: numberAttribute}) acceptedCount = 0;
  @Input({transform: numberAttribute}) rejectedCount = 0;
  @Input() activeFilter: ApplicationStatus | 'all' = 'all';

  @Output() filterChange = new EventEmitter<ApplicationStatus | 'all'>();

  setFilter(filter: ApplicationStatus | 'all') {
    this.filterChange.emit(filter);
  }
}
