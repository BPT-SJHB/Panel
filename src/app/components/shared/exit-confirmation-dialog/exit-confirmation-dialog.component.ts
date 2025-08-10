import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-exit-confirmation-dialog',
  standalone: true,
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './exit-confirmation-dialog.component.html',
  styleUrl: './exit-confirmation-dialog.component.scss',
})
export class ExitConfirmationDialogComponent implements OnInit, OnDestroy {
  private confirmationService = inject(ConfirmationService);

  formDirty = true;

  ngOnInit(): void {
    history.pushState(null, '', window.location.href); // Trap back
    window.addEventListener('popstate', this.onPopState);
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.onPopState);
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  private onPopState = (event: PopStateEvent) => {
    if (!this.formDirty) {
      window.removeEventListener('popstate', this.onPopState);
      history.back();
      return;
    }

    // Stay on current URL while user decides
    history.pushState(null, '', window.location.href);

    this.confirmationService.confirm({
      message: 'آیا مطمئن هستید که می‌خواهید از این صفحه خارج شوید؟',
      header: 'خروج از صفحه',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'خروج',
      rejectLabel: 'انصراف',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        // Force navigation backward
        window.removeEventListener('popstate', this.onPopState);
        history.go(-2); // go back two steps
      },
    });
  };

  private onBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!this.formDirty) return;
    event.preventDefault();
    event.returnValue = '';
  };
}
