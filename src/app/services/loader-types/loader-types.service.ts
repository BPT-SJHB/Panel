import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoaderType } from 'app/data/model/loader-type.model';
import { API_ROUTES } from 'app/constants/api';
import { mockLoaderTypes } from 'app/data/mock/loader-type.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class LoaderTypesService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLoaderTypesInfo(
    searchString: string
  ): Promise<ApiResponse<LoaderType[]>> {
    this.userAuth.isLoggedIn();

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

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoaderType[]
    >(apiUrl, bodyValue, mockLoaderTypes);
    //#endregion

    //#region Return
    return {
      success: response.success,
      data: response.data?.map((loaderType) => ({
        LoaderTypeId: loaderType.LoaderTypeId,
        LoaderTypeTitle: loaderType.LoaderTypeTitle?.trim(),
        LoaderTypeOrganizationId: loaderType.LoaderTypeOrganizationId,
        LoaderTypeFixStatusId: loaderType.LoaderTypeFixStatusId,
        LoaderTypeFixStatusTitle: loaderType.LoaderTypeFixStatusTitle?.trim(),
        Active: loaderType.Active,
      })),
      error: response.error,
    };
    //#endregion
  }
}
