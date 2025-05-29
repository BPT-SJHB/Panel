import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { firstValueFrom } from 'rxjs';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { UserSession } from 'app/data/model/user-session.model';
import { UserType } from 'app/data/model/user-type.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { SoftwareUserInfoResponse } from 'app/data/model/software-user-info-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService implements OnInit {
  constructor(private http: HttpClient, private userAuth: UserAuthService) {}

  /**
   * این تابع برای گرفتن اطلاعات کاربر استفاده خواهد شد
   * @param mobileNumber شماره موبایل کاربر برای جست‌وجو
   * @returns اطلاعات کاربری در قالب پاسخ از سرور
   */
  public async GetSoftwareUserInfo(
    mobileNumber: string
  ): Promise<ApiResponse<SoftwareUserInfoResponse>> {
  }
}
