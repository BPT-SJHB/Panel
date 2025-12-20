import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class DevAuthService {
  private readonly userAuth = inject(UserAuthService);
  private readonly captcha = '123456';
  private readonly password = '123';

  async loginAsAdmin() {
    const username = '09132043148';
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
    const username = '09130843148';
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
    const username = '09962964696';
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

  private async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const response = await this.userAuth.login({
      sessionId: '',
      captcha: this.captcha,
      password,
      username,
      rememberMe: true,
    });

    return response;
  }
}
