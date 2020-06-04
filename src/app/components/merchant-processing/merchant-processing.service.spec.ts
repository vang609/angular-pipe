import { MerchantProcessingService } from './merchant-processing.service';
import { MerchantProcessingComponent } from './merchant-processing.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import * as data from './merchant-processing.mockup';

describe('BasicMerchantProfileService', () => {
  let service: MerchantProcessingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ MerchantProcessingComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchProcessingType', () => {
    service.fetchProcessingType(data.sendObj);
    expect(service.fetchProcessingType).toBeTruthy();
  });

  it('should call fetchProcessingOption', () => {
    service.fetchProcessingOption(data.sendObj);
    expect(service.fetchProcessingOption).toBeTruthy();
  });

  it('should call saveMerchantProcessing', () => {
    service.saveMerchantProcessing(data.sendObj);
    expect(service.saveMerchantProcessing).toBeTruthy();
  });

});
