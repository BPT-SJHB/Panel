import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetCaptchaApiResult } from './IGetCaptchaApiResult';

@Injectable({
  providedIn: 'root',
})
export class GetCaptchaService {
  private apiUrl = '';

  private readonly apiDomain_Ip = 'http://192.168.1.2';
  private readonly apiPort = '81';
  private readonly apiPath = '/api/GetCaptcha/';
}
