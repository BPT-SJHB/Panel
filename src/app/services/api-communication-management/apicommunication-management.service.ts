import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';

import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { environment } from 'environments/environment';
import { trimInDeep } from 'app/utils/api-utils';

import { HttpErrorService } from '../http-error-service/http-error.service';

interface ApiRequestOptions {
  withCredentials?: boolean;
  redirectToLoginOnUnauthorized?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private readonly http = inject(HttpClient);
  private readonly httpErrorService = inject(HttpErrorService);

  // ---------------- POST ----------------

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody,
    mockValue?: TExpect,
    option?: ApiRequestOptions
  ): Promise<ApiResponse<TExpect>> {
    if (this.isMockEnabled()) {
      return this.mockResponse(mockValue);
    }

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(url, bodyValue, {
          withCredentials: option?.withCredentials ?? false,
        })
      );

      return this.success(this.normalizeResponse(response));
    } catch (error) {
      return this.httpErrorService.handleHttpError<TExpect>(
        error,
        option?.redirectToLoginOnUnauthorized ?? true
      );
    }
  }

  // ---------------- GET ----------------

  public async CommunicateWithAPI_Get<TExpect>(
    url: string,
    mockValue?: TExpect,
    option?: ApiRequestOptions
  ): Promise<ApiResponse<TExpect>> {
    if (this.isMockEnabled()) {
      return this.mockResponse(mockValue);
    }

    try {
      const response = await firstValueFrom(
        this.http.get<TExpect>(url, {
          withCredentials: option?.withCredentials ?? false,
        })
      );

      return this.success(trimInDeep(response));
    } catch (error) {
      return this.httpErrorService.handleHttpError<TExpect>(
        error,
        option?.redirectToLoginOnUnauthorized ?? true
      );
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
      return this.mockProgress(mockValue);
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
            case HttpEventType.Response:
              return {
                success: true,
                data: trimInDeep(event.body),
              } as ApiResponse<TExpect>;
            default:
              return 0;
          }
        }),
        catchError(async (error: unknown) => {
          throw await this.httpErrorService.handleHttpError<TExpect>(
            error,
            option?.redirectToLoginOnUnauthorized ?? true
          );
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

  private mockProgress<T>(mock?: T): Observable<ApiResponse<T> | number> {
    return new Observable((observer) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        observer.next(progress);

        if (progress >= 100) {
          clearInterval(timer);
          observer.next(this.mockResponse(mock));
          observer.complete();
        }
      }, 200);
    });
  }
}
