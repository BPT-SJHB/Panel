import { ApiResponse } from '../../model/api-Response.model';
import { LoginFormData } from '../../model/login-form-data.model';
import { UserSession } from '../../model/user-session.model';

/**
 * اینترفیس مربوط به سرویس احراز هویت کاربر.
 * شامل متدهایی برای ورود، خروج، بررسی وضعیت ورود و دریافت شناسه نشست می‌باشد.
 */
export interface IUserAuthService {
  /**
   * ورود کاربر با استفاده از اطلاعات فرم ورود و کپچا.
   * @param loginFormData - شامل اطلاعات ورود (مانند شناسه کاربری/رمز عبور) و کپچا
   * @returns یک Promise که حاوی پاسخ API به همراه اطلاعات نشست (Session) است.
   */
  login(loginFormData: LoginFormData): Promise<ApiResponse<UserSession>>;

  /**
   * خروج کاربر و پاک‌سازی اطلاعات نشست (Session).
   * @returns void
   */
  logout(): void;

  /**
   * بررسی اینکه آیا کاربر در حال حاضر وارد شده است یا خیر.
   * @returns یک Promise که مقدار true یا false برمی‌گرداند.
   */
  isLoggedIn(): Promise<boolean>;

  /**
   * دریافت شناسه نشست (Session ID) از روی کوکی یا ذخیره‌سازی محلی.
   * @returns شناسه نشست به صورت رشته یا null در صورت عدم وجود
   */
  getSessionId(): string | null;
}
