import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';

@Injectable()
export abstract class BaseLoading implements OnDestroy, OnInit {
  protected readonly destroy$ = new Subject<void>();
  protected loadingService = inject(LoadingService);
  protected toast = inject(ToastService);

  loading = signal(false);
  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => signal(v));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** ================================
   *  Utility wrapper to centralize loading toggling
   *  ================================ */
  protected async withLoading<T>(fn: () => Promise<T>): Promise<T | undefined> {
    this.loadingService.setLoading(true);
    try {
      return await fn();
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}
