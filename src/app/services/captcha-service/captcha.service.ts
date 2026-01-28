import { inject, Injectable } from '@angular/core';
import { Captcha } from 'app/data/model/captcha-challenge.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { mockCaptcha } from 'app/data/mock/captcha-challenge.mock';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private apiCommunicator = inject(APICommunicationManagementService);

  public async getCaptcha(): Promise<ApiResponse<Captcha>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.CAPTCHA;
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Get<Captcha>(
      apiUrl,
      mockCaptcha
    );
    //#endregion
  }
}
