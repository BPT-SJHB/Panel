import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import {
  DeleteTariffInfo,
  EditTariffInfo,
  Tariff,
} from 'app/data/model/tariff.model';
import { mockTariffs } from 'app/data/mock/tariff.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TariffsManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetTariffs(
    loaderTypeId: number,
    sourceCityId: number | undefined,
    targetCityId: number | undefined,
    productId: number | undefined
  ): Promise<ApiResponse<Tariff[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.GetTariffs;
    const tariffsInfo: Tariff = {
      LoaderTypeId: loaderTypeId,
      SourceCityId: sourceCityId ?? undefined,
      TargetCityId: targetCityId ?? undefined,
      GoodId: productId ?? undefined,
    };
    const bodyValue: {
      SessionId: string;
      LoaderTypeId: number;
      SourceCityId?: number;
      TargetCityId?: number;
      GoodId?: number;
    } = {
      SessionId: this.userAuth.getSessionId() ?? '',
      LoaderTypeId: tariffsInfo.LoaderTypeId,
    };

    if (tariffsInfo.SourceCityId != undefined) {
      bodyValue.SourceCityId = tariffsInfo.SourceCityId;
    }
    if (tariffsInfo.TargetCityId != undefined) {
      bodyValue.TargetCityId = tariffsInfo.TargetCityId;
    }
    if (tariffsInfo.GoodId != undefined) {
      bodyValue.GoodId = tariffsInfo.GoodId;
    }
    if (
      tariffsInfo.SourceCityId == undefined &&
      tariffsInfo.TargetCityId == undefined &&
      tariffsInfo.GoodId == undefined
    ) {
      bodyValue.SourceCityId = 0;
    }

    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Tariff[]
    >(apiUrl, bodyValue, mockTariffs);
    //#endregion
  }

  public async AddPercentageToTariffs(
    tariffs: Tariff[],
    percentage: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.ChangeTariffsPercentage;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Tariffs: tariffs,
      AddPercentage: percentage,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteTariff(
    tariffInfo: DeleteTariffInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.DeleteTariff;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Tariff: tariffInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditTariffs(
    tariffInfo: EditTariffInfo
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.EditTariff;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Tariff: tariffInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeTariffsStatus(
    tariffs: Tariff[]
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.ChangeTariffsStatus;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Tariffs: tariffs,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async RegisterTariff(
    tariffInfo: Tariff
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Tariffs.RegisterTariff;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      Tariff: tariffInfo,
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
