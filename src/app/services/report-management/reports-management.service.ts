import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { LoadPermission } from './model/load/load-permission.model';
import { API_ROUTES } from 'app/constants/api';
import { LoadInfo } from '../load-management/model/load-info.model';
import { mockLoadPermissions } from './mock/load/load-permission.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsManagementService {
  
}
