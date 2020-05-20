import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StateService } from './state.service';

let service: StateService;

describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [StateService]
  }));

  beforeEach(() => {
    service = TestBed.inject(StateService);
  });

  it('should create state servie', () => {
    expect(service).toBeTruthy();
  });

  it('should call sendMessage Function', () => {
    service.getState();
  });

});
