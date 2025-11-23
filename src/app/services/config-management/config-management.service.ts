import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import {
  DeleteInfoOfLoadAnnouncementConfig,
  LoadAnnouncementConfig,
} from './model/load-announcement-config.model';
import { API_ROUTES } from 'app/constants/api';
import { mockLoadAnnouncementConfigs } from './mock/load-announcement-config.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class ConfigManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetAllOfLoadAnnouncementConfig(): Promise<
    ApiResponse<LoadAnnouncementConfig[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.KernelTasksAPI.GetAllOfLoadAnnouncementConfig;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadAnnouncementConfig[]
    >(apiUrl, bodyValue, mockLoadAnnouncementConfigs);
    //#endregion
  }
}
