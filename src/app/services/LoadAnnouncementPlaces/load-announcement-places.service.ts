import { inject, Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';

@Injectable({
  providedIn: 'root',
})
export class LoadAnnouncementPlacesService {
  private apiCommunicator = inject(APICommunicationManagementService);

  public async getLoadAnnouncementPlaces(): Promise<
    ApiResponse<LoadAnnouncementPlace[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.Driver.LoadAnnouncementPlaces;
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Get<
      [LoadAnnouncementPlace]
    >(apiUrl, mockCargoTerminals);
    //#endregion
  }
}
