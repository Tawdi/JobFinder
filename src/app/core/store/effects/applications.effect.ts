import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {ApplicationsActions} from '../actions';
import {ApplicationsService} from '../../services/applications';

@Injectable()
export class ApplicationsEffects {

  private actions$ = inject(Actions);
  private applicationsService = inject(ApplicationsService);

  loadApplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.loadApplications),
      debounceTime(300),
      mergeMap(({userId}) =>
        this.applicationsService.getApplications(userId).pipe(
          map(applications => ApplicationsActions.loadApplicationsSuccess({applications})),
          catchError(error =>
            of(ApplicationsActions.loadApplicationsFailure({
              error: error.message || 'Failed to load applications'
            }))
          )
        )
      )
    )
  );

  loadApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.loadApplication),
      mergeMap(({id}) =>
        this.applicationsService.getApplication(id).pipe(
          map(application => ApplicationsActions.loadApplicationSuccess({application})),
          catchError(error =>
            of(ApplicationsActions.loadApplicationFailure({
              error: error.message || 'Failed to load application'
            }))
          )
        )
      )
    )
  );

  addApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.addApplication),
      debounceTime(300),
      mergeMap(({application}) =>
        this.applicationsService.checkIfApplied(application.userId, application.offerId).pipe(
          switchMap(existing => {
            if (existing.length > 0) {
              throw new Error('You have already applied to this job');
            }
            return this.applicationsService.addApplication(application);
          }),
          map(application => ApplicationsActions.addApplicationSuccess({application})),
          catchError(error =>
            of(ApplicationsActions.addApplicationFailure({
              error: error.message || 'Failed to add application',
              offerId: application.offerId
            }))
          )
        )
      )
    )
  );

  updateApplicationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.updateApplicationStatus),
      debounceTime(300),
      mergeMap(({id, status}) =>
        this.applicationsService.updateApplicationStatus(id, status).pipe(
          map(application => ApplicationsActions.updateApplicationStatusSuccess({application})),
          catchError(error =>
            of(ApplicationsActions.updateApplicationStatusFailure({
              error: error.message || 'Failed to update status',
              id
            }))
          )
        )
      )
    )
  );

  updateApplicationNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.updateApplicationNotes),
      debounceTime(300),
      mergeMap(({id, notes}) =>
        this.applicationsService.updateApplicationNotes(id, notes).pipe(
          map(application => ApplicationsActions.updateApplicationNotesSuccess({application})),
          catchError(error =>
            of(ApplicationsActions.updateApplicationNotesFailure({
              error: error.message || 'Failed to update notes',
              id
            }))
          )
        )
      )
    )
  );

  removeApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.removeApplication),
      debounceTime(300),
      mergeMap(({id}) =>
        this.applicationsService.deleteApplication(id).pipe(
          map(() => ApplicationsActions.removeApplicationSuccess({id})),
          catchError(error =>
            of(ApplicationsActions.removeApplicationFailure({
              error: error.message || 'Failed to remove application',
              id
            }))
          )
        )
      )
    )
  );

  checkApplicationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.checkApplicationStatus),
      debounceTime(300),
      mergeMap(({userId, offerId}) =>
        this.applicationsService.checkIfApplied(userId, offerId).pipe(
          map(existing =>
            ApplicationsActions.checkApplicationStatusSuccess({
              hasApplied: existing.length > 0,
              applicationId: existing.length > 0 ? existing[0].id : undefined
            })
          ),
          catchError(error =>
            of(ApplicationsActions.loadApplicationsFailure({
              error: error.message || 'Failed to check application status'
            }))
          )
        )
      )
    )
  );
}
