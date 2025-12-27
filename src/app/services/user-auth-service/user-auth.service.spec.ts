import { TestBed } from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginFormData } from 'app/data/model/login-form-data.model';
import { SoftwareUserInfo } from '../user-management/model/software-user-info.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let cookieService: CookieService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService, CookieService],
    });

    service = TestBed.inject(UserAuthService);
    cookieService = TestBed.inject(CookieService);
    devAuth = TestBed.inject(DevAuthService);
    // Ensure no session before each test
    cookieService.delete('sessionId', '/');
  });

  it('should login, check session, get user, and logout', async () => {
    const loginData: LoginFormData = {
      sessionId: devAuth.sessionId,
      username: devAuth.adminUsername,
      password: devAuth.password,
      captcha: devAuth.captcha,
      rememberMe: true,
    };

    // 1️⃣ Login
    const loginRes = await service.login(loginData);
    expect(loginRes.success).toBeTrue();
    expect(loginRes.data?.sessionId).toBeDefined();

    const sessionId = loginRes.data!.sessionId;

    // 2️⃣ Check session
    const sessionCheckRes = await service.isLoggedIn();
    expect(sessionCheckRes.success).toBeTrue();
    expect(sessionCheckRes.data?.ISSessionLive).toBeTrue();

    // 3️⃣ Get user info of session
    const userRes = await service.GetUserOfSession(sessionId);
    expect(userRes.success).toBeTrue();
    expect(userRes.data).toEqual(jasmine.any(Object));
    expect((userRes.data as SoftwareUserInfo).UserId).toBeDefined();

    // 4️⃣ Logout
    await service.logout();
    const afterLogout = service.getSessionId();
    expect(afterLogout).toBeNull();

    // 5️⃣ After logout, session should be invalid
    const sessionCheckAfterLogout = await service.isLoggedIn();
    expect(sessionCheckAfterLogout.success).toBeTrue();
    expect(sessionCheckAfterLogout.data?.ISSessionLive).toBeFalse();
  });
});
