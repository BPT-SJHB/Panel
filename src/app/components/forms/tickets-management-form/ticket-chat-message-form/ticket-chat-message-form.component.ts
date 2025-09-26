import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ButtonComponent } from 'app/components/shared/button/button.component';
import { ValidationSchema } from 'app/constants/validation-schema';
import { BaseLoading } from '../../shared/component-base/base-loading';
import {
  ChatMessage,
  CreateChatMessageRequest,
  Ticket,
} from 'app/services/ticket-service-management/model/ticket.model';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { checkAndToastError } from 'app/utils/api-utils';

interface ChatGroupedByDate {
  date: string;
  messages: {
    id: string;
    senderId: number;
    message: string;
    time: string;
    attachments: string[];
  }[];
}

// TODO: Add captcha guard here
@Component({
  selector: 'app-ticket-chat-message-form',
  standalone: true,
  imports: [NgClass, ButtonComponent, ReactiveFormsModule],
  templateUrl: './ticket-chat-message-form.component.html',
  styleUrls: ['./ticket-chat-message-form.component.scss'],
})
export class TicketChatMessageFormComponent extends BaseLoading {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;

  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketServiceManagementService);

  readonly ticket = input<Ticket | null>(null);
  readonly sender = input<'user' | 'admin'>('user');

  readonly chatForm = this.fb.nonNullable.group({
    ticketId: this.fb.nonNullable.control<string>('', ValidationSchema.id),
    message: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.description
    ),
    attachments: this.fb.nonNullable.control<string[]>([]),
  });

  readonly groupChats = signal<ChatGroupedByDate[]>([]);

  constructor() {
    super();

    // React to ticket changes
    effect(() => {
      this.ctrl('ticketId').setValue(this.ticket()?.id ?? '');
      this.groupChats.set(this.groupChatsByDate(this.ticket()?.chat ?? []));
    });
  }

  ctrl<T>(controlName: keyof typeof this.chatForm.controls): FormControl<T> {
    return this.chatForm.get(controlName) as FormControl<T>;
  }

  /** Groups chats by Jalali date */
  private groupChatsByDate(chats: ChatMessage[]): ChatGroupedByDate[] {
    const sortedChats = [...chats].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const grouped: Record<string, ChatGroupedByDate> = {};

    sortedChats.forEach((chat) => {
      const { date, time } = this.formatJalaliDate(chat.createdAt);

      if (!grouped[date]) grouped[date] = { date, messages: [] };

      grouped[date].messages.push({
        id: chat.id,
        senderId: chat.senderId,
        message: chat.message,
        time,
        attachments: chat.attachments,
      });
    });

    return Object.values(grouped);
  }

  /** Format ISO to Jalali date + time */
  private formatJalaliDate(isoDate: string) {
    if (!isoDate) return { date: '', time: '' };
    const d = new Date(isoDate);

    return {
      date: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(d),
      time: new Intl.DateTimeFormat('fa-IR', { timeStyle: 'short' }).format(d),
    };
  }

  /** Check if message belongs to current sender */
  isSender(senderId: number): boolean {
    if (!this.ticket()) return false;
    return this.sender() === 'user'
      ? this.ticket()!.userId === senderId
      : this.ticket()!.userId !== senderId;
  }

  /** Auto resize textarea up to 5 rows */
  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    const maxHeight = 5 * 24; // ~5 rows
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  }

  /** Scroll chat to bottom */
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer?.nativeElement) {
        const el = this.chatContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  }

  /** Append new chat to grouped list */
  private addChatMessage(newMessage: ChatMessage): void {
    this.ticket()?.chat.push(newMessage);
    this.groupChats.set(this.groupChatsByDate(this.ticket()?.chat ?? []));
    this.scrollToBottom();
  }

  /** Send a new chat message */
  async sendMessage() {
    const msg = this.ctrl<string>('message').value.trim();
    if (!msg) return;

    const newChat: CreateChatMessageRequest = {
      message: msg,
      senderId: this.ticket()?.userId ?? 0,
      attachments: this.ctrl<string[]>('attachments').value ?? [],
    };

    this.ctrl('message').setValue('');
    this.chatInput.nativeElement.style.height = 'auto';

    await this.withLoading(async () => {
      const res = await this.ticketService.CreateChat(
        this.ticket()?.id ?? '',
        newChat
      );

      if (!checkAndToastError(res, this.toast)) return;

      // Add chat to grouped UI
      this.addChatMessage(res.data);
    });
  }
}
