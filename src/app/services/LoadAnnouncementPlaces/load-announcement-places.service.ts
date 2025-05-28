import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { mockCargoTerminals } from 'app/data/mock/cargo-terminal.mock';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { LoadAnnouncementPlace } from 'app/data/model/load-announcement-place.model';
import { handleHttpError } from 'app/utils/http-error-handler';
import { environment } from 'environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadAnnouncementPlacesService {
  private readonly apiUrl = API_ROUTES.LoadAnnouncementPlaces;

  constructor(private http: HttpClient) {}

  public async getLoadAnnouncementPlaces(): Promise<
    ApiResponse<LoadAnnouncementPlace[]>
  > {
    // mock data

    if (!environment.production && environment.disableApi) {
      return { success: true, data: mockCargoTerminals };
    }

    // real data
    try {
      const response = await firstValueFrom(
        this.http.get<[LoadAnnouncementPlace]>(this.apiUrl)
      );

      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      return handleHttpError<[LoadAnnouncementPlace]>(error);
    }
  }
}
