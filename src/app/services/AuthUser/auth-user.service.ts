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
}
