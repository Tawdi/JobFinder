// src/app/features/favorites/favorites.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../core/models/favorite.model';
import { AppState } from '../../core/store/reducers';
import * as FavoritesActions from '../../core/store/actions/favorites.action';
import * as FavoritesSelectors from '../../core/store/selectors/favorites.selector';
import { AuthService } from '../../core/services/auth';
import {UiModal} from '../../shared/components/ui-modal/ui-modal';
import {FavoriteCard} from './favorite-card/favorite-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UiModal,
    FavoriteCard
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  favorites$: Observable<Favorite[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  success$: Observable<string | null>;
  favoritesCount$: Observable<number>;

  // Modal properties
  showRemoveModal = false;
  selectedFavorite: { id: number; title: string; company: string } | null = null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.favorites$ = this.store.select(FavoritesSelectors.selectAllFavorites);
    this.loading$ = this.store.select(FavoritesSelectors.selectFavoritesLoading);
    this.error$ = this.store.select(FavoritesSelectors.selectFavoritesError);
    this.success$ = this.store.select(FavoritesSelectors.selectFavoritesSuccess);
    this.favoritesCount$ = this.store.select(FavoritesSelectors.selectFavoritesCount);
  }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const currentUser = this.authService.user$.value;
    if (currentUser) {
      this.store.dispatch(FavoritesActions.loadFavorites({
        userId: currentUser.id
      }));
    }
  }

  // Open remove confirmation modal
  confirmRemove(favorite: Favorite, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    this.selectedFavorite = {
      id: favorite.id,
      title: favorite.title,
      company: favorite.company
    };
    this.showRemoveModal = true;
  }

  // Execute remove after confirmation
  executeRemove() {
    if (this.selectedFavorite) {
      this.store.dispatch(FavoritesActions.removeFavorite({
        id: this.selectedFavorite.id
      }));
      this.closeModal();
    }
  }

  // Close modal without removing
  closeModal() {
    this.showRemoveModal = false;
    this.selectedFavorite = null;
  }

  clearMessages() {
    this.store.dispatch(FavoritesActions.clearFavoritesMessages());
  }

  trackByFavoriteId(index: number, favorite: Favorite): number {
    return favorite.id;
  }



}
