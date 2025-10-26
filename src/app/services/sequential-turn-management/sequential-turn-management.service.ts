import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { SequentialTurn } from './model/sequential-turn.model';
import { API_ROUTES } from 'app/constants/api';
import { mockSequentialTurns } from './mock/sequential-turn.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { RelationOfSequentialTurnToLoaderType } from './model/relation-of-sequentialTurn-to-loaderType.model';
import { mockRelationOfSequentialTurnToLoaderTypes } from './mock/relation-of-sequentialTurn-to-loaderType.mock';
import { RelationOfSequentialTurnToAnnouncementSubGroup } from './model/relation-of-sequentialTurn-to-announcementSubGroup.model';
import { mockRelationOfSequentialTurnToAnnouncementSubGroups } from './mock/relation-of-sequentialTurn-to-announcementSubGroup.mock';
import { LoaderType } from '../loader-types/model/loader-type.model';

@Injectable({
  providedIn: 'root',
})
export class SequentialTurnManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Sequential Turn

  public async GetSequentialTurns(
    title: string
  ): Promise<ApiResponse<SequentialTurn[]>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.GetSequentialTurns;
    const SequentialTurnInfo: SequentialTurn = {
      SeqTurnId: 0,
      SeqTurnTitle: title,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: SequentialTurnInfo.SeqTurnTitle,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      SequentialTurn[]
    >(apiUrl, bodyValue, mockSequentialTurns);
    //#endregion
  }

  public async RegisterNewSequentialTurn(
    id: number,
    title: string,
    keyWord: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.RegisterSequentialTurn;
    const sequentialTurnInfo: SequentialTurn = {
      SeqTurnId: id,
      SeqTurnTitle: title,
      SeqTurnKeyWord: keyWord,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawSequentialTurn: sequentialTurnInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditSequentialTurn(
    id: number,
    title: string,
    keyWord: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.EditSequentialTurn;
    const sequentialTurnInfo: SequentialTurn = {
      SeqTurnId: id,
      SeqTurnTitle: title,
      SeqTurnKeyWord: keyWord,
      Active: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawSequentialTurn: sequentialTurnInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteSequentialTurn(
    id: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.DeleteSequentialTurn;
    const sequentialTurnInfo: SequentialTurn = { SeqTurnId: id };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId: sequentialTurnInfo.SeqTurnId,
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

  //#region To LoaderType Relation

  public async GetRelationOfSequentialTurnToLoaderTypes(
    id: number
  ): Promise<ApiResponse<RelationOfSequentialTurnToLoaderType[]>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.RelationToLoaderTypes
        .GetRelationToLoaderTypes;
    const relationOfSequentialToLoaderTypeInfo: RelationOfSequentialTurnToLoaderType =
      {
        SeqTurnId: id,
        LoaderTypes: [],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId: relationOfSequentialToLoaderTypeInfo.SeqTurnId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfSequentialTurnToLoaderType[]
    >(apiUrl, bodyValue, mockRelationOfSequentialTurnToLoaderTypes);
    //#endregion
  }

  public async RegisterNewRelationOfSequentialTurnToLoaderType(
    sequentialTurnId: number,
    loaderTypeId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.RelationToLoaderTypes
        .RegisterRelationToLoaderType;
    const relationOfSequentialToLoaderTypeInfo: RelationOfSequentialTurnToLoaderType =
      {
        SeqTurnId: sequentialTurnId,
        LoaderTypes: [{ LoaderTypeId: loaderTypeId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId: relationOfSequentialToLoaderTypeInfo.SeqTurnId,
      LoaderTypeId:
        relationOfSequentialToLoaderTypeInfo.LoaderTypes[0].LoaderTypeId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteRelationOfSequentialTurnToLoaderType(
    sequentialTurnId: number,
    loaderTypeId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.RelationToLoaderTypes
        .DeleteRelationToLoaderType;
    const relationOfSequentialTurnToLoaderTypeInfo: RelationOfSequentialTurnToLoaderType =
      {
        SeqTurnId: sequentialTurnId,
        LoaderTypes: [{ LoaderTypeId: loaderTypeId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId: relationOfSequentialTurnToLoaderTypeInfo.SeqTurnId,
      LoaderTypeId:
        relationOfSequentialTurnToLoaderTypeInfo.LoaderTypes[0].LoaderTypeId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async GetSequentialTurnWithLoaderType(
    loaderTypeId: number
  ): Promise<ApiResponse<SequentialTurn[]>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns.RelationToLoaderTypes
        .GetSequentialTurnWithLoaderType;
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
      SequentialTurn[]
    >(apiUrl, bodyValue, mockSequentialTurns);
    //#endregion
  }

  //#endregion

  //#region To AnnouncementSubGroup Relation

  public async GetRelationOfSequentialTurnToAnnouncementSubGroups(
    id: number
  ): Promise<ApiResponse<RelationOfSequentialTurnToAnnouncementSubGroup[]>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns
        .RelationToAnnouncementSubGroups.GetRelationToAnnouncementSubGroups;
    const relationOfSequentialTurnToAnnouncementSubGroupInfo: RelationOfSequentialTurnToAnnouncementSubGroup =
      {
        SeqTurnId: id,
        AnnouncementSubGroups: [],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId:
        relationOfSequentialTurnToAnnouncementSubGroupInfo.SeqTurnId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfSequentialTurnToAnnouncementSubGroup[]
    >(apiUrl, bodyValue, mockRelationOfSequentialTurnToAnnouncementSubGroups);
    //#endregion
  }

  public async RegisterNewRelationOfSequentialTurnToAnnouncementSubGroup(
    sequentialTurnId: number,
    announcementSubGroupId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns
        .RelationToAnnouncementSubGroups.RegisterRelationToAnnouncementSubGroup;
    const relationOfSequentialTurnToAnnouncementSubGroupInfo: RelationOfSequentialTurnToAnnouncementSubGroup =
      {
        SeqTurnId: sequentialTurnId,
        AnnouncementSubGroups: [{ AnnouncementSGId: announcementSubGroupId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId:
        relationOfSequentialTurnToAnnouncementSubGroupInfo.SeqTurnId,
      AnnouncementSGId:
        relationOfSequentialTurnToAnnouncementSubGroupInfo
          .AnnouncementSubGroups[0].AnnouncementSGId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteRelationOfSequentialTurnToAnnouncementSubGroup(
    sequentialTurnId: number,
    announcementSubGroupId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.SequentialTurns
        .RelationToAnnouncementSubGroups
        .DeleteRelationToAnnouncementSubGroupDeleting;
    const relationOfSequentialTurnToAnnouncementSubGroupInfo: RelationOfSequentialTurnToAnnouncementSubGroup =
      {
        SeqTurnId: sequentialTurnId,
        AnnouncementSubGroups: [{ AnnouncementSGId: announcementSubGroupId }],
      };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SequentialTurnId:
        relationOfSequentialTurnToAnnouncementSubGroupInfo.SeqTurnId,
      AnnouncementSGId:
        relationOfSequentialTurnToAnnouncementSubGroupInfo
          .AnnouncementSubGroups[0].AnnouncementSGId,
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
