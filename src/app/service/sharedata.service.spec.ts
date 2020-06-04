import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedataService } from './sharedata.service';

describe('SharedataService', () => {
  let service: SharedataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SharedataService]
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedataService);
  });

  it('should create share data service', () => {
    expect(service).toBeTruthy();
  });

  it('should call sendMessage service', () => {
    service.sendMessage('Hi');
    expect(service.sendMessage).toBeTruthy();
  });

  it('should call clearMessage service', () => {
    service.clearMessage();
    expect(service.clearMessage).toBeTruthy();
  });

  it('should call getMessage service', () => {
    service.getMessage();
    expect(service.getMessage).toBeTruthy();
  });

});
