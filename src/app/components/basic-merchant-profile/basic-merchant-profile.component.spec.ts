import { StateService } from './../../shared/service/state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BasicMerchantProfileComponent } from './basic-merchant-profile.component';
import * as data from './basic-merchant-profile.mockup';
import { Observable, of} from 'rxjs';

describe('BasicMerchantProfileComponent', () => {
  let component: BasicMerchantProfileComponent;
  let fixture: ComponentFixture<BasicMerchantProfileComponent>;
  let service: StateService;
  let state;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [BasicMerchantProfileComponent],
    providers: [StateService]
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicMerchantProfileComponent ],
      providers: [StateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMerchantProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    spyOn(service, 'getState').and.returnValue(of(data.state));
    fixture.detectChanges();
  });

  it('should create basic merchant profile component', () => {
    expect(component).toBeTruthy();
  });

});
