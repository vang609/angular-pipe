import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProcessingComponent } from './merchant-processing.component';

describe('MerchantProcessingComponent', () => {
  let component: MerchantProcessingComponent;
  let fixture: ComponentFixture<MerchantProcessingComponent>;
  const mccFinder = jasmine.createSpyObj(MccFinderComponent, ['closePopup']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantProcessingComponent, MccFinderComponent ]
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

});
