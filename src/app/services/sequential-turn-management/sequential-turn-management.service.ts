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
}
