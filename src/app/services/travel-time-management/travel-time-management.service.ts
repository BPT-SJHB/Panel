import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { TravelTime } from 'app/data/model/travel-time.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockTravelTimes } from 'app/data/mock/travel-time.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class TravelTimeManagementService {
}
