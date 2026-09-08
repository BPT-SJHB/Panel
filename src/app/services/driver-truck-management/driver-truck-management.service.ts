import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TruckDriverInfo } from 'app/services/driver-truck-management/model/truck-driver-info.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';
import {
  TruckComposedInfo,
  TruckInfo,
} from 'app/services/driver-truck-management/model/truck-info.model';
import {
  TruckNativenessInfo,
  TruckNativenessType,
} from 'app/services/driver-truck-management/model/truck-nativeness-info.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { Wallet } from 'app/services/wallet-management/model/wallet.model';
import { SignUpInfo } from './model/sign-up-info.model';

@Injectable({
  providedIn: 'root',
})
export class Driver_TruckManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Driver

  public async GetDriverInfoFromAPI(
    nationalCode: string,
    sessionId: string | undefined = undefined
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
      SessionId: sessionId ?? this.userAuth.getSessionId(),
      TruckDriverNationalCode: truckDriverInfo.NationalCode,
    };
    //#endregion

    //#region Request + Return
    let response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckDriverInfo
    >(localApiUrl, bodyValue);

    if (!response.success) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckDriverInfo
      >(outdoorApiUrl, bodyValue);
    }

    return response;

    //#endregion
  }

  public async GetDriverInfoForSoftwareUser(): Promise<
    ApiResponse<TruckDriverInfo>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.GetTruckDriverInfoForSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckDriverInfo
    >(apiUrl, bodyValue);
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
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      APIUsernamePassword
    >(apiUrl, bodyValue);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        Username: response.data?.UserShenaseh ?? '',
        Password: response.data?.UserPassword ?? '',
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

  public async RegisterAnyUserByOTPCode(
    sessionId: string,
    otpCode: string,
    nationalId: string,
    smartCard: string
  ) {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Driver.RegisterAnyUserByOTPCode;
    const bodyValue = {
      SessionId: sessionId,
      OTPCode: otpCode,
      TruckDriverNationalCode: nationalId,
      TruckSmartCardNo: smartCard,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async VerifyAnyUserByOTPCode(
    sessionId: string,
    phone: string,
    captchaValue: string,
    driverNationalId: number,
    smartCardId: number
  ): Promise<ApiResponse<SignUpInfo>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Driver.VerifyAnyUserByOTPCode;
    const bodyValue = {
      SessionId: sessionId,
      MobileNumber: phone,
      Captcha: captchaValue,
      TruckDriverNationalCode: driverNationalId,
      TruckSmartCardNo: smartCardId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      SignUpInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  //#endregion

  //#region Truck

  public async GetTruckInfoFromAPI(
    smartCardNo: string,
    sessionId: string | undefined = undefined
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
      SessionId: sessionId ?? this.userAuth.getSessionId(),
      SmartCardNo: truckInfo.SmartCardNo,
    };
    //#endregion

    //#region Request + Return
    let response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(localApiUrl, bodyValue);

    if (!response.success) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckInfo
      >(outdoorApiUrl, bodyValue);
    }

    return response;
    //#endregion
  }

  public async GetTruckInfoForSoftwareUser(): Promise<ApiResponse<TruckInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Truck.GetTruckInfoForSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetTruckNativeness(
    truckId: number
  ): Promise<ApiResponse<TruckNativenessInfo>> {
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
      TruckNativenessInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetTruckNativenessTypes(): Promise<
    ApiResponse<TruckNativenessType[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Truck.GetTruckNativenessTypes;
    const bodyValue = {
      sessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckNativenessType[]
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async ChangeTruckNativeness(
    truckId: number,
    truckNativenessExpireDate: string
  ): Promise<ApiResponse<TruckNativenessInfo>> {
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
      TruckNativenessInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  //#endregion

  //#region Relations of Driver, Truck, MoneyWallet

  public async GetComposedTruckInfoWithLastActiveTurn(
    truckId: number
  ): Promise<ApiResponse<TruckComposedInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Truck.ComposedInfos.GetComposedTruckInfo;
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

  public async GetComposedTruckInfoWithLastTurn(
    truckId: number
  ): Promise<ApiResponse<TruckComposedInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Truck.ComposedInfos
        .GetComposedTruckInfoForTurnIssues;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
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
      API_ROUTES.TransportationAPI.Truck.ComposedInfos.SetComposedTruckInfo;
    const truckComposedInfo: TruckComposedInfo = {
      Truck: { TruckId: truckId },
      TruckDriver: { DriverId: driverId },
      Turn: { TurnId: turnId },
      MoneyWallet: { MoneyWalletId: moneyWalletId },
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckComposedInfo.Truck.TruckId,
      TruckDriverId: truckComposedInfo.TruckDriver?.DriverId,
      TurnId: truckComposedInfo.Turn?.TurnId,
      MoneyWalletId: truckComposedInfo.MoneyWallet?.MoneyWalletId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetVirtualWallet(): Promise<ApiResponse<Wallet>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.GetVirtualWallet;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Wallet
    >(apiUrl, bodyValue);
    //#endregion
  }
  //#endregion
}
