import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { mockUserSession } from 'app/data/mock/user-session.mock';

@Injectable({
  providedIn: 'root',
})
export class APICommunicationManagementService {
  private http = inject(HttpClient);
  private userAuth = inject(UserAuthService);

  public async CommunicateWithAPI_Post<TBody, TExpect>(
    url: string,
    bodyValue: TBody,
    mockValue?: any
  ): Promise<ApiResponse<TExpect>> {
    if (!environment.production && environment.disableApi) {
      this.userAuth.setSessionId(mockUserSession.sessionId);
      return {
        success: true,
        data: mockValue,
      };
    }

    const apiUrl = url;

    try {
      const response = await firstValueFrom(
        this.http.post<TExpect>(apiUrl, bodyValue)
      );

      // console.log(response);

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<TExpect>(error);
    }
  }
}
