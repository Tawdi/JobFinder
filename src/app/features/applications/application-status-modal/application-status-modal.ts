import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiModal } from '../../../shared/components/ui-modal/ui-modal';
import { Application, ApplicationStatus } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-status-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, UiModal],
  templateUrl: './application-status-modal.html',
  styleUrl: './application-status-modal.css'
})
export class ApplicationStatusModal {
  @Input() open = false;
  @Input() application: Application | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() statusUpdated = new EventEmitter<{id: number, status: ApplicationStatus}>();

  selectedStatus: ApplicationStatus = 'pending';

  ngOnChanges() {
    if (this.application) {
      this.selectedStatus = this.application.status;
    }
  }

  close() {
    this.closed.emit();
  }

  updateStatus() {
    if (this.application) {
      this.statusUpdated.emit({
        id: this.application.id,
        status: this.selectedStatus
      });
    }
  }
}
