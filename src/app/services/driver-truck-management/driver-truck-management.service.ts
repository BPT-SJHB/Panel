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

  public async ActivateDriverSMS(
    driverId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.ActivateTruckDriverSMSOwner;
    const truckDriverInfo: TruckDriverInfo = { DriverId: driverId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckDriverId: truckDriverInfo.DriverId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async ResetDriverPassword(
    driverId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.ResetTruckDriverUserPassword;
    const truckDriverInfo: TruckDriverInfo = { DriverId: driverId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckDriverId: truckDriverInfo.DriverId,
    };
    //#endregion

    //#region Request
    var response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      APIUsernamePassword
    >(apiUrl, bodyValue);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        Username: response.data?.UserShenaseh!,
        Password: response.data?.UserPassword!,
      },
      error: response.error,
    };
    //#endregion
  }

  public async SendWebsiteLink(
    driverId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Driver.SendWebsiteLink;
    const truckDriverInfo: TruckDriverInfo = { DriverId: driverId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckDriverId: truckDriverInfo.DriverId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
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
    const outdoorApiUrl =
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
      >(outdoorApiUrl, bodyValue);
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

  public async GetTruckNativeness(
    truckId: number
  ): Promise<ApiResponse<TruckInfo>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Truck.GetTruckNativeness;
    const truckInfo: TruckInfo = { TruckId: truckId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async ChangeTruckNativeness(
    truckId: number,
    truckNativenessExpireDate: string
  ): Promise<ApiResponse<TruckInfo>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Truck.ChangeTruckNativeness;
    const truckInfo: TruckInfo = { TruckId: truckId };
    const truckNativenessInfo: TruckNativenessInfo = {
      TruckNativenessExpireDate: truckNativenessExpireDate,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
      TruckNativenessExpireDate: truckNativenessInfo.TruckNativenessExpireDate,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  //#endregion

  //#region Relations of Driver, Truck, MoneyWallet

  public async GetComposedTruckInfo(
    truckId: number
  ): Promise<ApiResponse<TruckComposedInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver_Truck_Wallet.GetComposedTruckInfo;
    const truckInfo: TruckInfo = { TruckId: truckId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckComposedInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async SetComposedTruckInfo(
    truckId: number,
    driverId: number,
    turnId: number,
    moneyWalletId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver_Truck_Wallet.GetComposedTruckInfo;
    const truckComposedInfo: TruckComposedInfo = {
      Truck: { TruckId: truckId },
      TruckDriver: { DriverId: driverId },
      Turn: { nEnterExitId: turnId },
      MoneyWallet: { MoneyWalletId: moneyWalletId },
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckComposedInfo.Truck.TruckId,
      TruckDriverId: truckComposedInfo.TruckDriver.DriverId,
      TurnId: truckComposedInfo.Turn.nEnterExitId,
      MoneyWalletId: truckComposedInfo.MoneyWallet.MoneyWalletId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  //#endregion
}
