import { TestBed } from '@angular/core/testing';

import { CustomerInformationService } from './customer-information.service';

describe('CustomerInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerInformationService = TestBed.get(CustomerInformationService);
    expect(service).toBeTruthy();
  });
});
