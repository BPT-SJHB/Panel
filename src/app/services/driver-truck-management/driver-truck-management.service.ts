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
import { TruckNativenessInfo } from 'app/services/driver-truck-management/model/truck-nativeness-info.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ErrorCodes } from 'app/constants/error-messages';
import { mockTruckDriverInfo } from 'app/services/driver-truck-management/mock/truck-driver-info.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { mockAPIUsernamePassword } from 'app/data/mock/username-password.mock';
import {
  mockTruckComposedInfo,
  mockTruckInfo,
} from 'app/services/driver-truck-management/mock/truck-info.mock';
import { mockTruckNativenessInfo } from 'app/services/driver-truck-management/mock/truck-nativeness-info.mock';
import { Wallet } from 'app/data/model/wallet.model';
import { mockWallet } from 'app/data/mock/wallet.mock';

@Injectable({
  providedIn: 'root',
})
export class Driver_TruckManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Driver

  public async GetDriverInfoFromAPI(
    nationalCode: string
  ): Promise<ApiResponse<TruckDriverInfo>> {
    this.userAuth.isLoggedIn();

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
    >(localApiUrl, bodyValue, mockTruckDriverInfo);

    if (response.error?.code == ErrorCodes.NotFoundInLocalAPI) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckDriverInfo
      >(outdoorApiUrl, bodyValue, mockTruckDriverInfo);
    }

    return {
      success: response.success,
      data: this.TrimTruckDriver(response.data!),
      error: response.error,
    };
    //#endregion
  }

  public async GetDriverInfoForSoftwareUser(): Promise<
    ApiResponse<TruckDriverInfo>
  > {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Driver.GetTruckDriverInfoForSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckDriverInfo
    >(apiUrl, bodyValue, mockTruckDriverInfo);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: this.TrimTruckDriver(response.data!),
      error: response.error,
    };
    //#endregion
  }

  private TrimTruckDriver(truckDriver: TruckDriverInfo): TruckDriverInfo {
    return {
      DriverId: truckDriver.DriverId,
      NationalCode: truckDriver.NationalCode?.trim(),
      NameFamily: truckDriver.NameFamily?.trim(),
      MobileNumber: truckDriver.MobileNumber?.trim(),
      FatherName: truckDriver.FatherName?.trim(),
      DrivingLicenseNo: truckDriver.DrivingLicenseNo?.trim(),
      Address: truckDriver.Address?.trim(),
      SmartCardNo: truckDriver.SmartCardNo?.trim(),
    };
  }

  public async RegisterNew_EditDriverMobileNumber(
    driverId: number,
    mobileNumber: string
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ActivateDriverSMS(
    driverId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ResetDriverPassword(
    driverId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockAPIUsernamePassword);
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
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  //#endregion

  //#region Truck

  public async GetTruckInfoFromAPI(
    smartCardNo: string
  ): Promise<ApiResponse<TruckInfo>> {
    this.userAuth.isLoggedIn();
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

    //#region Request + Return
    var response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckInfo
    >(localApiUrl, bodyValue, mockTruckInfo);

    if (!response.success) {
      response = await this.apiCommunicator.CommunicateWithAPI_Post<
        typeof bodyValue,
        TruckInfo
      >(outdoorApiUrl, bodyValue, mockTruckInfo);
    }

    return response;
    //#endregion
  }

  public async GetTruckInfoForSoftwareUser(): Promise<ApiResponse<TruckInfo>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockTruckInfo);
    //#endregion
  }

  public async GetTruckNativeness(
    truckId: number
  ): Promise<ApiResponse<TruckNativenessInfo>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockTruckNativenessInfo);
    //#endregion
  }

  public async ChangeTruckNativeness(
    truckId: number,
    truckNativenessExpireDate: string
  ): Promise<ApiResponse<TruckNativenessInfo>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockTruckNativenessInfo);
    //#endregion
  }

  //#endregion

  //#region Relations of Driver, Truck, MoneyWallet

  public async GetComposedTruckInfoWithLastActiveTurn(
    truckId: number
  ): Promise<ApiResponse<TruckComposedInfo>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Truck.ComposedInfos.GetComposedTruckInfo;
    const truckInfo: TruckInfo = { TruckId: truckId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckComposedInfo
    >(apiUrl, bodyValue, mockTruckComposedInfo);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: this.TrimComposedTruckInfo(response.data!),
      error: response.error,
    };
    //#endregion
  }

  public async GetComposedTruckInfoWithLastTurn(
    truckId: number
  ): Promise<ApiResponse<TruckComposedInfo>> {
    this.userAuth.isLoggedIn();

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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TruckComposedInfo
    >(apiUrl, bodyValue, mockTruckComposedInfo);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: this.TrimComposedTruckInfo(response.data!),
      error: response.error,
    };
    //#endregion
  }

  private TrimComposedTruckInfo(
    response: TruckComposedInfo
  ): TruckComposedInfo {
    let turn = response.Turn;
    if (turn) {
      turn = {
        TurnId: turn.TurnId,
        TurnIssueDate: turn.TurnIssueDate?.trim(),
        TurnIssueTime: turn.TurnIssueTime?.trim(),
        TruckDriver: turn.TruckDriver?.trim(),
        SoftwareUserName: turn.SoftwareUserName?.trim(),
        BillOfLadingNumber: turn.BillOfLadingNumber?.trim(),
        OtaghdarTurnNumber: turn.OtaghdarTurnNumber?.trim(),
        TurnStatusTitle: turn.TurnStatusTitle?.trim(),
        TurnStatusDescription: turn.TurnStatusDescription?.trim(),
        DateOfLastChanged: turn.DateOfLastChanged?.trim(),
        SequentialTurnTitle: turn.SequentialTurnTitle?.trim(),
      };
    }
    return {
      Truck: response.Truck,
      TruckDriver: response?.TruckDriver,
      MoneyWallet: response?.MoneyWallet,
      Turn: turn,
    };
  }

  public async SetComposedTruckInfo(
    truckId: number,
    driverId: number,
    turnId: number,
    moneyWalletId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async GetVirtualWallet(): Promise<ApiResponse<Wallet>> {
    this.userAuth.isLoggedIn();

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
    >(apiUrl, bodyValue, mockWallet);
    //#endregion
  }
  //#endregion
}
