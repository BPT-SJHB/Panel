import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { TransportCompany } from './model/transport-company-info.model';
import { API_ROUTES } from 'app/constants/api';
import { mockTransportCompaniesInfo } from './mock/transport-company-info.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';
import { mockAPIUsernamePassword } from 'app/data/mock/username-password.mock';

@Injectable({
  providedIn: 'root',
})
export class TransportCompaniesManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetTransportCompaniesInfo(
    title: string
  ): Promise<ApiResponse<TransportCompany[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies.GetTransportCompanies;
    const TransportCompaniesInfo: TransportCompany = {
      TCId: 0,
      TCTitle: title,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: TransportCompaniesInfo.TCTitle,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TransportCompany[]
    >(apiUrl, bodyValue, mockTransportCompaniesInfo);
    //#endregion
  }

  public async GetTransportCompanyInfo(
    transportCompanyId: number
  ): Promise<ApiResponse<TransportCompany>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies.GetTransportCompany;
    const transportCompanyInfo: TransportCompany = { TCId: transportCompanyId };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TransportCompanyId: transportCompanyInfo.TCId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      TransportCompany
    >(apiUrl, bodyValue, mockTransportCompaniesInfo[0]);
    //#endregion
  }

  public async EditTransportCompany(
    transportCompanyInfo: TransportCompany
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies.EditTransportCompany;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawTransportCompany: transportCompanyInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ActiveTransportCompanySmsService(
    transportCompanyId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies
        .ActivateTransportCompanySmsService;
    const transportCompanyInfo: TransportCompany = {
      TCId: transportCompanyId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TransportCompanyId: transportCompanyInfo.TCId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ResetTransportCompanyPassword(
    transportCompanyId: number
  ): Promise<ApiResponse<UsernamePassword>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies
        .ResetTransportCompanyPassword;
    const transportCompanyInfo: TransportCompany = {
      TCId: transportCompanyId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TransportCompanyId: transportCompanyInfo.TCId,
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      APIUsernamePassword
    >(apiUrl, bodyValue, mockAPIUsernamePassword);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: {
        Username: response.data?.UserShenaseh!,
        Password: response.data?.UserPassword!,
      },
      error: response.error,
    };
    //#endregion
  }

  public async ChangeTransportCompanyStatus(
    transportCompanyId: number
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.TransportCompanies
        .TransportCompanyChangeStatus;
    const transportCompanyInfo: TransportCompany = {
      TCId: transportCompanyId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      TransportCompanyId: transportCompanyInfo.TCId,
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
