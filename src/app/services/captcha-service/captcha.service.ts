import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CaptchaChallenge } from 'app/data/model/captcha-challenge.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { handleHttpError } from 'app/utils/http-error-handler';
import { environment } from 'environments/environment';
import { mockCaptcha } from 'app/data/mock/captcha-challenge.mock';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private readonly apiUrl = API_ROUTES.SoftwareUserAPI.CAPTCHA;

  constructor(private http: HttpClient) {}

  /**
   * این تابع برای دریافت کپچا از سمت سرور است.
   * کپچا شامل شناسه نشست و تصویر آن است.
   */
  public async getCaptcha(): Promise<ApiResponse<CaptchaChallenge>> {
    //#region  mock data
    // این قسمت برای من هست که دسترسی به api ندارم
    if (!environment.production && environment.disableApi) {
      return {
        success: true,
        data: mockCaptcha,
      };
    }

    //#endregion

    try {
      const response = await firstValueFrom(
        this.http.get<{ SessionId: string; Captcha: string }>(this.apiUrl)
      );

      return {
        success: true,
        data: {
          sessionId: response.SessionId,
          imageData: response.Captcha,
        },
      };
    } catch (error: unknown) {
      return handleHttpError<CaptchaChallenge>(error);
    }
  }
}
