import { TestBed } from '@angular/core/testing';

import { ProcessHTTPMsgService } from './processhttpmsg.service';

describe('ProcesshttpmsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPMsgService = TestBed.get(ProcessHTTPMsgService);
    expect(service).toBeTruthy();
  });
});
