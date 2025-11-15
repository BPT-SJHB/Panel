import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { PageGroup } from 'app/data/model/page-group.model';
import { mockApiGroupProcesses } from 'app/data/mock/page-group.mock';
import { APICommunicationManagementService } from 'app/services/api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class ApiProcessesService {
  private readonly apiUrl = API_ROUTES.SoftwareUserAPI.GetWebProcesses;

  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async getApiProcesses(): Promise<ApiResponse<PageGroup[]>> {
    //#region Consts
    const bodyValue = {
      sessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ApiGroupProcess[]
    >(this.apiUrl, bodyValue, mockApiGroupProcesses);
    //#endregion

    //#region Return
    const pageGroups = this.convertApiGroupsToPageGroups(response.data ?? []);

    return {
      success: response.success,
      data: pageGroups ?? [],
      error: response.error,
    };
    //#endregion
  }

  private convertApiGroupsToPageGroups(
    apiGroups: ApiGroupProcess[]
  ): PageGroup[] {
    return apiGroups.map((group) => ({
      id: group.PGId,
      title: group.PGTitle!,
      icon: group.PGIconName!,
      processes: group.WebProcesses!.map((proc) => ({
        id: proc.PId,
        title: proc.PTitle!,
        name: proc.PName!,
        description: proc.Description!,
        icon: proc.PIconName!,
        foreColor: proc.ForeColor ?? 'green',
        backColor: proc.BackColor ?? 'green',
      })),
    }));
  }

  public async getTaskBarWebProcesses(): Promise<ApiResponse<PageGroup[]>> {
    const api = API_ROUTES.SoftwareUserAPI.GetTaskBarWebProcesses;
    //#region Consts
    const bodyValue = {
      sessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ApiGroupProcess[]
    >(api, bodyValue, mockApiGroupProcesses);
    //#endregion

    //#region Return
    const pageGroups = this.convertApiGroupsToPageGroups(response.data ?? []);

    return {
      success: response.success,
      data: pageGroups ?? [],
      error: response.error,
    };
    //#endregion
  }

  public async getVeyUsefulWebProcesses(): Promise<ApiResponse<PageGroup[]>> {
    const api = API_ROUTES.SoftwareUserAPI.GetVeyUsefulWebProcesses;
    //#region Consts
    const bodyValue = {
      sessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ApiGroupProcess[]
    >(api, bodyValue, mockApiGroupProcesses);
    //#endregion

    //#region Return
    const pageGroups = this.convertApiGroupsToPageGroups(response.data ?? []);

    return {
      success: response.success,
      data: pageGroups ?? [],
      error: response.error,
    };
    //#endregion
  }
}
