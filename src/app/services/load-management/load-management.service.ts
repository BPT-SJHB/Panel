import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadForTransportCompanies } from './model/load-info-for-transport-companies.model';
import { API_ROUTES } from 'app/constants/api';
import { mockLoadForTransportCompanies } from './mock/load-info-for-transport-companies.mock';

@Injectable({
  providedIn: 'root',
})
export class LoadManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLoadsForTransportCompanies(
    transportCompanyId: number,
    announcementGroupId?: number,
    announcementSubGroupId?: number,
    inventory?: boolean,
    date?: string,
    loadStatusId?: number,
    loadSourceCityId?: number,
    loadTargetCityId?: number
  ): Promise<ApiResponse<LoadForTransportCompanies[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.LoadCapacitorAPI.GetLoadsForTransportCompanies;
    let bodyValue: {
      SessionId: string;
      TransportCompanyId: number;
      AnnouncementGroupId?: number;
      AnnouncementSubGroupId?: number;
      Inventory?: boolean;
      ShamsiDate?: string;
      LoadStatusId?: number;
      LoadSourceCityId?: number;
      LoadTargetCityId?: number;
    } = {
      SessionId: this.userAuth.getSessionId() ?? '',
      TransportCompanyId: transportCompanyId,
    };

    if (announcementGroupId !== undefined) {
      bodyValue.AnnouncementGroupId = announcementGroupId;
    }
    if (announcementSubGroupId !== undefined) {
      bodyValue.AnnouncementSubGroupId = announcementSubGroupId;
    }
    if (inventory !== undefined) {
      bodyValue.Inventory = inventory;
    }
    if (date !== undefined) {
      bodyValue.ShamsiDate = date;
    }
    if (loadStatusId !== undefined) {
      bodyValue.LoadStatusId = loadStatusId;
    }
    if (loadSourceCityId !== undefined) {
      bodyValue.LoadSourceCityId = loadSourceCityId;
    }
    if (loadTargetCityId !== undefined) {
      bodyValue.LoadTargetCityId = loadTargetCityId;
    }
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadForTransportCompanies[]
    >(apiUrl, bodyValue, mockLoadForTransportCompanies);
    //#endregion
  }
}
