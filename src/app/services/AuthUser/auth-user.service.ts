import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthUserValues } from './IAuthUserValues';
import { IAuthUserApiRequest } from './IAuthUserApiRequest';
import { IAuthUserApiRespond } from './IAuthUserApiRespond';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private apiUrl = '';

  private readonly apiDomain_Ip = 'http://192.168.1.2';
  private readonly apiPort = '81';
  private readonly apiPath = '/api/AuthUser';

  private userValues: IAuthUserValues | undefined;
  private apiRequest: IAuthUserApiRequest | undefined;
  private apiRespond: IAuthUserApiRespond | undefined;

  constructor(private http: HttpClient) {
    this.apiUrl = this.apiDomain_Ip
      .concat(':')
      .concat(this.apiPort)
      .concat(this.apiPath);
  }
  public Run(authUserValues: IAuthUserValues): IAuthUserApiRespond | undefined {
  }
}
