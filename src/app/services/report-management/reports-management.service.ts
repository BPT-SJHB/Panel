import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { LoadPermission } from './model/load/load-permission.model';
import { API_ROUTES } from 'app/constants/api';
import { LoadInfo } from '../load-management/model/load-info.model';
import { mockLoadPermissions } from './mock/load/load-permission.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadAccounting } from './model/load/load-accounting.model';
import { mockLoadAccounting } from './mock/load/load-accounting.mock';
import { LoadPermissionForDriver } from './model/load/load-permission-for-driver.model';
import { mockLoadPermissionsForDriver } from './mock/load/load-permission-for-driver.mock';

@Injectable({
  providedIn: 'root',
})
export class ReportsManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetLoadPermissions(
    loadId: number
  ): Promise<ApiResponse<LoadPermission[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.Reports.Load.GetLoadPermissions;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadPermission[]
    >(apiUrl, bodyValue, mockLoadPermissions);
    //#endregion
  }

  public async GetLoadAccounting(
    loadId: number
  ): Promise<ApiResponse<LoadAccounting[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.Reports.Load.GetLoadAccounting;
    const loadInfo: LoadInfo = {
      LoadId: loadId,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      LoadId: loadInfo.LoadId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadAccounting[]
    >(apiUrl, bodyValue, mockLoadAccounting);
    //#endregion
  }

  public async GetLoadPermissionsForDriver(
    announcementGroupId: number,
    announcementSubGroupId: number
  ): Promise<ApiResponse<LoadPermissionForDriver[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.Reports.Load.GetLoadPermissionsForDriver;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AnnouncementGroupId: announcementGroupId,
      AnnouncementSubGroupId: announcementSubGroupId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      LoadPermissionForDriver[]
    >(apiUrl, bodyValue, mockLoadPermissionsForDriver);
    //#endregion
  }
}
