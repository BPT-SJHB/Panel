import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { UserAuthService } from 'app/services/user-auth-service/user-auth.service';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { PageGroup } from 'app/data/model/page-group.model';
import { mockPageGroup } from 'app/data/mock/page-group.mock';
import { APICommunicationManagementService } from 'app/services/api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class ApiProcessesService {
  private readonly apiUrl = API_ROUTES.SoftwareUserAPI.GetWebProcesses;

  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async getApiProcesses(): Promise<ApiResponse<PageGroup[]>> {
    await this.userAuth.isLoggedIn();

    //#region Consts
    const bodyValue = {
      sessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request
    const response = await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ApiGroupProcess[]
    >(this.apiUrl, bodyValue, mockPageGroup);
    //#endregion

    //#region Return
    const pageGroups = this.convertApiGroupsToPageGroups(response.data ?? []);

    return {
      success: response.success,
      data: pageGroups!,
      error: response.error,
    };
    //#endregion
  }

  private convertApiGroupsToPageGroups(
    apiGroups: ApiGroupProcess[]
  ): PageGroup[] {
    return apiGroups.map((group) => ({
      id: group.PGId,
      title: group.PGTitle!.trim(),
      icon: group.PGIconName!.trim(),
      processes: group.WebProcesses!.map((proc) => ({
        id: proc.PId,
        title: proc.PTitle!.trim(),
        name: proc.PName!.trim(),
        description: proc.Description!.trim(),
        icon: proc.PIconName!.trim(),
      })),
    }));
  }
}
