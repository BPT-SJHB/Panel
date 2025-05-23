import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_ROUTES } from 'app/constants/api';
import { LoginFormData } from 'app/model/login-form-data.model';
import { ApiResponse } from 'app/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { IUserAuthService } from './user-auth.interface';
import { UserSession } from 'app/model/user-session.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
import { mockUserSession } from 'app/constants/dev';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements IUserAuthService {
  // آدرس API مربوط به احراز هویت
  private readonly apiUrl = API_ROUTES.Auth;

  // کلید مربوط به ذخیره‌سازی session ID در کوکی
  private readonly sessionKey = 'sessionId';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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
      }
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

      this.setSessionId(result.SessionId)

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
   * (در حال حاضر پیاده‌سازی نشده است؛ باید با سرور بررسی شود)
   */
  public isLoggedIn(): Promise<boolean> {
    const sessionId = this.getSessionId();
    if (sessionId == null) {
      return new Promise(function (resolve, _) {
        resolve(false);
      });
    }

    // true
    // سمت سرور چک شود که نشست کاربر معتبر است یا خیر

    throw new Error('Method not implemented.');
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






//#region  for test

//#1
// this.Run({
//   Captcha: 'captchaTest',
//   SessionId: 'sessionIdTest',
//   Userpassword: 'userpasswordTest',
//   UserShenaseh: 'userShenasehTest',
// });



//#endregion

//#region for test

//#2
// return (this.apiRespond = {
//   SessionId: 'cb3d7916307b7713875d7cf0fd9639e4a5qddt$oRi2A',
// });

//#endregion
