import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_ROUTES } from '../../constants/api';
import { LoginFormData } from '../../model/login-form-data.model';
import { ApiResponse } from '../../model/api-Response.model';
import { handleHttpError } from '../../utils/http-error-handler';
import { IUserAuthService } from './user-auth.interface';
import { UserSession } from '../../model/user-session.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { mockUserSession } from '../../constants/dev';

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
    if (!environment.production && environment.mockTest) {
      this.cookieService.set(this.sessionKey, mockUserSession.sessionId, {
        path: '/',
        secure: environment.production,
        sameSite: 'None',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),// یک روز
      });

      return {
        success: true,
        data: mockUserSession,
      }
    }
    //#region  end

    try {
      const { sessionId,username, password, captcha } = loginFormData;

      const result: { SessionId: string } = await firstValueFrom(
        this.http.post<{ SessionId: string }>(this.apiUrl, {
          SessionId: sessionId,
          UserShenaseh: username,
          Userpassword: password,
          Captcha: captcha,
        })
      );

      // ذخیره SessionId در کوکی برای یک روز (24 ساعت)
      this.cookieService.set(this.sessionKey, result.SessionId, {
        path: '/',
        secure: environment.production,
        sameSite: 'None',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),// یک روز
      });

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
  }

  /**
   * بررسی اینکه آیا کاربر در حال حاضر وارد شده است یا خیر.
   * (در حال حاضر پیاده‌سازی نشده است؛ باید با سرور بررسی شود)
   */
  public isLoggedIn(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * دریافت شناسه نشست (Session ID) فعلی از کوکی.
   * برای شناسایی کاربر در سمت کلاینت استفاده می‌شود.
   */
  public getSessionId(): string | null {
    return this.cookieService.get(this.sessionKey) || null;
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
