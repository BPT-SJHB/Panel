import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { firstValueFrom, map } from 'rxjs';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { UserSession } from 'app/data/model/user-session.model';
import { UserType } from 'app/data/model/user-type.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ShortResponse } from 'app/data/model/short-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService implements OnInit {
  constructor(private http: HttpClient, private userAuth: UserAuthService) {}

  /**
   * این متود برای ارسال لینک سامانه به کاربر مورد استفاده قرار خواهد گرفت
   * @param userInfo اطلاعات کاربری
   * @returns پیام تایید ارسال لینک سامانه
   */
  public async SendWebsiteLike(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.SendWebsiteLink;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserId: userInfo.UserId,
        })
      );

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }

  /**
   * این متود برای تغییر رمز عبور کاربران مورد استفاده قرار خواهد گرفت
   * @param userInfo اطلاعات کاربری
   * @returns شناسه و رمز جدید کاربر
   */
  public async ResetSoftwareUserPassword(userInfo: SoftwareUserInfo): Promise<
    ApiResponse<{
      UserName: string;
      Password: string;
    }>
  > {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.ResetSoftwareUserPassword;

    try {
      const response = await firstValueFrom(
        this.http.post<{
          UserShenaseh: string;
          UserPassword: string;
        }>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserId: userInfo.UserId,
        })
      );

      return {
        success: true,
        data: {
          UserName: response.UserShenaseh,
          Password: response.UserPassword,
        },
      };
    } catch (error: unknown) {
      return handleHttpError<{
        UserName: string;
        Password: string;
      }>(error);
    }
  }

  /**
   * این متود برای برای فعال سازی سرویس پیامک کاربر مورد استفاده قرار خواهد گرفت
   * @param userInfo اطلاعات کاربری
   * @returns پیام ثبت در صورت فعال شدن سرویس
   */
  public async ActivateUserSMS(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.ActivateSMSOwner;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserId: userInfo.UserId,
        })
      );

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }

  /**
   * این متود برای اعمال تغییر بر روی اطلاعات کاربر از قبل ثبت‌نام شده است
   * @param userInfo اطلاعات کاربری
   * @returns پیام تایید ثبت تغییرات اطلاعات کاربر در صورت تغییر اطلاعات کاربر
   */
  public async EditSoftwareUser(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.EditSoftwareUser;

    // const sampleData: SoftwareUserInfo = {
    //   UserId: 21,
    //   UserName: 'مرتضی شاهمرادی',
    //   MobileNumber: '09132043148',
    //   UserTypeId: 1,
    //   UserActive: true,
    //   SMSOwnerActive: false,
    // };

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          RawSoftwareUser: userInfo,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }

  /**
   * این متود برای ثبت کاربر جدید مورد استفاده قرار خواهد گرفت.
   * @param userInfo اطلاعات کاربری
   * @returns کد کاربری اختصاص داده شده در قالب اطلاعات کاربری
   */
  public async RegisterNewSoftwareUser(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<SoftwareUserInfo>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.RegisteringSoftwareUser;

    // const userInfo: SoftwareUserInfo = {
    //   UserId: 0,
    //   UserName: 'مرتضی شاهمرادی',
    //   MobileNumber: '09132043172',
    //   UserTypeId: 1,
    //   UserActive: true,
    //   SMSOwnerActive: false,
    // };response

    try {
      const response = await firstValueFrom(
        this.http
          .post<any>(apiUrl, {
            SessionId: this.userAuth.getSessionId(),
            RawSoftwareUser: userInfo,
          })
          .pipe(map((x) => ({ UserId: x.SoftwareUserId } as SoftwareUserInfo)))
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<SoftwareUserInfo>(error);
    }
  }

  /**
   * این تابع برای گرفتن اطلاعات کاربر استفاده خواهد شد
   * @param mobileNumber شماره موبایل کاربر
   * @returns اطلاعات کاربری در قالب پاسخ از سرور
   */
  public async GetSoftwareUserInfo(
    mobileNumber: string
  ): Promise<ApiResponse<SoftwareUserInfo>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.GetSoftwareUserInfo;

    try {
      const response = await firstValueFrom(
        this.http.post<SoftwareUserInfo>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserMobileNumber: mobileNumber,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<SoftwareUserInfo>(error);
    }
  }

  /**
   * این متود برای دریافت لیست انواع کاربران ممکن در سیستم را برمیگرداند
   * @returns لیستی از تمامی انواع کاربران
   */
  public async GetUserTypes(): Promise<ApiResponse<UserType[]>> {
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.GetUserTypes;

    try {
      const userSession: UserSession = {
        sessionId: this.userAuth.getSessionId() ?? '',
      };

      const response = await firstValueFrom(
        this.http.post<[UserType]>(apiUrl, userSession)
      );

      // Trim
      const newRespond = response.map((x) => ({
        UTId: x.UTId,
        UTTitle: x.UTTitle.trim(),
      }));

      return {
        success: true,
        data: newRespond,
      };
    } catch (error: unknown) {
      return handleHttpError<[UserType]>(error);
    }
  }

  /**
   * این متود برای تغییر دسترسی کاربر مورد نظر در سطح زیرمنو است.
   * فعال یا غیر فعال شدن بستگی به محتوای ارسالی ما دارد
   * @param userInfo اطلاعات کاربری(آیدی کاربر مورد انتظار است)
   * @param needToChange زیرمنو که نیاز به تغییر دارد(آیدی زیرمنو و وضعیت دسترسی مورد انتظار است)
   * @returns پیام پاسخ کوتاه سرور
   */
  public async ChangeUserWebProcessAccess(
    userInfo: SoftwareUserInfo,
    needToChange: ApiProcess
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement
        .ChangeSoftwareUserWebProcessAccess;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserId: userInfo.UserId,
          PId: needToChange.PId,
          PAccess: needToChange.PAccess,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }

  /**
   * این متود برای تغییر دسترسی کاربر مورد نظر در سطح منو اصلی است.
   * فعال یا غیر فعال شدن بستگی به محتوای ارسالی ما دارد
   * @param userInfo اطلاعات کاربری(آیدی کاربر مورد انتظار است)
   * @param needToChange منو اصلی که نیاز به تغییر دارد(آیدی منو اصلی و وضعیت دسترسی مورد انتظار است)
   * @returns پیام پاسخ کوتاه سرور
   */
  public async ChangeUserWebProcessGroupAccess(
    userInfo: SoftwareUserInfo,
    needToChange: ApiGroupProcess
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement
        .ChangeSoftwareUserWebProcessGroupAccess;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          SoftwareUserId: userInfo.UserId,
          PGId: needToChange.PGId,
          PGAccess: needToChange.PGAccess,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }
}
