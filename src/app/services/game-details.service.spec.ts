import { TestBed } from '@angular/core/testing';

import { GameDetailsService } from './game-details.service';

describe('GameDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameDetailsService = TestBed.get(GameDetailsService);
    expect(service).toBeTruthy();
  });
});
