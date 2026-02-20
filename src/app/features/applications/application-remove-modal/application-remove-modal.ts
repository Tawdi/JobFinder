import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModal } from '../../../shared/components/ui-modal/ui-modal';
import { Application } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-remove-modal',
  standalone: true,
  imports: [CommonModule, UiModal],
  templateUrl: './application-remove-modal.html',
  styleUrl: './application-remove-modal.css'
})
export class ApplicationRemoveModal {
  @Input() open = false;
  @Input() application: Application | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<number>();

  close() {
    this.closed.emit();
  }

  confirmRemove() {
    if (this.application) {
      this.confirmed.emit(this.application.id);
    }
  }
}
