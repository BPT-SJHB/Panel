import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { LoadingService } from 'app/services/loading-service/loading-service.service';
import { ToastService } from 'app/services/toast-service/toast.service';
import { Subject, takeUntil } from 'rxjs';

@Component({ template: '' })
export abstract class BaseLoading implements OnDestroy, OnInit {
  protected readonly destroy$ = new Subject<void>();
  protected loadingService = inject(LoadingService);
  protected toast = inject(ToastService);

  private activeRequests = 0; // track concurrent promises
  loading = signal(false);

  ngOnInit(): void {
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        // this.loading.set(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** ================================
   *  Utility wrapper to centralize loading toggling
   *  Handles multiple parallel promises correctly
   *  ================================ */
  protected async withLoading<T>(fn: () => Promise<T>): Promise<T | undefined> {
    this.startLoading();
    try {
      return await fn();
    } finally {
      this.endLoading();
    }
  }

  private startLoading() {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.loadingService.setLoading(true);
    }

    this.loading.set(true);
  }

  private endLoading() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this.loadingService.setLoading(false);
      this.loading.set(false);
    }
  }
}
