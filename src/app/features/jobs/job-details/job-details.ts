import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {Job} from '../../../core/models/job.model';
import {AppState} from '../../../core/store/reducers';
import {AuthService} from '../../../core/services/auth';
import {ApplicationsActions} from '../../../core/store/actions';
import {ApplicationsSelectors} from '../../../core/store/selectors';
import {User} from '../../../core/models/user.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    CommonModule,
    UiButton,
    DatePipe,
    RouterLink
  ],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit, OnChanges {
  @Input() job!: Job;

  hasApplied$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  currentUser: User | null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.user$.value;
  }

  ngOnInit() {
    this.loadJobInfo()
  }

  ngOnChanges() {
    this.loadJobInfo()

  }

  loadJobInfo() {
    if (this.currentUser && this.job) {
      this.hasApplied$ = this.store.select(
        ApplicationsSelectors.selectHasApplied(this.job.id)
      );

      this.isLoading$ = this.store.select(
        ApplicationsSelectors.selectIsApplicationLoading(parseInt(this.job.id) || 0)
      );

      this.store.dispatch(ApplicationsActions.checkApplicationStatus({
        userId: this.currentUser.id,
        offerId: this.job.id
      }));
    }
  }

  trackApplication() {
    if (!this.currentUser) {
      return;
    }

    this.store.dispatch(ApplicationsActions.addApplication({
      application: {
        userId: this.currentUser.id,
        offerId: this.job.id,
        title: this.job.title,
        company: this.job.company,
        location: this.job.location,
        postedDate: this.job.published,
        description: this.job.description,
        url: this.job.url,
        apiSource: this.job.platformName
      }
    }));
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
