import { TestBed } from '@angular/core/testing';
import { UserManagementService } from './user-management.service';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

const TEST_PASSWORD = 'NewPass123-';

// TODO: need captcha login not session Login
xdescribe('UserManagementService', () => {
  let service: UserManagementService;
  let devAuth: DevAuthService;
  const sleepTimeToWalletConnect = 120; // secound

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementService, DevAuthService],
    });

    service = TestBed.inject(UserManagementService);
    devAuth = TestBed.inject(DevAuthService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = Math.max(
      1000 * (sleepTimeToWalletConnect * 1.2),
      5 * 1000
    );
    devAuth.logout();
  });

  it('should create user, reset password, and allow custom password change', async () => {
    await devAuth.loginAsAdmin();

    const phone = generateRandomPhoneNumber();

    // 1️⃣ Register user
    const createRes = await service.RegisterNewSoftwareUser(
      createUserPayload(phone)
    );
    expect(createRes.success)
      .withContext('RegisterNewSoftwareUser failed')
      .toBeTrue();

    expect(createRes.data?.UserId)
      .withContext('RegisterNewSoftwareUser returned invalid UserId')
      .toBeGreaterThan(0);

    const userId = createRes.data!.UserId;

    // 2️⃣ Edit user
    const editRes = await service.EditSoftwareUser({ UserId: userId });
    expect(editRes.success).withContext('EditSoftwareUser failed').toBeTrue();

    // 3️⃣ Reset password
    const resetRes = await service.ResetSoftwareUserPassword(userId);
    expect(resetRes.success)
      .withContext('ResetSoftwareUserPassword failed')
      .toBeTrue();

    expect(resetRes.data?.Password)
      .withContext('ResetSoftwareUserPassword did not return password')
      .toBeDefined();

    const oldPassword = resetRes.data!.Password;

    // 4️⃣ Send website link
    const linkRes = await service.SendWebsiteLink(userId);
    expect(linkRes.success).withContext('SendWebsiteLink failed').toBeTrue();

    expect(linkRes.data?.Message)
      .withContext('SendWebsiteLink returned empty message')
      .toEqual(jasmine.any(String));

    // 5️⃣ Login as created user
    await devAuth.login({ username: phone, password: oldPassword });

    // 6️⃣ Get profile and sleep for 2 minutes
    const profileRes = await service.GetSoftwareUserProfile();
    expect(profileRes.success)
      .withContext('GetSoftwareUserProfile failed')
      .toBeTrue();

    await sleep(sleepTimeToWalletConnect * 1000);

    // 7️⃣ Custom password change
    const customRes = await service.CustomSoftwareUserPassword(
      userId,
      oldPassword,
      TEST_PASSWORD
    );
    expect(customRes.success)
      .withContext('CustomSoftwareUserPassword failed')
      .toBeTrue();

    // 8️⃣ Forget password
    const forgetRes = await service.ForgetSoftwareUserPassword(
      devAuth.sessionId,
      phone,
      devAuth.captcha
    );
    expect(forgetRes.success)
      .withContext('ForgetSoftwareUserPassword failed')
      .toBeTrue();

    // 9️⃣ Activate SMS
    const smsRes = await service.ActivateUserSMS(1);
    expect(smsRes.success).withContext('ActivateUserSMS failed').toBeTrue();

    // 🔟 Admin verification
    await devAuth.loginAsAdmin();
    const infoRes = await service.GetSoftwareUserInfo(phone);
    expect(infoRes.success)
      .withContext('GetSoftwareUserInfo failed (admin check)')
      .toBeTrue();
  });

  it('GetUserTypes should return UserType[]', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetUserTypes();

    expect(res.success).withContext('GetUserTypes failed').toBeTrue();

    expect(Array.isArray(res.data))
      .withContext('GetUserTypes returned non-array data')
      .toBeTrue();
  });

  it('ChangeUserWebProcessAccess should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.ChangeUserWebProcessAccess(1, 2, true);

    expect(res.success)
      .withContext('ChangeUserWebProcessAccess failed')
      .toBeTrue();
  });

  it('ChangeUserWebProcessGroupAccess should return ShortResponse', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.ChangeUserWebProcessGroupAccess(1, 3, false);

    expect(res.success)
      .withContext('ChangeUserWebProcessGroupAccess failed')
      .toBeTrue();
  });

  it('GetWebProcessGroups_WebProcesses should return ApiGroupProcess[]', async () => {
    await devAuth.loginAsAdmin();
    const res = await service.GetWebProcessGroups_WebProcesses(
      devAuth.adminUsername
    );

    expect(res.success)
      .withContext('GetWebProcessGroups_WebProcesses failed')
      .toBeTrue();

    expect(Array.isArray(res.data))
      .withContext('GetWebProcessGroups_WebProcesses returned non-array data')
      .toBeTrue();
  });
});

function createUserPayload(phone: string) {
  return {
    UserId: 0,
    UserName: phone,
    MobileNumber: phone,
    UserTypeId: 2,
    UserActive: true,
    SMSOwnerActive: true,
    UserTypeTitle: 'Admin',
  };
}

function generateRandomPhoneNumber(): string {
  return '09' + Math.floor(1e8 + Math.random() * 9e8).toString();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
