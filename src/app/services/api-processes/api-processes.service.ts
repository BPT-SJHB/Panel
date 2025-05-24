import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'app/constants/api';
import { handleHttpError } from 'app/utils/http-error-handler';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'app/constants/routes';
import { firstValueFrom } from 'rxjs';
import { ApiGroupProcess } from 'app/model/api-group-process.model';
import { ApiResponse } from 'app/model/api-Response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiProcessesService {
  private readonly apiUrl = API_ROUTES.Processes;
  private sessionId: string = '';

  constructor(
    private http: HttpClient,
    private auth: UserAuthService,
    private router: Router
  ) {
    this.sessionId = this.auth.getSessionId() ?? '';

    if (this.sessionId == '') {
      this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      return;
    }
  }
  public async getApiProcesses(): Promise<ApiResponse<[ApiGroupProcess]>> {
    try {
      const response = await firstValueFrom(
        this.http.post<[ApiGroupProcess]>(this.apiUrl, {
          sessionId: this.sessionId,
        })
      );

      return {
        success: true,
        data: response,
      };

      // return {
      //   success: true,
      //   data: [
      //     {
      //       PGTitle: 'اطلاعات پایه',
      //       PGIconName: 'BaseInformation',
      //       WebProcesses: [
      //         {
      //           PTitle:
      //             'رانندگان ، کامیونداران                                                                              ',
      //           PName: 'DriversAndTruckDrivers                            ',
      //           Description: ' ',
      //           PIconName: 'DriversAndTruckDrivers                            ',
      //         },
      //         {
      //           PTitle:
      //             'خودرو ، ناوگان حمل                                                                                  ',
      //           PName: 'CarsAndTrucks                                     ',
      //           Description: ' ',
      //           PIconName: 'CarsAndTrucks',
      //         },
      //         {
      //           PTitle:
      //             'شرکت های حمل و نقل                                                                                  ',
      //           PName: 'TransportCompanies                                ',
      //           Description: ' ',
      //           PIconName: 'TransportCompanies',
      //         },
      //         {
      //           PTitle:
      //             'صنوف                                                                                                ',
      //           PName: 'Associations                                      ',
      //           Description: ' ',
      //           PIconName: 'Associatons',
      //         },
      //         {
      //           PTitle:
      //             'صاحبین بار                                                                                          ',
      //           PName: 'BarOwner                                          ',
      //           Description: ' ',
      //           PIconName: 'BarOwner',
      //         },
      //         {
      //           PTitle:
      //             'کارخانجات و مراکز تولید                                                                             ',
      //           PName: 'Manufactures                                      ',
      //           Description: ' ',
      //           PIconName: 'Manufactures',
      //         },
      //         {
      //           PTitle:
      //             'مبادی و مقاصد حمل                                                                                   ',
      //           PName: 'LoadingDischargingLocations                       ',
      //           Description: ' ',
      //           PIconName: 'LoadingDischargingLocations                       ',
      //         },
      //       ],
      //     },
      //   ],
      // };
    } catch (error: unknown) {
      return handleHttpError<[ApiGroupProcess]>(error);
    }
  }
}
