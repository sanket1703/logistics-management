import { TestBed } from '@angular/core/testing';

import { GamingDataService } from './gaming-data.service';

describe('GamingDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamingDataService = TestBed.get(GamingDataService);
    expect(service).toBeTruthy();
  });
});
