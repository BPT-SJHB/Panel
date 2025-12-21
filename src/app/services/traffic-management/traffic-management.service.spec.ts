import { TestBed } from '@angular/core/testing';
import { TrafficManagementService } from './traffic-management.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { ShortResponse } from 'app/data/model/short-response.model';
import { DevAuthService } from '../dev-auth-service/dev-auth.service';

describe('TrafficManagementService', () => {
  let service: TrafficManagementService;
  let devAuth: DevAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrafficManagementService,
        APICommunicationManagementService,
        UserAuthService,
      ],
    });

    service = TestBed.inject(TrafficManagementService);
    devAuth = TestBed.inject(DevAuthService);
    devAuth.loginAsAdmin();
  });

  it('RegisterTrafficCardType: should return ShortResponse', async () => {
    const res = await service.RegisterTrafficCardType(
      `تستـ${Date.now().toLocaleString()}`
    );

    expect(res.data)
      .withContext('RegisterTrafficCardType: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('RegisterTrafficCardType: should return success message')
      .toBeDefined();
  });

  it('EditTrafficCardType: should return ShortResponse', async () => {
    const res = await service.EditTrafficCardType({
      TrafficCardTypeId: 1,
      TrafficCardTypeTitle: `ویرایش_تستـ${Date.now().toLocaleString()}`,
      Active: true,
    });

    expect(res.data)
      .withContext('EditTrafficCardType: should return response data')
      .toBeDefined();
  });

  it('GetTrafficCardTypes: should return array', async () => {
    const res = await service.GetTrafficCardTypes();

    expect(res.data)
      .withContext('GetTrafficCardTypes: should return an array')
      .toEqual(jasmine.any(Array));
  });

  it('GetTrafficCardTempTypes: should return array', async () => {
    const res = await service.GetTrafficCardTempTypes();

    expect(res.data)
      .withContext('GetTrafficCardTempTypes: should return an array')
      .toEqual(jasmine.any(Array));
  });

  it('RegisterTrafficCard: should return ShortResponse', async () => {
    const res = await service.RegisterTrafficCard(generateCardNumber(), 1, 1);

    expect(res.data)
      .withContext('RegisterTrafficCard: should return response data')
      .toBeDefined();

    expect((res.data as ShortResponse)?.Message)
      .withContext('RegisterTrafficCard: should return success message')
      .toBeDefined();
  });

  it('GetTrafficCosts: should return array', async () => {
    const res = await service.GetTrafficCosts();

    expect(res.data)
      .withContext('GetTrafficCosts: should return an array')
      .toEqual(jasmine.any(Array));
  });

  it('RegisterTrafficCost: should return ShortResponse', async () => {
    const res = await service.RegisterTrafficCost({
      TrafficCardTypeId: 1,
      EntryBaseCost: 100000,
      ExcessStoppageCost: 100000,
      ExcessStoppageDuration: 100000,
      NoCostStoppageDuration: 10000,
      Active: true,
    });

    expect(res.data)
      .withContext('RegisterTrafficCost: should return response data')
      .toBeDefined();
  });

  it('GetTrafficRecords: should return array', async () => {
    const res = await service.GetTrafficRecords(1);

    expect(res.data)
      .withContext('GetTrafficRecords: should return an array')
      .toEqual(jasmine.any(Array));
  });

  it('RegisterTraffic: should return TrafficInfo', async () => {
    const res = await service.RegisterTraffic(1, '123', 'image');

    expect(res.data)
      .withContext('RegisterTraffic: should return traffic info')
      .toBeDefined();
  });
});

function generateCardNumber(): string {
  const chars: string[] = [];
  const randomChar = (min: number, max: number) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);

  // Add letters (upper/lower) and digits
  for (let i = 0; i < 2; i++) chars.push(randomChar(65, 90)); // A–Z
  for (let i = 0; i < 2; i++) chars.push(randomChar(97, 122)); // a–z
  for (let i = 0; i < 2; i++) chars.push(randomChar(48, 57)); // 0–9

  // Shuffle characters and join
  return chars.sort(() => Math.random() - 0.5).join('');
}
