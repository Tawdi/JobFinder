import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Job } from "../../../core/models/job.model";
import {JobCard} from '../job-card/job-card';
import {PaginationSimpleComponent} from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-job-list',
  imports: [
    JobCard,
    PaginationSimpleComponent
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  @Input() jobs :Job[] = [];
  @Input() selectedJobId: string | null = null;
  @Input() isLoading = false;
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() totalItems = 0;

  @Output() jobSelected = new EventEmitter<Job>();
  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  onJobSelected(job: Job) {
    this.jobSelected.emit(job);
  }
}
