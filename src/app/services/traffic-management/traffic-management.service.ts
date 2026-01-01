import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { TrafficCardType } from './model/traffic-card-type.model';
import { API_ROUTES } from 'app/constants/api';
import { mockTrafficCardTypes } from './mock/traffic-card-type.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { TrafficCardTempType } from './model/traffic-card-temp-type.model';
import { mockTrafficCardTempTypes } from './mock/traffic-card-temp-type.mock';
import { TrafficCardTypeCost } from './model/traffic-card-type-cost.model';
import { mockTrafficCardTypeCosts } from './mock/traffic-card-type-cost.mock';
import { RawTrafficCost } from './model/raw-traffic-cost.model';
import { TrafficReportInfo } from './model/traffic-report-info.model';
import { mockTrafficReportInfos } from './mock/traffic-report-info.mock';
import { TrafficInfo } from './model/traffic-info.model';
import { mockTrafficInfo } from './mock/traffic-info.mock';

@Injectable({
  providedIn: 'root',
})
export class TrafficManagementService {
  private apiCommunicator = inject(APICommunicationManagementService);
  private userAuth = inject(UserAuthService);

  //#region TrafficCardType

  public async RegisterTrafficCardType(
    trafficCardTypeName: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.RegisterTrafficCardType;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TrafficCardTypeTitle: trafficCardTypeName,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditTrafficCardType(
    trafficCardTypeInfo: TrafficCardType
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.EditTrafficCardType;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTrafficCardType: trafficCardTypeInfo,
    };

    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async GetTrafficCardTypes(): Promise<ApiResponse<TrafficCardType[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.GetTrafficCardTypes;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TrafficCardType[]
    >(apiUrl, bodyValue, mockTrafficCardTypes);
    //#endregion
  }

  //#endregion

  //#region TrafficCardTempType

  public async GetTrafficCardTempTypes(): Promise<
    ApiResponse<TrafficCardTempType[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.GetTrafficCardTempTypes;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TrafficCardTempType[]
    >(apiUrl, bodyValue, mockTrafficCardTempTypes);
    //#endregion
  }

  //#endregion

  //#region TrafficCard

  public async RegisterTrafficCard(
    trafficCardNumber: string,
    trafficCardTypeId: number,
    trafficCardTempTypeId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.RegisterTrafficCard;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TrafficCardNo: trafficCardNumber,
      TrafficCardTypeId: trafficCardTypeId,
      TrafficCardTempTypeId: trafficCardTempTypeId,
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

  //#region TrafficCost

  public async GetTrafficCosts(): Promise<ApiResponse<TrafficCardTypeCost[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.GetTrafficCosts;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TrafficCardTypeCost[]
    >(apiUrl, bodyValue, mockTrafficCardTypeCosts);
    //#endregion
  }

  public async RegisterTrafficCost(
    trafficCost: RawTrafficCost
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.RegisterTrafficCost;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTrafficCost: {
        ...trafficCost,
      },
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

  //#region TrafficRecords

  public async GetTrafficRecords(
    trafficCardId: number
  ): Promise<ApiResponse<TrafficReportInfo[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.GetTrafficRecords;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TrafficCardId: trafficCardId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TrafficReportInfo[]
    >(apiUrl, bodyValue, mockTrafficReportInfos);
    //#endregion
  }

  public async RegisterTraffic(
    trafficGateId: number,
    trafficCardNumber: string,
    trafficPicture: string
  ): Promise<ApiResponse<TrafficInfo>> {
    //#region Consts
    const apiUrl = API_ROUTES.TrafficAPI.RegisterTraffic;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TrafficGateId: trafficGateId,
      TrafficCardNo: trafficCardNumber,
      TrafficPicture: trafficPicture,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TrafficInfo
    >(apiUrl, bodyValue, mockTrafficInfo);
    //#endregion
  }

  //#endregion
}
