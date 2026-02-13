// src/app/features/jobs/search/search.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {SearchFilters} from './search-filters/search-filters';
import {JobList} from '../job-list/job-list';
import {JobDetails} from '../job-details/job-details';
import {Job} from '../../../core/models/job.model';
import {AppState} from '../../../core/store/reducers';
import * as JobsActions from '../../../core/store/actions/jobs.action';
import * as JobsSelectors from '../../../core/store/selectors/jobs.selector';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchFilters,
    JobList,
    JobDetails
  ],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  // Observables from store
  jobs$: Observable<Job[]>;
  selectedJob$: Observable<Job | null>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  totalJobs$: Observable<number>;
  searchCategory$: Observable<string>;
  searchLevel$: Observable<string>;
  searchLocation$: Observable<string>;
  sortOrder$: Observable<boolean>;
  hasNextPage$: Observable<boolean>;
  hasPreviousPage$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    // Initialize selectors
    this.jobs$ = this.store.select(JobsSelectors.selectAllJobs);
    this.selectedJob$ = this.store.select(JobsSelectors.selectSelectedJob);
    this.isLoading$ = this.store.select(JobsSelectors.selectJobsLoading);
    this.errorMessage$ = this.store.select(JobsSelectors.selectJobsError);
    this.currentPage$ = this.store.select(JobsSelectors.selectCurrentPage);
    this.totalPages$ = this.store.select(JobsSelectors.selectTotalPages);
    this.totalJobs$ = this.store.select(JobsSelectors.selectTotalJobs);
    this.searchCategory$ = this.store.select(JobsSelectors.selectSearchCategory);
    this.searchLevel$ = this.store.select(JobsSelectors.selectSearchLevel);
    this.searchLocation$ = this.store.select(JobsSelectors.selectSearchLocation);
    this.sortOrder$ = this.store.select(JobsSelectors.selectSortOrder);
    this.hasNextPage$ = this.store.select(JobsSelectors.selectHasNextPage);
    this.hasPreviousPage$ = this.store.select(JobsSelectors.selectHasPreviousPage);
  }

  ngOnInit() {
    // Load initial jobs
    this.store.dispatch(JobsActions.loadJobs({}));
  }

  // Search methods
  searchByCategory(category: string) {
    this.store.dispatch(JobsActions.searchByCategory({category}));
  }

  searchByLevel(level: string) {
    this.store.dispatch(JobsActions.searchByLevel({level}));
  }

  searchByLocation(location: string) {
    this.store.dispatch(JobsActions.searchByLocation({location}));
  }

  setSortOrder(descending: boolean) {
    this.store.dispatch(JobsActions.setSortOrder({descending}));
  }

  clearSearch() {
    this.store.dispatch(JobsActions.clearFilters());
    this.store.dispatch(JobsActions.loadJobs({}));
  }

  onJobSelected(job: Job) {
    this.store.dispatch(JobsActions.selectJob({job}));
  }

  onPreviousPage() {
    this.store.dispatch(JobsActions.previousPage());
  }

  onNextPage() {
    this.store.dispatch(JobsActions.nextPage());
  }

  refreshJobs() {
    this.store.dispatch(JobsActions.loadJobs({}));
  }



}
