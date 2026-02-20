import {Component, Input, numberAttribute} from '@angular/core';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-profile-stats',
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile-stats.html',
  styleUrl: './profile-stats.css',
})
export class ProfileStats {

  @Input({transform: numberAttribute}) applicationsCount = 0
  @Input({transform: numberAttribute}) pendingCount = 0;
  @Input({transform: numberAttribute}) acceptedCount = 0;
  @Input({transform: numberAttribute}) favoritesCount = 0;
}
