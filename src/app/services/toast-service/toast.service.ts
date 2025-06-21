import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messageService = inject(MessageService);

  success(title: string, detail: string) {
    this.messageService.add({ severity: 'success', summary: title, detail });
  }

  error(title: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: title, detail });
  }

  info(title: string, detail: string) {
    this.messageService.add({ severity: 'info', summary: title, detail });
  }
}
