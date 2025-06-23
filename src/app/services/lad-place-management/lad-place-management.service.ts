import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { API_ROUTES } from 'app/constants/api';
import { LADPlace } from 'app/data/model/lad-place.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockLADPlaces } from 'app/data/mock/lad-place.mock';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class LADPlaceManagementService {
}
