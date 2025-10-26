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

@Injectable({
  providedIn: 'root',
})
export class TrafficManagementService {
  private apiCommunicator = inject(APICommunicationManagementService);
  private userAuth = inject(UserAuthService);

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
    const apiUrl = API_ROUTES.TrafficAPI.RegisterTrafficCardType;
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
      ...trafficCost,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
}
