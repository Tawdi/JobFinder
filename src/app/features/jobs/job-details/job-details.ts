import {Component, Input} from '@angular/core';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {Job} from '../../../core/models/job.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [
    UiButton,
    DatePipe
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails {

  @Input() job! :Job;

}
