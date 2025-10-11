import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private messageService = inject(MessageService);

  // Store last message and timestamp
  private lastMessage: {
    severity: string;
    title: string;
    detail: string;
    time: number;
  } | null = null;
  private readonly ignoreDuration = 3000; // milliseconds

  private show(severity: string, title: string, detail: string) {
    const now = Date.now();

    if (
      this.lastMessage &&
      this.lastMessage.severity === severity &&
      this.lastMessage.title === title &&
      this.lastMessage.detail === detail &&
      now - this.lastMessage.time < this.ignoreDuration
    ) {
      return;
    }

    this.lastMessage = { severity, title, detail, time: now };
    this.messageService.add({ severity, summary: title, detail });
  }

  success(title: string, detail: string) {
    this.show('success', title, detail);
  }

  error(title: string, detail: string) {
    this.show('error', title, detail);
  }

  info(title: string, detail: string) {
    this.show('info', title, detail);
  }

  warn(title: string, detail: string) {
    this.show('warn', title, detail);
  }
}
