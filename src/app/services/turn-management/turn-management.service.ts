import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { Driver_TruckManagementService } from '../driver-truck-management/driver-truck-management.service';
import { API_ROUTES } from 'app/constants/api';
import { TruckInfo } from 'app/data/model/truck-info.model';
import { mockTurns } from './mock/turn.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { TurnAccounting } from './model/turn-accounting.model';
import { mockTurnAccounting } from './mock/turn-accounting.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { SequentialTurn } from '../sequential-turn-management/model/sequential-turn.model';
import { Turn } from './model/turn.model';

@Injectable({
  providedIn: 'root',
})
export class TurnManagementService {
}
