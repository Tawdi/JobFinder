import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../../../core/models/job.model';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../core/services/auth';
import {User} from '../../../core/models/user.model';
import * as FavoritesSelectors from '../../../core/store/selectors/favorites.selector';
import  {FavoritesActions} from '../../../core/store/actions';


@Component({
  selector: 'app-job-card',
  imports: [
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCard  implements OnInit  {


  @Input() job!: Job;
  @Input() isSelected: boolean = false;
  @Output() jobSelected = new EventEmitter<Job>();

  isFavorite$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  currentUser: User | null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.user$.value;
  }

  ngOnInit() {
    if (this.currentUser && this.job) {
      this.isFavorite$ = this.store.select(
        FavoritesSelectors.selectIsFavorite(this.job.id)
      );
      this.isLoading$ = this.store.select(FavoritesSelectors.selectFavoritesLoading);

      this.store.dispatch(FavoritesActions.checkFavoriteStatus({
        userId: this.currentUser.id,
        offerId: this.job.id
      }));
    }
  }


  onCardClick() {
    this.jobSelected.emit(this.job);
  }


  onFavoriteClick(event: Event) {
    event.stopPropagation(); // Prevent card click

    if (!this.currentUser) {
      return;
    }

    this.isFavorite$.subscribe(isFavorite => {
      if (isFavorite) {
        this.store.select(FavoritesSelectors.selectFavoriteId(this.job.id))
          .subscribe(favoriteId => {
            if (favoriteId) {
              this.store.dispatch(FavoritesActions.removeFavorite({ id: favoriteId }));
            }
          }).unsubscribe();
      } else {
        this.store.dispatch(FavoritesActions.addFavorite({
          favorite: {
            userId: this.currentUser!.id,
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
    }).unsubscribe();
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
