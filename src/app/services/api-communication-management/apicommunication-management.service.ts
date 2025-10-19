import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { environment } from 'environments/environment';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { ShortResponse } from 'app/data/model/short-response.model';
import { trimInDeep } from 'app/utils/api-utils';

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private http = inject(HttpClient);

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody,
    mockValue?: any,
    withCredentials = false
  ): Promise<ApiResponse<TExpect>> {
    if (!environment.production && environment.disableApi) {
      return {
        success: true,
        data: trimInDeep(mockValue),
      };
    }

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(url, bodyValue, {
          withCredentials: withCredentials,
        })
      );

      const mappedResponse =
        typeof response === 'string'
          ? ({ Message: response } as ShortResponse as TExpect)
          : (response as TExpect);

      return { success: true, data: trimInDeep(mappedResponse) };
    } catch (error: unknown) {
      return handleHttpError<TExpect>(error);
    }
  }

  public async CommunicateWithAPI_Get<TExpect>(
    url: string,
    mockValue?: any,
    withCredentials = false
  ): Promise<ApiResponse<TExpect>> {
    if (!environment.production && environment.disableApi) {
      return { success: true, data: trimInDeep(mockValue) };
    }

    try {
      const response = await firstValueFrom(
        this.http.get<TExpect>(url, { withCredentials: withCredentials })
      );

      return {
        success: true,
        data: trimInDeep(response),
      };
    } catch (error: unknown) {
      return handleHttpError<TExpect>(error);
    }
  }

  public CommunicateWithAPI_Post_FromData_With_Progress<TExpect>(
    url: string,
    bodyValue: FormData,
    mockValue?: any,
    withCredentials = false
  ): Observable<ApiResponse<TExpect> | number> {
    if (!environment.production && environment.disableApi) {
      return new Observable<ApiResponse<TExpect> | number>((observer) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          observer.next(progress);
          if (progress >= 100) {
            clearInterval(interval);
            observer.next({
              success: true,
              data: trimInDeep(mockValue),
            });
            observer.complete();
          }
        }, 200);
      });
    }

    return this.http
      .post<TExpect>(url, bodyValue, {
        withCredentials,
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
        catchError((error: unknown) => {
          throw handleHttpError<TExpect>(error);
        })
      );
  }
}
