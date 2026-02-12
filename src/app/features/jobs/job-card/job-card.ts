import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Job} from '../../../core/models/job.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-card',
  imports: [
    DatePipe
  ],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard {
  @Input() job! : Job ;
  @Input() isSelected: boolean = false;
  @Output() jobSelected = new EventEmitter<Job>();

  onCardClick() {
    this.jobSelected.emit(this.job);
  }
}
