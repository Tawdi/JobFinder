import {booleanAttribute, Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import {Job} from "../../../core/models/job.model";
import {JobCard} from '../job-card/job-card';
import {PaginationSimpleComponent} from '../../../shared/components/pagination/pagination';
import {Spinner} from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-job-list',
  imports: [
    JobCard,
    PaginationSimpleComponent,
    Spinner
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  @Input() jobs: Job[] | null = [];
  @Input() selectedJobId: string | null = null;
  @Input({transform: booleanAttribute}) isLoading = false;
  @Input({transform: numberAttribute}) currentPage: number = 1;
  @Input({transform: numberAttribute}) totalPages: number = 0;
  @Input({transform: numberAttribute}) totalItems: number = 0;

  @Output() jobSelected = new EventEmitter<Job>();
  @Output() onPrevious = new EventEmitter<void>();
  @Output() onNext = new EventEmitter<void>();

  onJobSelected(job: Job) {
    this.jobSelected.emit(job);
  }
}
