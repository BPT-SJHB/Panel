import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { LADPlace } from 'app/data/model/lad-place.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockLADPlaces } from 'app/data/mock/lad-place.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class LADPlaceManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLADPlaces(title: string): Promise<ApiResponse<LADPlace[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LADPlaces.GetLADPlaces;
    const ladPlaceInfo: LADPlace = {
      LADPlaceId: 0,
      LADPlaceTitle: title,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: ladPlaceInfo.LADPlaceTitle,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LADPlace[]
    >(apiUrl, bodyValue, mockLADPlaces);
    //#endregion
  }

  public async GetLADPlace(id: number): Promise<ApiResponse<LADPlace>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LADPlaces.GetLADPlace;
    const ladPlaceInfo: LADPlace = {
      LADPlaceId: id,
      LADPlaceTitle: '',
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LADPlaceId: ladPlaceInfo.LADPlaceId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LADPlace
    >(apiUrl, bodyValue, mockLADPlaces[0]);
    //#endregion
  }

  public async RegisterNewLADPlace(
    ladPlaceInfo: LADPlace
  ): Promise<ApiResponse<LADPlace>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LADPlaces.RegisterLADPlace;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawLADPlaceInf: ladPlaceInfo,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LADPlace
    >(apiUrl, bodyValue, mockLADPlaces[0]);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        LADPlaceId: response.data?.LADPlaceId ?? 0,
        LADPlaceTitle: '',
      },
      error: response.error,
    };
    //#endregion
  }

  public async UpdateLADPlace(
    ladPlaceInfo: LADPlace
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LADPlaces.UpdateLADPlace;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawLADPlaceInf: ladPlaceInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteLADPlace(
    ladPlaceId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LADPlaces.DeleteLADPlace;
    const ladPlaceInfo: LADPlace = {
      LADPlaceId: ladPlaceId,
      LADPlaceTitle: '',
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LADPlaceId: ladPlaceInfo.LADPlaceId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeLoadingPlaceStatus(
    ladPlaceId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LADPlaces.ChangeLoadingPlaceStatus;
    const ladPlaceInfo: LADPlace = {
      LADPlaceId: ladPlaceId,
      LADPlaceTitle: '',
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LADPlaceId: ladPlaceInfo.LADPlaceId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeDischargingPlaceStatus(
    ladPlaceId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LADPlaces.ChangeDischargingPlaceStatus;
    const ladPlaceInfo: LADPlace = {
      LADPlaceId: ladPlaceId,
      LADPlaceTitle: '',
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LADPlaceId: ladPlaceInfo.LADPlaceId,
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
