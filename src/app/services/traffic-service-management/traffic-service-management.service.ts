import { inject, Injectable } from '@angular/core';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class TrafficServiceManagementService {
  private apiCommunicator = inject(APICommunicationManagementService);
}
