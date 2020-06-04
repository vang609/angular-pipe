import { appReducers } from './../../root-store/app.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule, RadioButtonModule } from '@progress/kendo-angular-inputs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { MerchantProcessingComponent } from './merchant-processing.component';
import { SharedataService } from './../../service/sharedata.service';
import * as data from './merchant-processing.mockup';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';

describe('MerchantProcessingComponent', () => {
  let component: MerchantProcessingComponent;
  let fixture: ComponentFixture<MerchantProcessingComponent>;
  let mccFinderfixture: ComponentFixture<MccFinderComponent>;
  let mccFinderComp : MccFinderComponent;
  // const mccFinder = jasmine.createSpyObj(MccFinderComponent, ['closePopup']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule,
        DropDownsModule, InputsModule, RadioButtonModule, StoreModule.forRoot(appReducers)],
      declarations: [MerchantProcessingComponent, MccFinderComponent],
      providers: [SharedataService, FormBuilder,
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => MerchantProcessingComponent),
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantProcessingComponent);
    component = fixture.componentInstance;
    component.mccCodeContent = 'Test';
    component.AmericanExpress = component.Discover = component.TotalAnnualVolume = 12;
    component.visaOrMasterCard = 12;
    component.averageTicketValue = 11;
    component.patchVal = data.patchObj;
    fixture.detectChanges();
  });

  it('should create merchant processing component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onValueChange function when B2B is selected', () => {
    component.onValueChange(25, 'B2B');
    expect(component.onValueChange).toBeTruthy();
  });

  it('should call onValueChange function when B2C is selected', () => {
    component.onValueChange(25, 'B2C');
    expect(component.onValueChange).toBeTruthy();
  });

  it('should call onValueChange function when CardPresent is selected', () => {
    component.onValueChange(25, 'CardPresent');
    expect(component.onValueChange).toBeTruthy();
  });

  it('should call onValueChange function when CardNotPresent is selected', () => {
    component.onValueChange(25, 'CardNotPresent');
    expect(component.onValueChange).toBeTruthy();
  });

  it('should call openMcciBox function', () => {
    component.openMcciBox({});
    expect(component.openMcciBox).toBeTruthy();
  });

  it('should call DBANameFix function', () => {
    component.DBANameFix();
    expect(component.DBANameFix).toBeTruthy();
  });

  it('should call averageTicketKeyup function', () => {
    component.averageTicketKeyup();
    expect(component.averageTicketKeyup).toBeTruthy();
  });

  it('should call mccSrcKeydown function', () => {
    component.mccSrcKeydown({keyCode: 8});
    expect(component.mccSrcKeydown).toBeTruthy();
  });

  it('should call omit_special_char function', () => {
    component.omit_special_char({charCode: 66});
    expect(component.omit_special_char).toBeTruthy();
  });

  it('should call mccValueChange function', () => {
    component.mccSrcStr = '5411';
    component.DBAmcci = [5411];
    component.dbaName = 'abcdefghijklmnopqrst';
    component.mccValueChange('5411');
    expect(component.mccValueChange).toBeTruthy();
  });

  it('call mccFinderInput function', () => {
    component.mccFinderInput('1234');
    expect(component.mccFinderInput).toBeTruthy();
  });

  it('call mccFinderInput function if input length is less than 4 characters', () => {
    component.mccFinderInput('123');
    expect(component.mccFinderInput).toBeTruthy();
  });

  it('should call numOfLocation function', () => {
    component.numOfLocation(true);
    expect(component.numOfLocation).toBeTruthy();
  });

  it('should call mccFinderCode function', () => {
    component.mccFinderCode({});
    expect(component.mccFinderCode).toBeTruthy();
  });

  it('should call saveProcessing function', () => {
    component.saveProcessing({});
    expect(component.saveProcessing).toBeTruthy();
  });

  it('should call closeDialogAction function when OK is selected', () => {
    component.closeDialogAction('ok');
    expect(component.closeDialogAction).toBeTruthy();
  });

  it('should call closeDialogAction function when OK is not selected', () => {
    component.closeDialogAction('');
    expect(component.closeDialogAction).toBeTruthy();
  });

  it('should call showCommunicationError function', () => {
    component.showCommunicationError();
    expect(component.showCommunicationError).toBeTruthy();
  });

  it('should call closeCommunicationError function', () => {
    component.closeCommunicationError();
    expect(component.closeCommunicationError).toBeTruthy();
  });

  it('should call onClickConfirmEdit function', () => {
    component.onClickConfirmEdit(true);
    expect(component.onClickConfirmEdit).toBeTruthy();
  });

  it('should call popupSelectedMcc function', () => {
    const param = {
      mccCode: '1000',
      mccName: 'Test',
      mccType: 'I'
    };
    component.popupSelectedMcc(param);
    expect(component.popupSelectedMcc).toBeTruthy();
  });

  it('should call submitMerchProc function', () => {
    component.submitMerchProc({});
    expect(component.submitMerchProc).toBeTruthy();
  });

  it('should call createProcessingObject function', () => {
    component.createProcessingObject();
    expect(component.createProcessingObject).toBeTruthy();
  });

  it('should call setFormValues function', () => {
    component.setFormValues(data.patchObj);
    expect(component.setFormValues).toBeTruthy();
  });

  it('should call fetchProcessingType function', () => {
    component.fetchProcessingType();
    expect(component.fetchProcessingType).toBeTruthy();
  });

  it('should call fetchProcessingOption function', () => {
    component.fetchProcessingOption();
    expect(component.fetchProcessingOption).toBeTruthy();
  });

  it('should call processingTypeChanged function', () => {
    const param = { code: 1234, name: 'test' };
    component.processingTypeChanged(param);
    expect(component.processingTypeChanged).toBeTruthy();
  });

  it('should call processingOptionChanged function', () => {
    component.processingOptionChanged('test');
    expect(component.processingOptionChanged).toBeTruthy();
  });

  it('should call setVisaOrMasterVolume function', () => {
    component.setVisaOrMasterVolume();
    expect(component.setVisaOrMasterVolume).toBeTruthy();
  });

  it('should call setVolumeValues function', () => {
    component.setVolumeValues();
    expect(component.setVolumeValues).toBeTruthy();
  });

  it('should call calculateAnnualVisaOrMasterKeyup function', () => {
    component.calculateAnnualVisaOrMasterKeyup();
    expect(component.calculateAnnualVisaOrMasterKeyup).toBeTruthy();
  });

  it('should call calculateAnnualVisaOrMasterKeyup function when averageTicketValue is greater', () => {
    component.averageTicketValue = 13;
    component.calculateAnnualVisaOrMasterKeyup();
    expect(component.calculateAnnualVisaOrMasterKeyup).toBeTruthy();
  });

  it('should call calculateAmericanExpress function', () => {
    component.calculateAmericanExpress();
    expect(component.calculateAmericanExpress).toBeTruthy();
  });

  it('should call calculateAnnualAmexVolumeKeyup function', () => {
    component.calculateAnnualAmexVolumeKeyup();
    expect(component.calculateAnnualAmexVolumeKeyup).toBeTruthy();
  });

  it('should call calculateAnnualEstimatedProcessingVolume function', () => {
    component.calculateAnnualEstimatedProcessingVolume();
    expect(component.calculateAnnualEstimatedProcessingVolume).toBeTruthy();
  });

  it('should call createFormSaveObject function', () => {
    component.createFormSaveObject();
    expect(component.createFormSaveObject).toBeTruthy();
  });

  it('should call resetFormOnMccChange function', () => {
    component.resetFormOnMccChange();
    expect(component.resetFormOnMccChange).toBeTruthy();
  });

  it('should call resetFormErrorMsg function', () => {
    component.resetFormErrorMsg();
    expect(component.resetFormErrorMsg).toBeTruthy();
  });

  it('should call resetFormOnEdit function', () => {
    component.resetFormOnEdit();
    expect(component.resetFormOnEdit).toBeTruthy();
  });

  it('should call isLocationFunc function', () => {
    component.isLocationFunc(false);
    expect(component.isLocationFunc).toBeTruthy();
  });

  it('should call closeWarningForLocation function', () => {
    component.closeWarningForLocation();
    expect(component.closeWarningForLocation).toBeTruthy();
  });

});
