import { TestBed } from '@angular/core/testing';
import { LoadAnnouncementPlacesService } from './load-announcement-places.service';
import {
  LoadAnnouncementPlace,
  zodLoadAnnouncementPlace,
} from 'app/data/model/load-announcement-place.model';
import { z } from 'zod';
import {
  createApiResponseSchema,
  validateResponse,
} from 'app/utils/validate-response.test.utils.spec';

const ApiLoadAnnouncementPlaceSchema = createApiResponseSchema(
  z.array(zodLoadAnnouncementPlace)
);

describe('LoadAnnouncementPlacesService', () => {
  let service: LoadAnnouncementPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(LoadAnnouncementPlacesService);
  });

  it('getLoadAnnouncementPlaces Method', async () => {
    const response = await service.getLoadAnnouncementPlaces();

    validateResponse<LoadAnnouncementPlace[]>(
      response,
      ApiLoadAnnouncementPlaceSchema
    );
  });
});
