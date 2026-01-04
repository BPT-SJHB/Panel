import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { LoginFormData } from 'app/data/model/login-form-data.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { UserSession } from 'app/data/model/user-session.model';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { mockUserSession } from 'app/data/mock/user-session.mock';
import { SoftwareUserInfo } from 'app/services/user-management/model/software-user-info.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { mockSoftwareUserInfo } from '../user-management/mock/software-user-info.mock';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly apiUrl = API_ROUTES.SoftwareUserAPI.AuthUser;
  private readonly sessionKey = 'sessionId';

  private cookieService = inject(CookieService);
  private apiCommunicator = inject(APICommunicationManagementService);
  private router = inject(Router);

  public async login(
    loginFormData: LoginFormData
  ): Promise<ApiResponse<UserSession>> {
    //#region Mock Handling
    if (!environment.production && environment.disableApi) {
      await this.setSessionId(mockUserSession.sessionId, true);
      return {
        success: true,
        data: mockUserSession,
      };
    }
    //#endregion

    //#region Const
    const { sessionId, username, password, captcha, rememberMe } =
      loginFormData;
    const bodyValue = {
      SessionId: sessionId,
      UserShenaseh: username,
      Userpassword: password,
      Captcha: captcha,
    };
    //#endregion

    //#region Request + Return
    const result = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { SessionId: string }
    >(this.apiUrl, bodyValue, { SessionId: '' });

    if (result.data?.SessionId)
      await this.setSessionId(result.data.SessionId, rememberMe);

    return {
      success: result.success,
      data: {
        sessionId: result.data?.SessionId ?? '',
      },
      error: result.error,
    };
    //#endregion
  }

  public async logout(): Promise<void> {
    this.cookieService.delete(this.sessionKey, '/');
    try {
      await this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // console.error('Router navigate failed', err);
    }
    // سمت سرور اضافه شود در صورت نیاز
  }

  public async isLoggedIn(): Promise<ApiResponse<{ ISSessionLive: boolean }>> {
    const sessionId = this.getSessionId();
    if (sessionId === null) {
      return { success: true, data: { ISSessionLive: false } };
    }

    //#region Mock Handling
    if (!environment.production && environment.disableApi) {
      return { success: true, data: { ISSessionLive: true } };
    }
    //#endregion

    const apiUrl = API_ROUTES.SoftwareUserAPI.SessionChecker;

    const bodyValue = { sessionId: this.getSessionId() };

    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { ISSessionLive: boolean }
    >(apiUrl, bodyValue, { ISSessionLive: true });
    return response;
  }

  public getSessionId(): string | null {
    return this.cookieService.get(this.sessionKey) || null;
  }

  public async setSessionId(
    sessionId: string,
    rememberMe = false
  ): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.logout();
    }

    const cookieOptions: CookieOptions = {
      path: '/',
      secure: environment.production,
      sameSite: environment.production ? 'None' : 'Lax',
    };

    if (rememberMe) {
      cookieOptions.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    }

    this.cookieService.set(this.sessionKey, sessionId, cookieOptions);
  }

  public async GetUserOfSession(
    sessionId: string
  ): Promise<ApiResponse<SoftwareUserInfo>> {
    const apiUrl = API_ROUTES.SoftwareUserAPI.GetUserOfSession;
    const bodyValue = {
      SessionId: sessionId,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      SoftwareUserInfo
    >(apiUrl, bodyValue, mockSoftwareUserInfo);
  }
}
