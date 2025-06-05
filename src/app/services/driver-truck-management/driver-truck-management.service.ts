import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
import { TruckInfo } from 'app/data/model/truck-info.model';
import { TruckNativenessInfo } from 'app/data/model/truck-nativeness-info.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class Driver_TruckManagementService {
  private http = inject(HttpClient);
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
  //#region Driver

  public async GetDriverInfoFromAPI(
    nationalCode: string
  ): Promise<ApiResponse<TruckDriverInfo>> {
    //#region Consts
    const outdoorApiUrl =
      API_ROUTES.TransportationAPI.Driver.GetTruckDriverInfoFromOutdoorAPI;
    const localApiUrl =
      API_ROUTES.TransportationAPI.Driver.GetTruckDriverInfoFromLocalAPI;
    const truckDriverInfo: TruckDriverInfo = {
      DriverId: 0,
      NationalCode: nationalCode,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckDriverNationalCode: truckDriverInfo.NationalCode,
    };
    //#endregion

    //#region Request + Return
    var response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckDriverInfo
    >(localApiUrl, bodyValue);

    if (response.error?.code == ErrorCodes.NotFoundInLocalAPI) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckDriverInfo
      >(outdoorApiUrl, bodyValue);
    }

    return response;
    //#endregion
  }

  public async RegisterNew_EditDriverMobileNumber(
    driverId: number,
    mobileNumber: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.TruckDriverRegisteringMobileNumber;
    const truckDriverInfo: TruckDriverInfo = {
      DriverId: driverId,
      MobileNumber: mobileNumber,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckDriverId: truckDriverInfo.DriverId,
      MobileNumber: truckDriverInfo.MobileNumber,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  /**
   * این متود برای فعال کردن سرویس پیامک راننده مورد استفاده قرار خواهد گرفت
   * @param truckDriverInfo اطلاعات راننده(در این متود فقط کد راننده مورد نیاز است)
   * @returns پیام تایید در قالب پاسخ از سرور
   */
  public async ActivateDriverSMS(
    truckDriverInfo: TruckDriverInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.ActivateTruckDriverSMSOwner;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckDriverId: truckDriverInfo.DriverId,
        })
      );

      return { success: true, data: response };
    } catch (error: unknown) {
      return handleHttpError<ShortResponse>(error);
    }
  }

  /**
   * این متود برای ریست کردن رمزعبور راننده مورد استفاده قرار خواهد گرفت
   * @param truckDriverInfo اطلاعات راننده(در این متود فقط کد راننده مورد نیاز است)
   * @returns رمزعبور و شناسه جدید راننده در قالب پاسخ از سرور
   */
  public async ResetDriverPassword(
    truckDriverInfo: TruckDriverInfo
  ): Promise<ApiResponse<UsernamePassword>> {
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.ResetTruckDriverUserPassword;

    try {
      const response = await firstValueFrom(
        this.http.post<APIUsernamePassword>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckDriverId: truckDriverInfo.DriverId,
        })
      );

      return {
        success: true,
        data: {
          Username: response.UserShenaseh,
          Password: response.UserPassword,
        },
      };
    } catch (error: unknown) {
      return handleHttpError<UsernamePassword>(error);
    }
  }

  /**
   * این متود برای ارسال لینک سامانه به راننده مورد استفاده قرار خواهد گرفت
   * @param userInfo اطلاعات راننده(در این متود فقط کد راننده مورد استفاده قرار خواهد گرفت)
   * @returns پیام تایید ارسال لینک سامانه در قالب پاسخ از سرور
   */
  public async SendWebsiteLink(
    truckDriverInfo: TruckDriverInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.TransportationAPI.Driver.SendWebsiteLink;

    try {
      const response = await firstValueFrom(
        this.http.post<ShortResponse>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckDriverId: truckDriverInfo.DriverId,
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

  //#endregion

  //#region Truck

  public async GetTruckInfoFromAPI(
    smartCardNo: string
  ): Promise<ApiResponse<TruckInfo>> {
    //#region Consts
    const truckInfo: TruckInfo = {
      TruckId: 0,
      SmartCardNo: smartCardNo,
    };
    const localApiUrl =
      API_ROUTES.TransportationAPI.Truck.GetTruckInfoFromLocalAPI;
    const outDoorApiUrl =
      API_ROUTES.TransportationAPI.Truck.GetTruckInfoFromOutdoorAPI;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SmartCardNo: truckInfo.SmartCardNo,
    };
    //#endregion

    //#region Request
    var response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(localApiUrl, bodyValue);

    if (!response.success) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckInfo
      >(outDoorApiUrl, bodyValue);
    }
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        TruckId: response.data?.TruckId!,
        LoaderTypeId: response.data?.LoaderTypeId,
        Pelak: response.data?.Pelak?.split('ع').join('-'),
        Serial: response.data?.Serial,
        SmartCardNo: response.data?.SmartCardNo,
      },
      error: response.error,
    };
    //#endregion
  }

  /**
   * این متود برای گرفتن اطلاعات بومی‌گری ناوگان
   * مورد استفاده قرار خواهد گرفت
   * @param truckInfo TruckId
   * @returns ApiResponse <= TruckInfo
   */
  public async GetTruckNativeness(
    truckInfo: TruckInfo
  ): Promise<ApiResponse<TruckInfo>> {
    const apiUrl = API_ROUTES.TransportationAPI.Truck.GetTruckNativeness;

    try {
      const response = await firstValueFrom(
        this.http.post<TruckInfo>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckId: truckInfo.TruckId,
        })
      );

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<TruckInfo>(error);
    }
  }

  /**
   * این متود برای تغییر اطلاعات بومی‌گری ناوگان
   * مورد استفاده قرار خواهد گرفت
   * @param truckInfo TruckId
   * @param truckNativenessInfo TruckNativenessExpireDate
   * @returns ApiResponse <= TruckInfo + TruckNativenessExpireDate
   */
  public async ChangeTruckNativeness(
    truckInfo: TruckInfo,
    truckNativenessInfo: TruckNativenessInfo
  ): Promise<ApiResponse<TruckInfo>> {
    const apiUrl = API_ROUTES.TransportationAPI.Truck.ChangeTruckNativeness;

    try {
      const response = await firstValueFrom(
        this.http.post<TruckInfo>(apiUrl, {
          SessionId: this.userAuth.getSessionId(),
          TruckId: truckInfo.TruckId,
          TruckNativenessExpireDate:
            truckNativenessInfo.TruckNativenessExpireDate,
        })
      );

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<TruckInfo>(error);
    }
  }

  //#endregion
}
