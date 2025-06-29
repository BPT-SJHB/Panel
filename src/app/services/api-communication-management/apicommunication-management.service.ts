import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { ShortResponse } from 'app/data/model/short-response.model';

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private http = inject(HttpClient);

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody,
    mockValue?: any
  ): Promise<ApiResponse<TExpect>> {
    if (!environment.production && environment.disableApi) {
      return {
        success: true,
        data: mockValue,
      };
    }

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(url, bodyValue)
      );

      const mappedResponse =
        typeof response === 'string'
          ? ({ Message: response } as ShortResponse as TExpect)
          : (response as TExpect);

      return { success: true, data: mappedResponse };
    } catch (error: unknown) {
      return handleHttpError<TExpect>(error);
    }
  }

  public async CommunicateWithAPI_Get<TExpect>(
    url: string,
    mockValue?: any
  ): Promise<ApiResponse<TExpect>> {
    if (!environment.production && environment.disableApi) {
      return { success: true, data: mockValue };
    }

    try {
      const response = await firstValueFrom(this.http.get<TExpect>(url));

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<TExpect>(error);
    }
  }
}
