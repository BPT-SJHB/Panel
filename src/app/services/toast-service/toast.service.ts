import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IToastService } from './toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService implements IToastService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  error(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  info(summary: string, detail: string) {
    this.messageService.add({ severity: 'info', summary, detail });
  }

}
