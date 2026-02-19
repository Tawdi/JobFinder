// src/app/core/services/favorites.ts
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Favorite, AddFavoriteDto} from '../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private http = inject(HttpClient);
  private api = environment.apiUrl + "/favorites";

  /**
   * Get all favorites for a user
   */
  getFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.api}?userId=${userId}`);
  }

  /**
   * Check if a specific job is already in user's favorites
   */
  checkFavoriteExists(userId: number, offerId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.api}?userId=${userId}&offerId=${offerId}`);
  }

  /**
   * Add a job to favorites
   */
  addFavorite(favorite: AddFavoriteDto): Observable<Favorite> {
    const favoriteWithDate = {
      ...favorite,
      dateAdded: new Date().toISOString()
    };
    return this.http.post<Favorite>(this.api, favoriteWithDate);
  }

  /**
   * Remove a favorite by its ID
   */
  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  /**
   * Get a specific favorite by user ID and offer ID
   */
  getFavoriteByUserAndOffer(userId: number, offerId: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.api}?userId=${userId}&offerId=${offerId}`);
  }
}
