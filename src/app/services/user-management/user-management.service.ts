import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { firstValueFrom, map } from 'rxjs';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { UserSession } from 'app/data/model/user-session.model';
import { UserType } from 'app/data/model/user-type.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { SoftwareUserInfo } from 'app/data/model/software-user-info.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { ApiProcess } from 'app/data/model/api-process.model';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private http: HttpClient, private userAuth: UserAuthService) {}

  public async SendWebsiteLink(
    userId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Const
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.SendWebsiteLink;
    const userInfo: SoftwareUserInfo = {
      UserId: userId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserId: userInfo.UserId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async ResetSoftwareUserPassword(
    userId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.ResetSoftwareUserPassword;
    const userInfo: SoftwareUserInfo = { UserId: userId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserId: userInfo.UserId,
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

  public async ActivateUserSMS(
    userId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.ActivateSMSOwner;
    const userInfo: SoftwareUserInfo = { UserId: userId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserId: userInfo.UserId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async EditSoftwareUser(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.EditSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawSoftwareUser: userInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async RegisterNewSoftwareUser(
    userInfo: SoftwareUserInfo
  ): Promise<ApiResponse<SoftwareUserInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.RegisteringSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawSoftwareUser: userInfo,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      any
    >(apiUrl, bodyValue);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: { UserId: response.data?.SoftwareUserId! },
      error: response.error,
    };
    //#endregion
  }

  public async GetSoftwareUserInfo(
    mobileNumber: string
  ): Promise<ApiResponse<SoftwareUserInfo>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement.GetSoftwareUserInfo;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserMobileNumber: mobileNumber,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      SoftwareUserInfo
    >(apiUrl, bodyValue);
    //#endregion
  }

  public async GetUserTypes(): Promise<ApiResponse<UserType[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.SoftwareUserAPI.UserManagement.GetUserTypes;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      UserType[]
    >(apiUrl, bodyValue);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((x) => ({
        UTId: x.UTId,
        UTTitle: x.UTTitle.trim(),
      })),
      error: response.error,
    };
    //#endregion
  }

  public async ChangeUserWebProcessAccess(
    userId: number,
    pId: number,
    pAccess: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement
        .ChangeSoftwareUserWebProcessAccess;
    const userInfo: SoftwareUserInfo = { UserId: userId };
    const needToChange: ApiProcess = { PId: pId, PAccess: pAccess };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserId: userInfo.UserId,
      PId: needToChange.PId,
      PAccess: needToChange.PAccess,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }

  public async ChangeUserWebProcessGroupAccess(
    userId: number,
    pGId: number,
    pGAccess: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement
        .ChangeSoftwareUserWebProcessGroupAccess;
    const userInfo: SoftwareUserInfo = { UserId: userId };
    const needToChange: ApiGroupProcess = { PGId: pGId, PGAccess: pGAccess };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserId: userInfo.UserId,
      PGId: needToChange.PGId,
      PGAccess: needToChange.PGAccess,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }

  public async GetWebProcessGroups_WebProcesses(
    mobileNumber: string
  ): Promise<ApiResponse<ApiGroupProcess[]>> {
    const apiUrl =
      API_ROUTES.SoftwareUserAPI.UserManagement
        .GetWebProcessGroups_WebProcesses;
    const userInfo: SoftwareUserInfo = {
      UserId: 0,
      MobileNumber: mobileNumber,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SoftwareUserMobileNumber: userInfo.MobileNumber,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ApiGroupProcess[]
    >(apiUrl, bodyValue);
  }
}
