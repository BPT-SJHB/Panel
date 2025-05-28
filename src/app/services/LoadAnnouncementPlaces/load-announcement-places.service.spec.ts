import { TestBed } from '@angular/core/testing';

import { LoadAnnouncementPlacesService } from './load-announcement-places.service';

describe('LoadAnnouncementPlacesService', () => {
  let service: LoadAnnouncementPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadAnnouncementPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
