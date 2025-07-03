import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { Tariff } from 'app/data/model/tariff.model';
import { mockTariffs } from 'app/data/mock/tariff.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TariffsManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
}
