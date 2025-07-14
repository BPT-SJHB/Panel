import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { Driver_TruckManagementService } from '../driver-truck-management/driver-truck-management.service';
import { API_ROUTES } from 'app/constants/api';
import { TruckInfo } from 'app/services/driver-truck-management/model/truck-info.model';
import { mockTurns } from './mock/turn.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TurnAccounting } from './model/turn-accounting.model';
import { mockTurnAccounting } from './mock/turn-accounting.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { SequentialTurn } from '../sequential-turn-management/model/sequential-turn.model';
import { Turn } from './model/turn.model';

@Injectable({
  providedIn: 'root',
})
export class TurnManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  //#region Turn main methods

  public async GetLatestTurns(truckId: number): Promise<ApiResponse<Turn[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Turns.GetLatestTurns;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Turn[]
    >(apiUrl, bodyValue, mockTurns);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        TurnId: data.TurnId,
        TurnIssueDate: data.TurnIssueDate?.trim(),
        TurnIssueTime: data.TurnIssueTime?.trim(),
        TruckDriver: data.TruckDriver?.trim(),
        SoftwareUserName: data.SoftwareUserName?.trim(),
        BillOfLadingNumber: data.BillOfLadingNumber?.trim(),
        OtaghdarTurnNumber: data.OtaghdarTurnNumber?.trim(),
        TurnStatusTitle: data.TurnStatusTitle?.trim(),
        TurnStatusDescription: data.TurnStatusDescription?.trim(),
        DateOfLastChanged: data.DateOfLastChanged?.trim(),
        SequentialTurnTitle: data.SequentialTurnTitle?.trim(),
      })),
      error: response.error,
    };
    //#endregion
  }

  public async GetTurnAccounting(
    turnId: number
  ): Promise<ApiResponse<TurnAccounting[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Turns.GetAccounting;
    const turnInfo: Turn = {
      TurnId: turnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TurnId: turnInfo.TurnId,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TurnAccounting[]
    >(apiUrl, bodyValue, mockTurnAccounting);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((data) => ({
        TurnId: data.TurnId,
        SequentialTurnId: data.SequentialTurnId?.trim(),
        DateShamsi: data.DateShamsi?.trim(),
        Time: data.Time?.trim(),
        AccountingTypeTitle: data.Time?.trim(),
        UserName: data.UserName?.trim(),
      })),
      error: response.error,
    };
    //#endregion
  }

  public async ResuscitateTurn(
    turnId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Turns.ResuscitateTurn;
    const turnInfo: Turn = {
      TurnId: turnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TurnId: turnInfo.TurnId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async CancelTurn(turnId: number): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Turns.CancelTurn;
    const turnInfo: Turn = {
      TurnId: turnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TurnId: turnInfo.TurnId,
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

  //#region Turn Registering method

  public async RealTimeTurnRegister(
    truckId: number,
    sequentialTurnId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Turns.TurnRegisterRequests
        .RealTimeTurnRegister;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const sequentialTurnInfo: SequentialTurn = {
      SeqTurnId: sequentialTurnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
      SequentialTurnId: sequentialTurnInfo.SeqTurnId,
    };
    //#endregion

    //#region Request
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EmergencyTurnRegister(
    truckId: number,
    sequentialTurnId: number,
    description: string
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Turns.TurnRegisterRequests
        .EmergencyTurnRegister;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const sequentialTurnInfo: SequentialTurn = {
      SeqTurnId: sequentialTurnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
      SequentialTurnId: sequentialTurnInfo.SeqTurnId,
      Description: description,
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

  //#region Reserve Turn

  public async ResuscitateReserveTurn(
    truckId: number,
    sequentialTurnId: number,
    date: string,
    time: string
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Turns.ReserveTurnRequests
        .ResuscitateReserveTurn;
    const truckInfo: TruckInfo = {
      TruckId: truckId,
    };
    const sequentialTurnInfo: SequentialTurn = {
      SeqTurnId: sequentialTurnId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TruckId: truckInfo.TruckId,
      SequentialTurnId: sequentialTurnInfo.SeqTurnId,
      ShamsiDate: date,
      Time: time,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ReserveTurnRegister(): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.Turns.ReserveTurnRequests
        .RegisterReserveTurn;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
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
