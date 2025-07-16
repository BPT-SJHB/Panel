import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { LoginFormData } from 'app/data/model/login-form-data.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { UserSession } from 'app/data/model/user-session.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { mockUserSession } from 'app/data/mock/user-session.mock';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { mockSoftwareUserInfo } from 'app/data/mock/software-user-info.mock';
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
      await this.setSessionId(mockUserSession.sessionId);
      return {
        success: true,
        data: mockUserSession,
      };
    }
    //#endregion

    const { sessionId, username, password, captcha } = loginFormData;
    const bodyValue = {
      SessionId: sessionId,
      UserShenaseh: username,
      Userpassword: password,
      Captcha: captcha,
    };

    const result = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { SessionId: string }
    >(this.apiUrl, bodyValue);

    await this.setSessionId(result.data?.SessionId!);

    return {
      success: result.success,
      data: {
        sessionId: result.data?.SessionId!,
      },
      error: result.error,
    };
  }

  public async logout(): Promise<void> {
    this.cookieService.delete(this.sessionKey);
    // سمت سرور اضافه شود در صورت نیاز
  }

  public async isLoggedIn(): Promise<ApiResponse<{ ISSessionLive: boolean }>> {
    const sessionId = this.getSessionId();

    const apiUrl = API_ROUTES.SoftwareUserAPI.SessionChecker;
    if (sessionId == null) {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      await this.logout();
      return new Promise(function (resolve, _) {
        resolve({ success: false });
      });
    }

    //#region Mock Handling
    if (!environment.production && environment.disableApi) {
      return { success: true, data: { ISSessionLive: true } };
    }
    //#endregion

    const bodyValue = { sessionId: this.getSessionId() };

    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { ISSessionLive: boolean }
    >(apiUrl, bodyValue);
    return response;
  }

  public getSessionId(): string | null {
    return this.cookieService.get(this.sessionKey) || null;
  }

  public async setSessionId(sessionId: string): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.logout();
    }

    this.cookieService.set(this.sessionKey, sessionId, {
      path: '/',
      secure: environment.production,
      sameSite: environment.production ? 'None' : 'Lax',
      // expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    });
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
