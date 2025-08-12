import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadForTransportCompanies } from './model/load-info-for-transport-companies.model';
import { API_ROUTES } from 'app/constants/api';
import { mockLoadForTransportCompanies } from './mock/load-info-for-transport-companies.mock';
import { LoadStatus } from './model/load-status.model';
import { mockLoadStatuses } from './mock/load-status.mock';
import { LoadInfo } from './model/load-info.model';
import { mockLoadInfo } from './mock/load-info.mock';
import { TransportTariffParam } from './model/transport-tariff-param.model';
import { mockTransportTariffParams } from './mock/transport-tariff-param.mock';
import { LoadRegister } from './model/load-register.model';
import { LoadEdit } from './model/load-edit.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { TruckInfo } from '../driver-truck-management/model/truck-info.model';
import { TruckDriverInfo } from '../driver-truck-management/model/truck-driver-info.model';
import { AnnouncementSubGroup } from '../announcement-group-subgroup-management/model/announcement-subgroup.model';
import { LoadAllocationInfo } from './model/load-allocation-info.model';
import { mockLoadAllocationInfos } from './mock/load-allocation-info.mock';

@Injectable({
  providedIn: 'root',
})
export class LoadManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Load methods

  public async GetLoadsForTransportCompanies(
    transportCompanyId: number,
    announcementGroupId?: number,
    announcementSubGroupId?: number,
    inventory?: boolean,
    date?: string,
    loadStatusId?: number,
    loadSourceCityId?: number,
    loadTargetCityId?: number
  ): Promise<ApiResponse<LoadForTransportCompanies[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetLoadsForTransportCompanies;
    let bodyValue: {
      SessionId: string;
      TransportCompanyId: number;
      AnnouncementGroupId?: number;
      AnnouncementSubGroupId?: number;
      Inventory?: boolean;
      ShamsiDate?: string;
      LoadStatusId?: number;
      LoadSourceCityId?: number;
      LoadTargetCityId?: number;
    } = {
      SessionId: this.userAuth.getSessionId() ?? '',
      TransportCompanyId: transportCompanyId,
    };

    if (announcementGroupId !== undefined) {
      bodyValue.AnnouncementGroupId = announcementGroupId;
    }
    if (announcementSubGroupId !== undefined) {
      bodyValue.AnnouncementSubGroupId = announcementSubGroupId;
    }
    if (inventory !== undefined) {
      bodyValue.Inventory = inventory;
    }
    if (date !== undefined) {
      bodyValue.ShamsiDate = date;
    }
    if (loadStatusId !== undefined) {
      bodyValue.LoadStatusId = loadStatusId;
    }
    if (loadSourceCityId !== undefined) {
      bodyValue.LoadSourceCityId = loadSourceCityId;
    }
    if (loadTargetCityId !== undefined) {
      bodyValue.LoadTargetCityId = loadTargetCityId;
    }
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadForTransportCompanies[]
    >(apiUrl, bodyValue, mockLoadForTransportCompanies);
    //#endregion
  }

  public async GetLoadForDrivers(
    announcementSubGroupId: number,
    loadStatusId: number
  ): Promise<ApiResponse<LoadStatus[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetLoadsForDriver;
    const loadInfo: LoadInfo = {
      LoadId: 0,
      LoadStatusId: loadStatusId,
    };
    const announcementSubgroupInfo: AnnouncementSubGroup = {
      AnnouncementSGId: announcementSubGroupId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementSGId: announcementSubgroupInfo.AnnouncementSGId,
      LoadStatusId: loadInfo.LoadStatusId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadStatus[]
    >(apiUrl, bodyValue, mockLoadStatuses);
    //#endregion
  }

  public async GetLoadStatuses(): Promise<ApiResponse<LoadStatus[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetLoadStatus;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadStatus[]
    >(apiUrl, bodyValue, mockLoadStatuses);
    //#endregion
  }

  public async GetLoadInfo(loadId: number): Promise<ApiResponse<LoadInfo>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetLoad;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadInfo
    >(apiUrl, bodyValue, mockLoadInfo);
    //#endregion
  }

  public async GetTransportTariffParams(
    tptParams: string
  ): Promise<ApiResponse<TransportTariffParam[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetTransportTariffParams;
    const loadInfo: LoadInfo = {
      LoadId: 0,
      TPTParams: tptParams,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TPTParams: loadInfo.TPTParams,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TransportTariffParam[]
    >(apiUrl, bodyValue, mockTransportTariffParams);
    //#endregion
  }

  public async RegisterNewLoad(
    load: LoadRegister
  ): Promise<ApiResponse<{ newLoadId: number }>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.RegisterLoad;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Load: load,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      { newLoadId: number }
    >(apiUrl, bodyValue, {
      newLoadId: 15,
    });
    //#endregion
  }

  public async EditLoad(load: LoadEdit): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.EditLoad;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Load: load,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteLoad(loadId: number): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.DeleteLoad;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async CancelLoad(loadId: number): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.CancelLoad;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async FreeLineLoad(
    loadId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.FreeLineLoad;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async SedimentLoad(
    loadId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.SedimentLoad;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
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

  //#region LoadAllocation methods

  public async RegisterNewLoadAllocationForTransportCompanies(
    truckId: number,
    driverId: number,
    loadId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.LoadAllocationAPI.RegistrationForTransportCompanies;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const driverInfo: TruckDriverInfo = {
      DriverId: driverId,
    };
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
      TruckDriverId: driverInfo.DriverId,
      LoadId: loadInfo.LoadId,
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
