import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Job } from "../../../core/models/job.model";
import {JobCard} from '../job-card/job-card';

@Component({
  selector: 'app-job-list',
  imports: [
    JobCard
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList {
  @Input() jobs :Job[] = [];
  @Input() selectedJobId: string | null = null;
  @Output() jobSelected = new EventEmitter<Job>();

  onJobSelected(job: Job) {
    this.jobSelected.emit(job);
  }
}
