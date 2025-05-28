import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_ROUTES } from 'app/constants/api';
import { LoginFormData } from 'app/data/model/login-form-data.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { IUserAuthService } from './user-auth.interface';
import { UserSession } from 'app/data/model/user-session.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { mockUserSession } from 'app/data/mock/user-session.mock';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements IUserAuthService {
  // آدرس API مربوط به احراز هویت
  private readonly apiUrl = API_ROUTES.Auth;

  // کلید مربوط به ذخیره‌سازی session ID در کوکی
  private readonly sessionKey = 'sessionId';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * احراز هویت کاربر از طریق ارسال اطلاعات فرم ورود به سرور.
   * اطلاعات شامل شناسه جلسه (SessionId)، نام کاربری، رمز عبور و کپچا می‌باشد.
   *
   * @param loginFormData - اطلاعات ورود کاربر
   * @returns Promise حاوی نتیجه پاسخ سرور به همراه شناسه نشست کاربر
   *
   * نکته: ذخیره‌سازی کوکی در سمت کلاینت انجام می‌شود؛ بهتر است این کار در سمت سرور انجام شود.
   */
  public async login(
    loginFormData: LoginFormData
  ): Promise<ApiResponse<UserSession>> {
    //#region  mock data
    // این قسمت برای من هست که دسترسی به api ندارم
    if (!environment.production && environment.disableApi) {
      this.setSessionId(mockUserSession.sessionId);
      return {
        success: true,
        data: mockUserSession,
      };
    }
    //#region  end

    try {
      const { sessionId, username, password, captcha } = loginFormData;

      const result: { SessionId: string } = await firstValueFrom(
        this.http.post<{ SessionId: string }>(this.apiUrl, {
          SessionId: sessionId,
          UserShenaseh: username,
          Userpassword: password,
          Captcha: captcha,
        })
      );

      this.setSessionId(result.SessionId);

      return {
        success: true,
        data: {
          sessionId: result.SessionId,
        },
      };
    } catch (error: unknown) {
      return handleHttpError<UserSession>(error);
    }
  }

  /**
   * خروج کاربر از سیستم با حذف کوکی session.
   * در صورت نیاز، می‌توان درخواست logout نیز به سمت سرور ارسال کرد.
   */
  public logout(): void {
    this.cookieService.delete(this.sessionKey);
    // سمت سرور اضافه شود در صورت نیاز
  }

  /**
   * بررسی اینکه آیا کاربر در حال حاضر وارد شده است یا خیر.
   */
  public async isLoggedIn(): Promise<ApiResponse<{ ISSessionLive: boolean }>> {
    const sessionId = this.getSessionId();
    if (sessionId == null) {
      return new Promise(function (resolve, _) {
        resolve({ success: false });
      });
    }

    // mock data
    if (!environment.production && environment.disableApi) {
      return { success: true, data: { ISSessionLive: true } };
    }

    // real data
    try {
      const respond: { ISSessionLive: boolean } = await firstValueFrom(
        this.http.post<{ ISSessionLive: boolean }>(
          this.apiUrl + '/isSessionLive',
          { sessionId: this.getSessionId() }
        )
      );

      return { success: true, data: respond };
    } catch (error: unknown) {
      return handleHttpError<{ ISSessionLive: boolean }>(error);
    }
  }

  /**
   * دریافت شناسه نشست (Session ID) فعلی از کوکی.
   * برای شناسایی کاربر در سمت کلاینت استفاده می‌شود.
   */
  public getSessionId(): string | null {
    return this.cookieService.get(this.sessionKey) || null;
  }

  private setSessionId(sessionId: string): void {
    if (this.getSessionId()) {
      this.logout();
    }

    this.cookieService.set(this.sessionKey, sessionId, {
      path: '/',
      secure: environment.production,
      sameSite: environment.production ? 'None' : 'Lax',
      expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    });
  }
}
