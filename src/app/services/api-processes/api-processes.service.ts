import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { handleHttpError } from 'app/utils/http-error-handler';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { firstValueFrom } from 'rxjs';
import { ApiGroupProcess } from 'app/model/api-group-process.model';
import { ApiResponse } from 'app/model/api-Response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiProcessesService {
  private readonly apiUrl = API_ROUTES.Processes;
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

  public async getApiProcesses(): Promise<ApiResponse<[ApiGroupProcess]>> {
  }
}
