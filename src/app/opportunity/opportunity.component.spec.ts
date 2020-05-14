import { element } from 'protractor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OpportunityStepperComponent } from './../components/opportunity-stepper/opportunity-stepper.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpportunityComponent } from './opportunity.component';
import * as stepper from './../shared/constant/stepper.constant';
import * as data from './opportunity.component.constant';
import { SharedataService } from '../service/sharedata.service';

describe('OpportunityComponent', () => {
  let component: OpportunityComponent;
  let fixture: ComponentFixture<OpportunityComponent>;
  let sharedataService: SharedataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [OpportunityComponent, OpportunityStepperComponent],
      providers: [SharedataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityComponent);
    component = fixture.componentInstance;
    component.currentStepperStep = { name: 1 };
    component.stepperConst = stepper.stepperSteps;
    sharedataService = TestBed.inject(SharedataService);
    // tslint:disable-next-line: no-shadowed-variable
    sharedataService.formValid.subscribe(element => {
      expect(element).toEqual(data.formData);
      component.formValid = data.formData.valid;
      component.formData = data.formData.value;
    });
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectedStep Function', () => {
    component.selectedStep(1);
    expect(component.selectedStep).toBeTruthy();
  });

  it('should call nextPrev Function', () => {
    component.formData = data.formData.value;
    component.nextPrev(true);
    expect(component.nextPrev).toBeTruthy();
  });

});
