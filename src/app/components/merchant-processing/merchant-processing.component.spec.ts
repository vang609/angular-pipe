import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { MerchantProcessingComponent } from './merchant-processing.component';
import { SharedataService } from './../../service/sharedata.service';

xdescribe('MerchantProcessingComponent', () => {
  let component: MerchantProcessingComponent;
  let fixture: ComponentFixture<MerchantProcessingComponent>;
  const mccFinder = jasmine.createSpyObj(MccFinderComponent, ['closePopup']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ MerchantProcessingComponent, MccFinderComponent ],
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
    fixture.detectChanges();
  });

  it('should create merchant processing component', () => {
    expect(component).toBeTruthy();
  });

  it('should call openMcciBox function', () => {
    component.mcciDialogOpened = true;
    component.openMcciBox();
    expect(component.openMcciBox).toBeTruthy();
  });

  it('should call closeMcciBox function', () => {
    component.mccFinder = mccFinder;
    component.closeMCCfinder = true;
    component.closeMcciBox();
    expect(mccFinder.closePopup).toHaveBeenCalled();
    expect(component.closeMcciBox).toBeTruthy();
  });

  it('should call closeDialogAction function when ok selected', () => {
    component.closeDialogAction('ok');
    expect(component.closeDialogAction).toBeTruthy();
  });

  it('should call closeDialogAction function when cancel selected', () => {
    component.closeDialogAction('cancel');
    expect(component.closeDialogAction).toBeTruthy();
  });

  it('should call mccFinderCode function', () => {
    component.mccFinderCode({});
    expect(component.mccFinderCode).toBeTruthy();
  });

  it('should call saveProcessing function', () => {
    component.MCCCodeContent = 'test';
    component.saveProcessing({});
    expect(component.saveProcessing).toBeTruthy();
  });

});
