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

  it('call maskFocus function with ssn number is filled', () => {
    const e = {
      input: {
        nativeElement: {
          value: 'XXX-XX-1234'
        }
      }
    };
    component.maskFocus(e);
    expect(component.maskFocus).toBeTruthy();
  });

  it('call maskFocus function with ssn number is half filled', () => {
    const e = {
      input: {
        nativeElement: {
          value: 'XXX-XX-12__'
        }
      }
    };
    component.maskFocus(e);
    expect(component.maskFocus).toBeTruthy();
  });

  it('call disableArrow function if key is repeated', () => {
    const e = { repeat: true };
    component.disableArrow(e);
    expect(component.disableArrow).toBeTruthy();
  });

  it('call disableArrow function if key is not repeated with valid keyCode', () => {
    const e = { repeat: false, keyCode: 49 };
    component.disableArrow(e);
    expect(component.disableArrow).toBeTruthy();
  });

  it('call disableArrow function if key is not repeated with invalid keyCode', () => {
    const e = { repeat: false, keyCode: 40 };
    component.disableArrow(e);
    expect(component.disableArrow).toBeTruthy();
  });

  it('call numberOnly function when alphabets are entered', () => {
    component.numberOnly({ which: 114, keyCode: 114 });
    expect(component.numberOnly).toBeTruthy();
  });

  it('call switchSSNtoEIN function', () => {
    component.switchSSNtoEIN(false);
    expect(component.switchSSNtoEIN).toBeTruthy();
  });

  it('call fetchMerchantDetials Function', () => {
    component.fetchMerchantDetials('Test123');
    expect(component.fetchMerchantDetials).toBeTruthy();
  });

  it('call clearFormValues function', () => {
    component.clearFormValues();
    expect(component.clearFormValues).toBeTruthy();
  });

  it('call maskKeyUp function when ENTER is pressed', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 13
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function when BACKSPACE is pressed in SSN Textbox', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 8
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function when BACKSPACE is pressed in EIN Textbox', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 8
    };
    component.maskKeyUp(e, 'tin');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function for SSN', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 49
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function for EIN', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 49
    };
    component.maskKeyUp(e, 'tin');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function if invalid key pressed in SSN TextBox', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 40
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function if invalid key pressed in EIN TextBox', () => {
    const e = {
      target: {
        value: 'XXX-XX-12__'
      },
      keyCode: 40
    };
    component.maskKeyUp(e, 'tin');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function if value is greater than 10', () => {
    const e = {
      target: {
        value: 'XXX-XX-123456'
      },
      keyCode: 40
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function if SSN value is of length 9', () => {
    component.ssnVal = ['1', '1', '1', '1', '1', '1', '2', '3', '4'];
    const e = {
      target: {
        value: 'XXX-XX-1234'
      },
      keyCode: 49
    };
    component.maskKeyUp(e, 'ssn');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call maskKeyUp function if EIN value is of length 9', () => {
    component.tinVal = ['1', '1', '1', '1', '1', '1', '2', '3', '4'];
    const e = {
      target: {
        value: 'XXX-XX-1234'
      },
      keyCode: 49
    };
    component.maskKeyUp(e, 'tin');
    expect(component.maskKeyUp).toBeTruthy();
  });

  it('call closeDialogAction function', () => {
    component.closeDialogAction('ok');
    expect(component.closeDialogAction).toBeTruthy();
  });

});
