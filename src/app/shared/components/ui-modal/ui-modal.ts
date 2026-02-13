import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ui-modal',
  imports: [],
  templateUrl: './ui-modal.html',
  styleUrl: './ui-modal.css',
})
export class UiModal {
  @Input() open: boolean = false
  @Input() closeOnBackdrop: boolean = true;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
