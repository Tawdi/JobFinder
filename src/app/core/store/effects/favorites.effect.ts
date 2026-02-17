// src/app/core/store/effects/favorites.effect.ts
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import * as FavoritesActions from '../actions/favorites.action';
import {FavoritesService} from '../../services/favorites';

@Injectable()
export class FavoritesEffects {

  private actions$ = inject(Actions);
  private favoritesService= inject(FavoritesService);

  /**
   * Load all favorites for a user
   */
  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      mergeMap(({userId}) =>
        this.favoritesService.getFavorites(userId).pipe(
          map(favorites => FavoritesActions.loadFavoritesSuccess({favorites})),
          catchError(error =>
            of(FavoritesActions.loadFavoritesFailure({
              error: error.message || 'Failed to load favorites'
            }))
          )
        )
      )
    )
  );

  /**
   * Add a job to favorites with duplicate check
   */
  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      mergeMap(({favorite}) =>
        // First check if already exists
        this.favoritesService.checkFavoriteExists(favorite.userId, favorite.offerId).pipe(
          switchMap(existing => {
            if (existing.length > 0) {
              throw new Error('Job already in favorites');
            }
            // If not exists, add to favorites
            return this.favoritesService.addFavorite(favorite);
          }),
          map(favorite => FavoritesActions.addFavoriteSuccess({favorite})),
          catchError(error =>
            of(FavoritesActions.addFavoriteFailure({
              error: error.message || 'Failed to add favorite'
            }))
          )
        )
      )
    )
  );

  /**
   * Remove a favorite by ID
   */
  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      mergeMap(({id}) =>
        this.favoritesService.removeFavorite(id).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({id})),
          catchError(error =>
            of(FavoritesActions.removeFavoriteFailure({
              error: error.message || 'Failed to remove favorite'
            }))
          )
        )
      )
    )
  );

  /**
   * Check if a specific job is in user's favorites
   */
  checkFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.checkFavoriteStatus),
      mergeMap(({userId, offerId}) =>
        this.favoritesService.getFavoriteByUserAndOffer(userId, offerId).pipe(
          map(existing =>
            FavoritesActions.checkFavoriteStatusSuccess({
              isFavorite: existing.length > 0,
              favoriteId: existing.length > 0 ? existing[0].id : undefined
            })
          ),
          catchError(error =>
            of(FavoritesActions.loadFavoritesFailure({
              error: error.message || 'Failed to check favorite status'
            }))
          )
        )
      )
    )
  );

  /**
   * Optional: Show success message after adding/removing
   */
  showSuccessMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          FavoritesActions.addFavoriteSuccess,
          FavoritesActions.removeFavoriteSuccess
        ),
        map((action) => {
          const message = action.type === FavoritesActions.addFavoriteSuccess.type
            ? 'Job added to favorites'
            : 'Job removed from favorites';

          // You could dispatch a toast action here if you have a toast service
          console.log(message); // Replace with actual toast notification
          return {type: 'NO_ACTION'};
        })
      ),
    {dispatch: false}
  );
}
