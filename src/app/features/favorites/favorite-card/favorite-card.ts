import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Favorite} from '../../../core/models/favorite.model';

@Component({
  selector: 'app-favorite-card',
  imports: [],
  templateUrl: './favorite-card.html',
  styleUrl: './favorite-card.css',
})
export class FavoriteCard {

  @Input() favorite!: Favorite

  @Output() confirmRemove = new EventEmitter<Favorite>();

  getCompanyInitials(company: string): string {
    if (!company) return '?';
    return company
      .split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  onRemoveClick() {
    this.confirmRemove.emit(this.favorite);
  }
}
