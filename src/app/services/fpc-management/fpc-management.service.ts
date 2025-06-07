import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { FPCInfo } from 'app/data/model/fpc-info.model';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { mockFPCsInfo } from 'app/data/mock/fpc-info.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import {
  APIUsernamePassword,
  UsernamePassword,
} from 'app/data/model/username-password.model';
import { mockAPIUsernamePassword } from 'app/data/mock/username-password.mock';

@Injectable({
  providedIn: 'root',
})
export class FpcManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
}
