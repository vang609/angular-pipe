import { BasicMerchantProfileComponent } from './basic-merchant-profile.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicMerchantProfileService } from './basic-merchant-profile.service';
import { HttpClientModule } from '@angular/common/http';

describe('BasicMerchantProfileService', () => {
  let service: BasicMerchantProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ BasicMerchantProfileComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicMerchantProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
