import { TestBed } from '@angular/core/testing';

import { MccFinderService } from './mcc-finder.service';

describe('McciFinderService', () => {
  let service: MccFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MccFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
