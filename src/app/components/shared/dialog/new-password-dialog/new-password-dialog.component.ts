import { Component, inject, input } from '@angular/core';
import { ToastService } from 'app/services/toast-service/toast.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../button/button.component';
import { copyTextAndToast } from 'app/utils/copy-text';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [DialogModule, ButtonModule, ButtonComponent],
  templateUrl: './new-password-dialog.component.html',
  styleUrl: './new-password-dialog.component.scss',
})
export class NewPasswordDialogComponent {
  private toast = inject(ToastService);
  readonly username = input('');
  readonly password = input('');

  copyToClipboard(text: string) {
    copyTextAndToast(text, this.toast);
  }
}
