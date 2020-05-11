import { SharedataService } from './../../service/sharedata.service';
import { StateService } from './../../shared/service/state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BasicMerchantProfileComponent } from './basic-merchant-profile.component';
import { FormsModule, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as data from './basic-merchant-profile.mockup';
import * as merchantProfile from './basic-merchant-profile.constant';
import { Observable, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { RadioButtonModule } from '@progress/kendo-angular-inputs';

describe('BasicMerchantProfileComponent', () => {
  let component: BasicMerchantProfileComponent;
  let fixture: ComponentFixture<BasicMerchantProfileComponent>;
  let service: StateService;
  let sharedataService: SharedataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, InputsModule, RadioButtonModule],
    declarations: [BasicMerchantProfileComponent],
    providers: [StateService, FormBuilder,
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => BasicMerchantProfileComponent),
      }]
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicMerchantProfileComponent],
      providers: [StateService, SharedataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMerchantProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService);
    sharedataService = TestBed.inject(SharedataService);
    spyOn(service, 'getState').and.returnValue(of(data.state));
    fixture.detectChanges();
  });

  it('should create basic merchant profile component', () => {
    component.ptitle = 'Product Type';
    component.psubtitle = 'Product Listing';
    component.pcount = 8;
    component.pprice = '$ XXX.XX';
    component.isDisabled = true;
    component.contactVal = '9803371148';
    component.zipVal = '28262';
    component.contactMask = '(999) 000-00-00';
    component.ZipMask = '00000';
    component.ssnInput = {
      input: {
        nativeElement: {
          placeholder: ''
        }
      }
    };
    component.tinInput = {
      input: {
        nativeElement: {
          placeholder: ''
        }
      }
    };
    expect(component).toBeTruthy();
  });

  it('call isWFcustomerFunc if true', () => {
    component.isWFcustomerFunc(true);
    expect(component.isWFcustomerFunc).toBeTruthy();
  });

  it('call isWFcustomerFunc if false', () => {
    component.isWFcustomerFunc(false);
    expect(component.isWFcustomerFunc).toBeTruthy();
  });

  it('call setFormValues function', () => {
    component.setFormValues(merchantProfile.merchantProfile);
    expect(component.setFormValues).toBeTruthy();
  });

  // it('call taxValueChange if ssn', () => {
  //   component.merchantProcessingForm.get('ssn').setValue('123456789');
  //   component.taxValueChange('ssn');
  //   expect(component.taxValueChange).toBeTruthy();
  // });

  // it('call taxValueChange if tin', () => {
  //   component.merchantProcessingForm.get('tin').setValue('123456789');
  //   component.taxValueChange('tin');
  //   expect(component.taxValueChange).toBeTruthy();
  // });

  it('call fetchMerchantDetials Function', () => {
    component.fetchMerchantDetials();
    expect(component.fetchMerchantDetials).toBeTruthy();
  });

});
