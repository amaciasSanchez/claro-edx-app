import { TestBed } from '@angular/core/testing';

import { OttServiceService } from './ott-service.service';

describe('OttServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OttServiceService = TestBed.get(OttServiceService);
    expect(service).toBeTruthy();
  });
});
