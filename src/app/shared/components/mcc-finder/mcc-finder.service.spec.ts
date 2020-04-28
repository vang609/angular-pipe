import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MccFinderService } from './mcc-finder.service';

describe('McciFinderService', () => {
  let service: MccFinderService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MccFinderService]
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MccFinderService);
  });

  it('should create mcc finder service', () => {
    expect(service).toBeTruthy();
  });
});
