import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiModal } from '../../../shared/components/ui-modal/ui-modal';
import { Application } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-notes-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, UiModal],
  templateUrl: './application-notes-modal.html',
  styleUrl: './application-notes-modal.css'
})
export class ApplicationNotesModal {
  @Input() open = false;
  @Input() application: Application | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() notesUpdated = new EventEmitter<{id: number, notes: string}>();

  notesText = '';

  ngOnChanges() {
    if (this.application) {
      this.notesText = this.application.notes || '';
    }
  }

  close() {
    this.closed.emit();
  }

  saveNotes() {
    if (this.application) {
      this.notesUpdated.emit({
        id: this.application.id,
        notes: this.notesText
      });
    }
  }
}
