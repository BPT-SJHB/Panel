import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { SequentialTurn } from './model/sequential-turn.model';
import { API_ROUTES } from 'app/constants/api';
import { mockSequentialTurns } from './mock/sequential-turn.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { RelationOfSequentialTurnToLoaderType } from './model/relation-of-sequentialTurn-to-loaderType.model';
import { mockRelationOfSequentialTurnToLoaderTypes } from './mock/relation-of-sequentialTurn-to-loaderType.mock';
import { RelationOfSequentialTurnToAnnouncementSubGroup } from './model/relation-of-sequentialTurn-to-announcementSubGroup.model';
import { mockRelationOfSequentialTurnToAnnouncementSubGroups } from './mock/relation-of-sequentialTurn-to-announcementSubGroup.mock';

@Injectable({
  providedIn: 'root',
})
export class SequentialTurnManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);
}
