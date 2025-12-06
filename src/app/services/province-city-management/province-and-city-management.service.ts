import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import {
  mockProvinceAndCities,
  mockProvinces,
} from 'app/services/province-city-management/mock/province-city.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { Province, City } from './model/province-city.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceAndCityManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetProvincesAndCitiesInfo(
    provinceAndCityName: string
  ): Promise<ApiResponse<Province[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.ProvinceAndCities.GetCities;
    const provinceAndCities: Province = {
      ProvinceId: 0,
      ProvinceName: provinceAndCityName,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: provinceAndCities.ProvinceName,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Province[]
    >(apiUrl, bodyValue, mockProvinceAndCities);
    //#endregion
  }

  public async GetAllProvinces(
    searchString: string
  ): Promise<ApiResponse<Province[]>> {
    const apiUrl = API_ROUTES.TransportationAPI.ProvinceAndCities.GetProvinces;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: searchString,
    };

    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      Province[]
    >(apiUrl, bodyValue, mockProvinces);
  }

  public async ChangeProvinceStatus(
    provinceId: number,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.ProvinceAndCities.ChangeProvinceStatus;
    const provinceInfo: Province = {
      ProvinceId: provinceId,
      ProvinceActive: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      ProvinceId: provinceInfo.ProvinceId,
      ProvinceActive: provinceInfo.ProvinceActive,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeCityStatus(
    cityCode: number,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.ProvinceAndCities.ChangeCityStatus;
    const cityInfo: City = {
      CityCode: cityCode,
      CityActive: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      CityId: cityInfo.CityCode,
      CityActive: cityInfo.CityActive,
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
