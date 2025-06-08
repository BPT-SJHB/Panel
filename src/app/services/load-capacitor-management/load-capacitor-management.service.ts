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
}
