import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {JobsService} from '../../services/jobs';
import {JobsActions} from '../actions'
import {catchError, debounceTime, distinctUntilChanged, map, mergeMap, of, withLatestFrom} from 'rxjs';
import {AppState} from '../reducers';
import {JobAdapter} from '../../adapters/job-adapter';
import {Store} from '@ngrx/store';
import {selectJobsFilters} from '../selectors/jobs.selector';

@Injectable()
export class JobsEffects {

  private actions$ = inject(Actions);
  private jobsService = inject(JobsService);
  private store = inject(Store<AppState>)

  loadJobs$ = createEffect(() =>

    this.actions$.pipe(
      ofType(
        JobsActions.loadJobs,
        JobsActions.setFilters,
        JobsActions.setPage,
        JobsActions.setSortOrder,
        JobsActions.searchByCategory,
        JobsActions.searchByLevel,
        JobsActions.searchByLocation,
        JobsActions.nextPage,
        JobsActions.previousPage,
        JobsActions.clearFilters
      ),
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(this.store.select(selectJobsFilters)),
      mergeMap(([_, filters]) => {
        const params: any = {
          page: filters.page === 0 ? 0 : filters.page - 1,
          descending: filters.descending
        };

        if (filters.category) {
          params.category = filters.category;
        }

        if (filters.level) {
          params.level = filters.level;
        }

        if (filters.location) {
          params.location = filters.location;
        }

        return this.jobsService.getJobs(/*filters.source ||*/ 'themuse', params).pipe(
          map((res: any) => {
            const jobs = res.results.map((j: any) => JobAdapter.fromMuse(j));
            return JobsActions.loadJobsSuccess({
              jobs,
              totalPages: res.page_count || 0,
              totalJobs: res.total || 0
            });
          }),
          catchError((error) =>
            of(JobsActions.loadJobsFailure({
              error: error.message || 'Failed to load jobs'
            }))
          )
        );
      })
    )
  );


  // Search effects that dispatch setFilters
  searchByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.searchByCategory),
      map(({ category }) =>
        JobsActions.setFilters({ filters: { category, page: 1 } })
      )
    )
  );

  searchByLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.searchByLevel),
      map(({ level }) =>
        JobsActions.setFilters({ filters: { level, page: 1 } })
      )
    )
  );

  searchByLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.searchByLocation),
      map(({ location }) =>
        JobsActions.setFilters({ filters: { location, page: 1 } })
      )
    )
  );

  setSortOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.setSortOrder),
      map(({ descending }) =>
        JobsActions.setFilters({ filters: { descending } })
      )
    )
  );


}
