import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoaderType } from 'app/services/loader-types/model/loader-type.model';
import { API_ROUTES } from 'app/constants/api';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { mockLoaderTypes } from './mock/loader-type.mock';
import {
  LoaderTypeToAnnouncementSubGroupRelation,
  RegisterDeleteRelationToAnnouncementSubGroup,
} from './model/loader-type-announcement-sub-groups-relation.model';
import { mockLoaderTypeToAnnouncementSubGroupRelation } from './mock/loader-type-announcement-sub-groups-relation.mock';

@Injectable({
  providedIn: 'root',
})
export class LoaderTypesService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLoaderTypesInfo(
    searchString: string
  ): Promise<ApiResponse<LoaderType[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LoaderTypes.GetLoaderTypes;
    const loaderTypesInfo: LoaderType = {
      LoaderTypeId: 0,
      LoaderTypeTitle: searchString,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: loaderTypesInfo.LoaderTypeTitle,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoaderType[]
    >(apiUrl, bodyValue, mockLoaderTypes);
    //#endregion
  }

  public async GetLoaderTypeInfoForSoftwareUser(): Promise<
    ApiResponse<LoaderType>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LoaderTypes.GetLoaderTypeInfoForSoftwareUser;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoaderType
    >(apiUrl, bodyValue, mockLoaderTypes[0]);
    //#endregion
  }

  public async ChangeLoaderTypeStatus(
    loaderTypeId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LoaderTypes.ChangeLoaderTypeStatus;
    const loaderTypeInfo: LoaderType = {
      LoaderTypeId: loaderTypeId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoaderTypeId: loaderTypeInfo.LoaderTypeId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  //#region RelationToAnnouncementSubGroups

  public async GetLoaderTypeRelationsToAnnouncementSubGroups(): Promise<
    ApiResponse<LoaderTypeToAnnouncementSubGroupRelation[]>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LoaderTypes
        .GetRelationsToAnnouncementSubGroups;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoaderTypeToAnnouncementSubGroupRelation[]
    >(apiUrl, bodyValue, mockLoaderTypeToAnnouncementSubGroupRelation);
    //#endregion
  }

  public async RegisterRelationToAnnouncementSubGroup(
    relationInfo: RegisterDeleteRelationToAnnouncementSubGroup
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LoaderTypes
        .RegisterRelationToAnnouncementSubGroup;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoaderTypeId: relationInfo.LoaderTypeId,
      AnnouncementSubGroupId: relationInfo.AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteRelationToAnnouncementSubGroup(
    relationInfo: RegisterDeleteRelationToAnnouncementSubGroup
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.LoaderTypes
        .DeleteRelationToAnnouncementSubGroup;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoaderTypeId: relationInfo.LoaderTypeId,
      AnnouncementSubGroupId: relationInfo.AnnouncementSGId,
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
