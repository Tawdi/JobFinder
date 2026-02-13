import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {

  message = signal<string | null>(null);
  type = signal<'success' | 'error' | 'info'>('info');

  private timeoutId: any = null;

  show(msg: string, type: 'success' | 'error' | 'info' = 'info') {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.message.set(msg);
    this.type.set(type);

    this.timeoutId = setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.message.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
