import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';

enum LoginType {
  PASSWORD,
  SESSTION,
}

@Injectable({
  providedIn: 'root',
})
export class DevAuthService {
  private readonly userAuth = inject(UserAuthService);
  private readonly _sessionId = ''; // captcha sesstionId
  private readonly _captcha = '123456';
  private readonly password = '123';
  private readonly _adminUsername = '09132043148';
  private readonly _driverUsername = '09130853148';
  private readonly _companyUsername = '09131118842';

  private readonly loginType: LoginType = LoginType.SESSTION;

  private readonly adminSesstionId =
    'c244e7168fe85bf2a255a6c813bbdb70T)PTe^*V4FT2';

  private readonly driverSesstionId =
    '8ff5309ad269544774e813b0b8280566WwIUn$FIU#f$';

  private readonly companySesstionId =
    '3ec4d27ee1fcbe9fb659921c2ad39e70kYXjD30Hk@Q#';

  public get adminUsername() {
    return this._adminUsername;
  }

  public get driverUsername() {
    return this._driverUsername;
  }
  public get companyUsername() {
    return this._companyUsername;
  }

  public get sessionId() {
    return this._sessionId;
  }

  public get captcha() {
    return this._captcha;
  }

  async loginAsAdmin() {
    if (LoginType.SESSTION === this.loginType) {
      await this.loginWithSesstion(this.adminSesstionId);
      return;
    }
    const username = this.adminUsername;
    const response = await this.login({
      username: username,
      password: this.password,
    });

    if (response?.error) {
      console.error(response.error);
      throw new Error(`cannot login as admin with user: ${username}`);
    }

    return response;
  }

  async loginAsDriver() {
    if (LoginType.SESSTION === this.loginType) {
      await this.loginWithSesstion(this.driverSesstionId);
      return;
    }
    const username = this.driverUsername;
    const response = await this.login({
      username: username,
      password: this.password,
    });

    if (response?.error) {
      console.error(response.error);
      throw new Error(`cannot login as driver with user: ${username}`);
    }

    return response;
  }

  async loginAsCompany() {
    if (LoginType.SESSTION === this.loginType) {
      await this.loginWithSesstion(this.companySesstionId);
      return;
    }

    const username = this.companyUsername;
    const response = await this.login({
      username: username,
      password: this.password,
    });

    if (response?.error) {
      console.error(response.error);
      throw new Error(`cannot login as company with user: ${username}`);
    }
    return response;
  }

  async logout() {
    await this.userAuth.logout();
  }

  async login({ username, password }: { username: string; password: string }) {
    const response = await this.userAuth.login({
      sessionId: this.sessionId,
      captcha: this.captcha,
      password,
      username,
      rememberMe: true,
    });

    return response;
  }

  // TODO: Remove when session move to cookie base server side
  async loginWithSesstion(sessionId: string) {
    await this.userAuth.setSessionId(sessionId, true);
  }
}
