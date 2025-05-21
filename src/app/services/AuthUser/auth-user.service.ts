import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthUserApiRequest } from './IAuthUserApiRequest';
import { IAuthUserApiRespond } from './IAuthUserApiRespond';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private apiUrl = '';

  private readonly apiDomain_Ip = 'http://192.168.1.3';
  private readonly apiPort = '81';
  private readonly apiPath = '/api/AuthUser';

  private apiRequest: IAuthUserApiRequest | undefined;
  private apiRespond: IAuthUserApiRespond | undefined;

  constructor(private http: HttpClient) {
    this.apiUrl = this.apiDomain_Ip
      .concat(':')
      .concat(this.apiPort)
      .concat(this.apiPath);

    //#region  for test

    //#1
    // this.Run({
    //   Captcha: 'captchaTest',
    //   SessionId: 'sessionIdTest',
    //   Userpassword: 'userpasswordTest',
    //   UserShenaseh: 'userShenasehTest',
    // });

    //#endregion
  }

  public async Run(
    authUserRequest: IAuthUserApiRequest
  ): Promise<IAuthUserApiRespond | undefined> {
    this.apiRequest = authUserRequest;

    //#2
    try {
      this.http
        .post<IAuthUserApiRespond>(this.apiUrl, this.apiRequest)
        .subscribe((data) => {
          this.apiRespond = data;
        });
    } catch (error) {
      throw error;
    }
    return this.apiRespond;

    //#region for test

    //#2
    // return (this.apiRespond = {
    //   SessionId: 'cb3d7916307b7713875d7cf0fd9639e4a5qddt$oRi2A',
    // });

    //#endregion
  }
}
