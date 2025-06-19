import { inject, Injectable } from '@angular/core';
import { CaptchaChallenge } from 'app/data/model/captcha-challenge.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { mockCaptcha } from 'app/data/mock/captcha-challenge.mock';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private apiCommunicator = inject(APICommunicationManagementService);

  public async getCaptcha(): Promise<ApiResponse<CaptchaChallenge>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.CAPTCHA;
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Get<{
      SessionId: string;
      Captcha: string;
    }>(apiUrl, mockCaptcha);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        sessionId: response.data?.SessionId!,
        imageData: response.data?.Captcha!,
      },
      error: response.error,
    };
    //#endregion
  }
}
