import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { TransportCompany } from './model/transport-company-info.model';
import { API_ROUTES } from 'app/constants/api';
import { mockTransportCompaniesInfo } from './mock/transport-company-info.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
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
export class TransportCompaniesManagementService {
}
