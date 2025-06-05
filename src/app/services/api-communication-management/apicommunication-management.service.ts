import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private http = inject(HttpClient);

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody
  ): Promise<ApiResponse<TExpect>> {
    const apiUrl = url;

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(apiUrl, bodyValue)
      );

      // console.log(response);

      return { success: true, data: response };
    } catch (error: unknown) {
      console.log(error)
      return handleHttpError<TExpect>(error);
    }
  }
}
