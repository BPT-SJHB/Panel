import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { FPCInfo } from 'app/data/model/fpc-info.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { mockFPCsInfo } from 'app/data/mock/fpc-info.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';
import { mockAPIUsernamePassword } from 'app/data/mock/username-password.mock';

@Injectable({
  providedIn: 'root',
})
export class FpcManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetFPCsInfo(
    fpcNameToSearch: string
  ): Promise<ApiResponse<FPCInfo[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.GetFPCs;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: fpcNameToSearch,
    };
    //#endregion

    //#region Request + Return
    return this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      FPCInfo[]
    >(apiUrl, bodyValue, mockFPCsInfo);
    //#endregion
  }

  public async GetFPCInfo(fpcId: number): Promise<ApiResponse<FPCInfo>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.GetFPC;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };
    //#endregion

    //#region Request + Return
    return this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      FPCInfo
    >(apiUrl, bodyValue, mockFPCsInfo[0]);
    //#endregion
  }

  public async FPCRegistering(
    rawFPCInfo: FPCInfo
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.FPCRegistering;
    const fpcInfo: FPCInfo = rawFPCInfo;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawFPC: fpcInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditFPC(
    rawFPCInfo: FPCInfo
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.EditFPC;
    const fpcInfo: FPCInfo = rawFPCInfo;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawFPC: fpcInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ActivateFPCSms(
    fpcId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.ActivateFPCSmsOwner;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };
    //#endregion

    //#region  Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ResetFPCUserPassword(
    fpcId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.ResetFPCUserPassword;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };
    //#endregion

    //#region  Request
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

  public async FPCChangeActiveStatus(
    fpcId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.FPC.FPCChangeActiveStatus;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };
    //#endregion

    //#region  Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
}
