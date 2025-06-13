import { TestBed } from '@angular/core/testing';

import { APICommunicationManagementService } from './apicommunication-management.service';

describe('APICommunicationManagementService', () => {
  let service: APICommunicationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APICommunicationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
