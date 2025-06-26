import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { TravelTime } from 'app/data/model/travel-time.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockTravelTimes } from 'app/data/mock/travel-time.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TravelTimeManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetTravelTimes(
    loaderTypeId: number,
    sourceCityId?: number | undefined,
    targetCityId?: number | undefined
  ): Promise<ApiResponse<TravelTime[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.TravelTime.GetTravelTimes;
    const travelTimeInfo: TravelTime = {
      LoaderTypeId: loaderTypeId,
      SourceCityId: sourceCityId ?? undefined,
      TargetCityId: targetCityId ?? undefined,
    };
    const bodyValue: {
      SessionId: string;
      LoaderTypeId: number;
      SourceCityId?: number;
      TargetCityId?: number;
    } = {
      SessionId: this.userAuth.getSessionId() ?? '',
      LoaderTypeId: travelTimeInfo.LoaderTypeId,
    };

    if (travelTimeInfo.SourceCityId != undefined) {
      bodyValue.SourceCityId = travelTimeInfo.SourceCityId;
    }
    if (travelTimeInfo.TargetCityId != undefined) {
      bodyValue.TargetCityId = travelTimeInfo.TargetCityId;
    }
    if (
      travelTimeInfo.SourceCityId == undefined &&
      travelTimeInfo.TargetCityId == undefined
    ) {
      bodyValue.SourceCityId = 0;
    }
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TravelTime[]
    >(apiUrl, bodyValue, mockTravelTimes);
    //#endregion
  }

  public async GetTravelTime(
    loaderTypeId: number,
    sourceCityId: number,
    targetCityId: number
  ): Promise<ApiResponse<TravelTime>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.TravelTime.GetTravelTime;
    const travelTimeInfo: TravelTime = {
      LoaderTypeId: loaderTypeId,
      SourceCityId: sourceCityId,
      TargetCityId: targetCityId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoaderTypeId: travelTimeInfo.LoaderTypeId,
      SourceCityId: travelTimeInfo.SourceCityId,
      TargetCityId: travelTimeInfo.TargetCityId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TravelTime
    >(apiUrl, bodyValue, mockTravelTimes[0]);
    //#endregion
  }
}
