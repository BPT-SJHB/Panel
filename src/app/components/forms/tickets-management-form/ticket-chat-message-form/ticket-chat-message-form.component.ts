import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ValidationSchema } from 'app/constants/validation-schema';
import { BaseLoading } from '../../shared/component-base/base-loading';
import {
  ChatMessage,
  CreateChatMessageRequest,
  Ticket,
} from 'app/services/ticket-service-management/model/ticket.model';
import { TicketServiceManagementService } from 'app/services/ticket-service-management/ticket-service-management.service';
import { checkAndToastError } from 'app/utils/api-utils';
import { ChatBoxInputComponent } from 'app/components/shared/inputs/chat-box-input/chat-box-input.component';
import { DialogModule } from 'primeng/dialog';
import { TicketFilesUploadComponent } from '../ticket-files-upload/ticket-files-upload.component';
import { TicketGuardCaptchaFormComponent } from '../ticket-guard-captcha-form/ticket-guard-captcha-form.component';
import { TicketErrorCodes } from 'app/constants/error-messages';

interface ChatGroupedByDate {
  date: string;
  messages: {
    id: string;
    senderId: number;
    message: string;
    time: string;
    attachments?: string[];
  }[];
}

// TODO: Add captcha guard here
@Component({
  selector: 'app-ticket-chat-message-form',
  standalone: true,
  imports: [
    NgClass,
    DialogModule,
    ReactiveFormsModule,
    ChatBoxInputComponent,
    TicketFilesUploadComponent,
    TicketGuardCaptchaFormComponent,
  ],
  templateUrl: './ticket-chat-message-form.component.html',
  styleUrls: ['./ticket-chat-message-form.component.scss'],
})
export class TicketChatMessageFormComponent extends BaseLoading {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;

  private readonly fb = inject(FormBuilder);
  private readonly ticketService = inject(TicketServiceManagementService);
  readonly guardType = computed(() =>
    this.sender() === 'admin' ? 'auth' : 'captcha'
  );

  readonly captchaGuardVisible = signal(false);
  readonly ticket = input<Ticket | null>(null);
  readonly sender = input<'user' | 'admin'>('user');
  readonly userId = input<number>(0);
  readonly captchaAction = () => this.sendMessage();

  readonly chatForm = this.fb.nonNullable.group({
    ticketId: this.fb.nonNullable.control<string>('', ValidationSchema.id),
    message: this.fb.nonNullable.control<string>(
      '',
      ValidationSchema.description
    ),
    attachments: this.fb.nonNullable.control<string[]>([]),
    attachmentMessage: this.fb.nonNullable.control<string>(''),
  });

  readonly groupChats = signal<ChatGroupedByDate[]>([]);

  uploadFileVisible = false;

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
      senderId: this.userId(),
      attachments: this.ctrl<string[]>('attachments').value ?? [],
    };

    this.chatForm.reset();
    this.uploadFileVisible = false;
    await this.withLoading(async () => {
      const res = await this.ticketService.CreateChat(
        this.ticket()?.id ?? '',
        newChat
      );

      if (!checkAndToastError(res, this.toast)) {
        if (
          TicketErrorCodes.CaptchaExpired === res.error?.code ||
          TicketErrorCodes.CaptchaIncorrect === res.error?.code
        ) {
          this.captchaGuardVisible.set(true);
          return;
        }
      }

      // Add chat to grouped UI
      if (!res.data) return;
      this.addChatMessage(res.data);
    });
  }

  downloadTicketFile(fileId: string) {
    this.withLoading(async () => {
      const ticketId = this.ticket()?.id;
      if (!ticketId) return;

      const response = await this.ticketService.DownloadTicketFile(
        ticketId,
        fileId
      );
      if (!checkAndToastError(response, this.toast)) return;
    });
  }
}
