import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadInfo } from 'app/data/model/load-info.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { mockLoadInfo } from 'app/data/mock/load-info.mock';

@Injectable({
  providedIn: 'root',
})
export class LoadCapacitorManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLoad(loadId: number): Promise<ApiResponse<LoadInfo>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.LoadCapacitor.GetLoad;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadInfo
    >(apiUrl, bodyValue, mockLoadInfo);
    //#endregion
  }
}
