import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/data/model/truck-driver-info.model';
import { firstValueFrom } from 'rxjs';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { handleHttpError } from 'app/utils/http-error-handler';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';

@Injectable({
  providedIn: 'root',
})
export class TruckDriverManagementService {
  constructor(private http: HttpClient, private userAuth: UserAuthService) {}

  /**
   * این تابع برای دریافت اطلاعات راننده از سرور های خارج از سیستم مورد استفاده قرار خواهد گرفت
   * @param truckDriverInfo اطلاعات راننده(در این متود فقط کد ملی راننده نیاز است)
   * @returns اطلاعات راننده در قالب پاسخ از سرور
   */
  public async GetDriverInfoFromOutdoorAPI(
    truckDriverInfo: TruckDriverInfo
  ): Promise<ApiResponse<TruckDriverInfo>> {
    const apiUrl =
      API_ROUTES.TransportationAPI.GetTruckDriverInfoFromOutdoorAPI;

    try {
      const response = await firstValueFrom(
        this.http.post<TruckDriverInfo>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckDriverNationalCode: truckDriverInfo.NationalCode,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<TruckDriverInfo>(error);
    }
  }

  /**
   * این تابع برای دریافت اطلاعات راننده از سرور های داخلی سیستم مورد استفاده قرار خواهد گرفت
   * @param truckDriverInfo اطلاعات راننده (در این متود فقط کد ملی راننده نیاز است)
   * @returns اطلاعات راننده در قالب پاسخ از سرور
   */
  public async GetTruckDriverInfoFromLocalAPI(
    truckDriverInfo: TruckDriverInfo
  ): Promise<ApiResponse<TruckDriverInfo>> {
    const apiUrl = API_ROUTES.TransportationAPI.GetTruckDriverInfoFromLocalAPI;

    try {
      const response = await firstValueFrom(
        this.http.post<TruckDriverInfo>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckDriverNationalCode: truckDriverInfo.NationalCode,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<TruckDriverInfo>(error);
    }
  }
}
