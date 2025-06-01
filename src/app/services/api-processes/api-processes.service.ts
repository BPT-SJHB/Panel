import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { handleHttpError } from 'app/utils/http-error-handler';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { firstValueFrom } from 'rxjs';
import { ApiGroupProcess } from 'app/data/model/api-group-process.model';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { PageGroup } from 'app/data/model/page-group.model';
import { environment } from 'environments/environment';
import { mockPageGroup } from 'app/data/mock/page-group.mock';

@Injectable({
  providedIn: 'root',
})
export class ApiProcessesService {
  private readonly apiUrl = API_ROUTES.SoftwareUserAPI.GetWebProcesses;
  private sessionId: string = '';

  constructor(
    private http: HttpClient,
    private auth: UserAuthService,
    private router: Router
  ) {
    this.sessionId = this.auth.getSessionId() ?? '';

    if (this.sessionId == '') {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }
  }

  public async getApiProcesses(): Promise<ApiResponse<PageGroup[]>> {
    // mock data
    if (!environment.production && environment.disableApi) {
      return { success: true, data: mockPageGroup };
    }

    // real data
    try {
      const response = await firstValueFrom(
        this.http.post<ApiGroupProcess[]>(this.apiUrl, {
          sessionId: this.sessionId,
        })
      );

      const pageGroups = this.convertApiGroupsToPageGroups(response);

      return {
        success: true,
        data: pageGroups,
      };
    } catch (error: unknown) {
      return handleHttpError<PageGroup[]>(error);
    }
  }

  private convertApiGroupsToPageGroups(
    apiGroups: ApiGroupProcess[]
  ): PageGroup[] {
    return apiGroups.map((group, index) => ({
      id: index,
      title: group.PGTitle.trim(),
      icon: group.PGIconName.trim(),
      processes: group.WebProcesses.map((proc) => ({
        title: proc.PTitle.trim(),
        name: proc.PName.trim(),
        description: proc.Description.trim(),
        icon: proc.PIconName.trim(),
      })),
    }));
  }
}
