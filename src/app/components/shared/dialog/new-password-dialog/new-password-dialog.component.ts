import { Component, inject, Input } from '@angular/core';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [DialogModule,ButtonModule],
  templateUrl: './new-password-dialog.component.html',
  styleUrl: './new-password-dialog.component.scss',
})
export class NewPasswordDialogComponent {
  private toast = inject(ToastService);
  @Input() username: string = '';
  @Input() password: string = '';

  copyToClipboard(text: string) {
    this.toast.success('متن در کلیپبورد ذخیره شد', '');
    navigator.clipboard.writeText(text);
  }
}
