import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoritesState} from '../reducers/favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state) => state.favorites
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state) => state.error
);

export const selectFavoritesSuccess = createSelector(
  selectFavoritesState,
  (state) => state.success
);

// Derived selectors
export const selectFavoritesCount = createSelector(
  selectAllFavorites,
  (favorites) => favorites.length
);

export const selectIsFavorite = (offerId: string) => createSelector(
  selectAllFavorites,
  (favorites) => favorites.some(fav => fav.offerId === offerId)
);

export const selectFavoriteId = (offerId: string) => createSelector(
  selectAllFavorites,
  (favorites) => {
    const favorite = favorites.find(fav => fav.offerId === offerId);
    return favorite?.id;
  }
);

export const selectRecentFavorites = (limit: number = 5) => createSelector(
  selectAllFavorites,
  (favorites) => [...favorites]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, limit)
);
