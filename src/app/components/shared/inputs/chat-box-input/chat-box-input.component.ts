import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-box-input',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './chat-box-input.component.html',
  styleUrls: ['./chat-box-input.component.scss'],
})
export class ChatBoxInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('messageBox') messageBox?: ElementRef<HTMLTextAreaElement>;

  readonly control = input(new FormControl<string>(''));
  readonly enableSendFile = input(true);
  readonly disableSend = input(false);
  readonly placeholder = input('پیام خود را وارد کنید.');

  readonly clickSend = output<void>();
  readonly clickFile = output<void>();

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.control()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const textarea = this.messageBox?.nativeElement;
        if (textarea) this.autoResize(textarea);
      });
  }

  ngAfterViewInit(): void {
    this.messageBox?.nativeElement.focus();
  }

  private autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    const maxHeight = 5 * 24; // limit to ~5 rows
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
