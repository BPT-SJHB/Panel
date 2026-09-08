import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { FPCInfo } from 'app/data/model/fpc-info.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';

@Injectable({
  providedIn: 'root',
})
export class FpcManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetFPCsInfo(
    fpcNameToSearch: string
  ): Promise<ApiResponse<FPCInfo[]>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.GetFPCs;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: fpcNameToSearch,
    };

    return this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      FPCInfo[]
    >(apiUrl, bodyValue);
  }

  public async GetFPCInfo(fpcId: number): Promise<ApiResponse<FPCInfo>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.GetFPC;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };

    return this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      FPCInfo
    >(apiUrl, bodyValue);
  }

  public async FPCRegistering(
    rawFPCInfo: FPCInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.FPCRegistering;
    const fpcInfo: FPCInfo = rawFPCInfo;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawFPC: fpcInfo,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }

  public async EditFPC(
    rawFPCInfo: FPCInfo
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.EditFPC;
    const fpcInfo: FPCInfo = rawFPCInfo;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawFPC: fpcInfo,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }

  public async ActivateFPCSms(
    fpcId: number
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.ActivateFPCSmsOwner;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }

  public async ResetFPCUserPassword(
    fpcId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.ResetFPCUserPassword;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };

    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      APIUsernamePassword
    >(apiUrl, bodyValue);

    return {
      success: response.success,
      data: {
        Username: response.data?.UserShenaseh ?? '',
        Password: response.data?.UserPassword ?? '',
      },
      error: response.error,
    };
  }

  public async FPCChangeActiveStatus(
    fpcId: number
  ): Promise<ApiResponse<ShortResponse>> {
    const apiUrl = API_ROUTES.TransportationAPI.FPC.FPCChangeActiveStatus;
    const fpcInfo: FPCInfo = { FPCId: fpcId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      FPCId: fpcInfo.FPCId,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue);
  }
}
