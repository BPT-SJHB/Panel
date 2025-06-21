import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { mockProvinceAndCities } from 'app/data/mock/province-city.mock';
import { City, Province } from 'app/data/model/province-city.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { ShortResponse } from 'app/data/model/short-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceAndCityManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
}
