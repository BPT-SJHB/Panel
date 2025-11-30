import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import {
  DeleteInfoOfLoadAnnouncementConfig,
  LoadAnnouncementConfig,
} from './model/load-announcement-config.model';
import { API_ROUTES } from 'app/constants/api';
import { mockLoadAnnouncementConfigs } from './mock/load-announcement-config.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import {
  EditInfoOfGeneralConfig,
  GeneralConfig,
} from './model/general-config.model';
import { mockGeneralConfigs } from './mock/general-config.mock';
import { mockDevices } from './mock/device-config.mock';
import {
  DeleteInfoOfDevice,
  Device,
  RegisterInfoOfDevice,
} from './model/device-config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region LoadAnnouncementConfig

  public async GetAllOfLoadAnnouncementConfig(): Promise<
    ApiResponse<LoadAnnouncementConfig[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.GetAllOfLoadAnnouncementConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadAnnouncementConfig[]
    >(apiUrl, bodyValue, mockLoadAnnouncementConfigs);
    //#endregion
  }

  public async DeleteLoadAnnouncementConfig(
    deleteInfo: DeleteInfoOfLoadAnnouncementConfig
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.DeleteLoadAnnouncementConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      COLAId: deleteInfo.COLAId,
      COLAIndex: deleteInfo.COLAIndex,
      AnnouncementId: deleteInfo.AnnouncementId,
      AnnouncementSGId: deleteInfo.AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async RegisterLoadAnnouncementConfig(
    configInfo: LoadAnnouncementConfig
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.RegisterLoadAnnouncementConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawConfigurationOfLoadAnnouncement: configInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditLoadAnnouncementConfig(
    loadAnnouncementConfigInfo: LoadAnnouncementConfig
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.EditLoadAnnouncementConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawConfigurationOfLoadAnnouncement: loadAnnouncementConfigInfo,
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

  //#region GeneralConfig

  public async GetAllOfGeneralConfig(): Promise<ApiResponse<GeneralConfig[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.GetAllOfGeneralConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      GeneralConfig[]
    >(apiUrl, bodyValue, mockGeneralConfigs);
    //#endregion
  }

  public async EditGeneralConfig(
    generalInfo: EditInfoOfGeneralConfig
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.EditGeneralConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawGeneralConfiguration: generalInfo,
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

  //#region Devices

  public async GetAllOfDevices(): Promise<ApiResponse<Device[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.GetAllOfDevices;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Device[]
    >(apiUrl, bodyValue, mockDevices);
    //#endregion
  }

  public async RegisterDevice(
    deviceInfo: RegisterInfoOfDevice
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.RegisterDevice;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawDevice: deviceInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditDevice(
    deviceInfo: Device
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.EditDevice;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawDevice: deviceInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteDevice(
    deviceInfo: DeleteInfoOfDevice
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.DeleteDevice;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      DeviceId: deviceInfo.DeviceId,
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
}
