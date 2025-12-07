import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import {
  DeleteTPTParamInfo,
  EditTPTParamRelationToAnnouncementGroupAndSubGroup,
  RegisterTPTParamInfo,
  RegisterTPTParamRelationToAnnouncementGroupAndSubGroup,
  TPTParamInfo,
  TPTParamRelationToAnnouncementGroupAndSubGroup,
} from './model/tptparam-info.model';
import { API_ROUTES } from 'app/constants/api';
import {
  mockTPTParamsInfo,
  mockTPTParamsRelationToAnnouncementGroupAndSubGroupInfo,
} from './mock/tptparam-info.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TPTParamsManagementService {
  private apiCommunicator = inject(APICommunicationManagementService);
  private userAuth = inject(UserAuthService);

  //#region Transport Price Tarrif Parameter

  public async GetTPTParam(
    searchString: string
  ): Promise<ApiResponse<TPTParamInfo>> {
    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.TPTParams.GetTPTParam;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: searchString,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TPTParamInfo
    >(apiUrl, bodyValue, mockTPTParamsInfo[0]);
    //#endregion
  }

  public async GetAllTPTParams(): Promise<ApiResponse<TPTParamInfo[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.TPTParams.GetAllTPTParams;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TPTParamInfo[]
    >(apiUrl, bodyValue, mockTPTParamsInfo);
    //#endregion
  }

  public async RegisterTPTParam(
    tptParamInfo: RegisterTPTParamInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.TPTParams.RegisterTPTParam;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTPTParam: tptParamInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditTPTParam(
    tptParamInfo: TPTParamInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.TPTParams.EditTPTParam;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTPTParam: tptParamInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteTPTParam(
    tptParamInfo: DeleteTPTParamInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.TPTParams.DeleteTPTParam;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TPTPId: tptParamInfo.TPTPId,
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

  //#region Relation to announcement group and sub group

  public async GetAllRelationsToAnnouncementGroupAndSubGroup(): Promise<
    ApiResponse<TPTParamRelationToAnnouncementGroupAndSubGroup[]>
  > {
    //#region Consts
    const apiUrl =
      API_ROUTES.LoadCapacitorAPI.TPTParams
        .RelationToAnnouncementGroupAndSubGroup.GetAllRelations;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TPTParamRelationToAnnouncementGroupAndSubGroup[]
    >(
      apiUrl,
      bodyValue,
      mockTPTParamsRelationToAnnouncementGroupAndSubGroupInfo
    );
    //#endregion
  }

  public async RegisterTPTParamRelationToAnnouncementGroupAndSubGroup(
    relationInfo: RegisterTPTParamRelationToAnnouncementGroupAndSubGroup
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.LoadCapacitorAPI.TPTParams
        .RelationToAnnouncementGroupAndSubGroup.RegisterRelation;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTPTParamDetail: relationInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditTPTParamRelationToAnnouncementGroupAndSubGroup(
    relationInfo: EditTPTParamRelationToAnnouncementGroupAndSubGroup
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.LoadCapacitorAPI.TPTParams
        .RelationToAnnouncementGroupAndSubGroup.EditRelation;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTPTParamDetail: relationInfo,
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
