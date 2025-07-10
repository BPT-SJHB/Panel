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

@Injectable({
  providedIn: 'root',
})
export class SequentialTurnManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
  public async GetSequentialTurns(
    title: string
  ): Promise<ApiResponse<SequentialTurn[]>> {
    this.userAuth.isLoggedIn();

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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      SequentialTurn[]
    >(apiUrl, bodyValue, mockSequentialTurns);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        SeqTurnId: data.SeqTurnId,
        SeqTurnTitle: data.SeqTurnTitle?.trim(),
        SeqTurnKeyWord: data.SeqTurnKeyWord,
        Active: data.Active,
      })),
      error: response.error,
    };
    //#endregion
  }

  public async RegisterNewSequentialTurn(
    id: number,
    title: string,
    keyWord: string,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

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
    this.userAuth.isLoggedIn();

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
    this.userAuth.isLoggedIn();

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
  public async GetRelationOfSequentialTurnToLoaderTypes(
    id: number
  ): Promise<ApiResponse<RelationOfSequentialTurnToLoaderType[]>> {
    this.userAuth.isLoggedIn();

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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfSequentialTurnToLoaderType[]
    >(apiUrl, bodyValue, mockRelationOfSequentialTurnToLoaderTypes);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        SeqTurnId: data.SeqTurnId,
        SeqTurnTitle: data.SeqTurnTitle?.trim(),
        LoaderTypes: data.LoaderTypes.map((subData) => ({
          LoaderTypeId: subData.LoaderTypeId,
          LoaderTypeTitle: subData.LoaderTypeTitle?.trim(),
        })),
      })),
      error: response.error,
    };
    //#endregion
  }

  public async RegisterNewRelationOfSequentialTurnToLoaderType(
    sequentialTurnId: number,
    loaderTypeId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

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
    this.userAuth.isLoggedIn();

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
  public async GetRelationOfSequentialTurnToAnnouncementSubGroups(
    id: number
  ): Promise<ApiResponse<RelationOfSequentialTurnToAnnouncementSubGroup[]>> {
    this.userAuth.isLoggedIn();

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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      RelationOfSequentialTurnToAnnouncementSubGroup[]
    >(apiUrl, bodyValue, mockRelationOfSequentialTurnToAnnouncementSubGroups);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        SeqTurnId: data.SeqTurnId,
        SeqTurnTitle: data.SeqTurnTitle?.trim(),
        AnnouncementSubGroups: data.AnnouncementSubGroups.map((subData) => ({
          AnnouncementSGId: subData.AnnouncementSGId,
          AnnouncementSGTitle: subData.AnnouncementSGTitle?.trim(),
        })),
      })),
      error: response.error,
    };
    //#endregion
  }
}
