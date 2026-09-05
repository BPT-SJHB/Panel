import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { environment } from 'environments/environment';
import { trimInDeep } from 'app/utils/api-utils';

import { HttpErrorService } from '../http-error-service/http-error.service';
import { ToastService } from '../toast-service/toast.service';

export interface ApiRequestOptions {
  withCredentials?: boolean;
  redirectToLoginOnUnauthorized?: boolean;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private readonly http = inject(HttpClient);
  private readonly httpErrorService = inject(HttpErrorService);
  private readonly toastService = inject(ToastService);

  // ---------------- POST ----------------

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody,
    mockValue?: TExpect,
    option?: ApiRequestOptions
  ): Promise<ApiResponse<TExpect>> {
    if (this.isMockEnabled()) {
      const mockResult = this.mockResponse(mockValue);
      this.handleSuccessToast(mockResult.data, option);
      return mockResult;
    }

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(url, bodyValue, {
          withCredentials: option?.withCredentials ?? false,
        })
      );

      const normalized = this.normalizeResponse(response);
      const result = this.success(normalized);
      this.handleSuccessToast(normalized, option);
      return result;
    } catch (error) {
      const errorResult = await this.httpErrorService.handleHttpError<TExpect>(
        error,
        option?.redirectToLoginOnUnauthorized ?? true
      );
      this.handleErrorToast(errorResult, option);
      return errorResult;
    }
  }

  // ---------------- GET ----------------

  public async CommunicateWithAPI_Get<TExpect>(
    url: string,
    mockValue?: TExpect,
    option?: ApiRequestOptions
  ): Promise<ApiResponse<TExpect>> {
    if (this.isMockEnabled()) {
      const mockResult = this.mockResponse(mockValue);
      if (option?.showSuccessToast) {
        this.handleSuccessToast(mockResult.data, option);
      }
      return mockResult;
    }

    try {
      const response = await firstValueFrom(
        this.http.get<TExpect>(url, {
          withCredentials: option?.withCredentials ?? false,
        })
      );

      const data = trimInDeep(response);
      const result = this.success(data);
      if (option?.showSuccessToast) {
        this.handleSuccessToast(data, option);
      }
      return result;
    } catch (error) {
      const errorResult = await this.httpErrorService.handleHttpError<TExpect>(
        error,
        option?.redirectToLoginOnUnauthorized ?? true
      );
      this.handleErrorToast(errorResult, option);
      return errorResult;
    }
  }

  // -------- POST FormData + Progress --------

  public CommunicateWithAPI_Post_FromData_With_Progress<TExpect>(
    url: string,
    bodyValue: FormData,
    mockValue?: TExpect,
    option?: ApiRequestOptions
  ): Observable<ApiResponse<TExpect> | number> {
    if (this.isMockEnabled()) {
      return this.mockProgress(mockValue, option);
    }

    return this.http
      .post<TExpect>(url, bodyValue, {
        withCredentials: option?.withCredentials ?? false,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<TExpect>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress: {
              const percent = (100 * (event.loaded ?? 0)) / (event.total ?? 1);
              const percentDone = Math.round(percent);
              return percentDone;
            }
            case HttpEventType.Response: {
              const data = trimInDeep(event.body);
              this.handleSuccessToast(data, option);
              return {
                success: true,
                data,
              } as ApiResponse<TExpect>;
            }
            default:
              return 0;
          }
        }),
        catchError(async (error: unknown) => {
          const errorResult =
            await this.httpErrorService.handleHttpError<TExpect>(
              error,
              option?.redirectToLoginOnUnauthorized ?? true
            );
          this.handleErrorToast(errorResult, option);
          throw errorResult;
        })
      );
  }

  // ---------------- helpers ----------------

  private isMockEnabled(): boolean {
    return !environment.production && environment.disableApi;
  }

  private success<T>(data: T): ApiResponse<T> {
    return { success: true, data };
  }

  private mockResponse<T>(mock?: T): ApiResponse<T> {
    return { success: true, data: trimInDeep(mock) };
  }

  private normalizeResponse<T>(response: T): T {
    if (typeof response === 'string') {
      return { Message: response } as ShortResponse as T;
    }
    return trimInDeep(response);
  }

  private handleSuccessToast<T>(data: T, option?: ApiRequestOptions): void {
    if (!option?.showSuccessToast) {
      return;
    }

    let message = option.successMessage;
    if (!message && data && typeof data === 'object') {
      if ('Message' in data && typeof data.Message === 'string') {
        message = data.Message;
      } else if ('message' in data && typeof (data as { message?: unknown }).message === 'string') {
        message = (data as { message: string }).message;
      }
    }

    if (message) {
      this.toastService.success('موفق', message);
    }
  }

  private handleErrorToast<T>(
    result: ApiResponse<T>,
    option?: ApiRequestOptions
  ): void {
    if (option?.showErrorToast === false) {
      return;
    }

    if (result.error?.message) {
      this.toastService.error('خطا', result.error.message);
    }
  }

  private mockProgress<T>(
    mock?: T,
    option?: ApiRequestOptions
  ): Observable<ApiResponse<T> | number> {
    return new Observable((observer) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        observer.next(progress);

        if (progress >= 100) {
          clearInterval(timer);
          const response = this.mockResponse(mock);
          this.handleSuccessToast(response.data, option);
          observer.next(response);
          observer.complete();
        }
      }, 200);
    });
  }
}
