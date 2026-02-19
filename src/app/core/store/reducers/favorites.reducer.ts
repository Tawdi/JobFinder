// src/app/core/store/reducers/favorites.reducer.ts
import {createReducer, on} from '@ngrx/store';
import {Favorite} from '../../models/favorite.model';
import {FavoritesActions} from '../actions';

export interface FavoritesState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

export const initialFavoritesState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
  success: null
};

export const favoritesReducer = createReducer(
  initialFavoritesState,

  // Load Favorites
  on(FavoritesActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(FavoritesActions.loadFavoritesSuccess, (state, {favorites}) => ({
    ...state,
    favorites,
    loading: false,
    error: null
  })),

  on(FavoritesActions.loadFavoritesFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Favorite
  on(FavoritesActions.addFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(FavoritesActions.addFavoriteSuccess, (state, {favorite}) => ({
    ...state,
    favorites: [favorite, ...state.favorites],
    loading: false,
    success: 'Job added to favorites successfully',
    error: null
  })),

  on(FavoritesActions.addFavoriteFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Remove Favorite
  on(FavoritesActions.removeFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(FavoritesActions.removeFavoriteSuccess, (state, {id}) => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.id !== id),
    loading: false,
    success: 'Job removed from favorites successfully',
    error: null
  })),

  on(FavoritesActions.removeFavoriteFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Check if job is favorite
  on(FavoritesActions.checkFavoriteStatus, (state) => ({
    ...state,
    loading: true
  })),

  on(FavoritesActions.checkFavoriteStatusSuccess, (state) => ({
    ...state,
    loading: false
  })),

  // Clear Messages
  on(FavoritesActions.clearFavoritesMessages, (state) => ({
    ...state,
    error: null,
    success: null
  }))
);
