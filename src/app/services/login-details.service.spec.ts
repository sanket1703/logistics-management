import { TestBed } from '@angular/core/testing';

import { LoginDetailsService } from './login-details.service';

describe('LoginDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginDetailsService = TestBed.get(LoginDetailsService);
    expect(service).toBeTruthy();
  });
});
