import { SharedataService } from './../../service/sharedata.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpportunityStepperComponent } from './opportunity-stepper.component';
import * as stepData from '../../shared/constant/stepper.constant';

describe('OpportunityStepperComponent', () => {
  let component: OpportunityStepperComponent;
  let fixture: ComponentFixture<OpportunityStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [OpportunityStepperComponent],
      providers: [SharedataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityStepperComponent);
    component = fixture.componentInstance;
    component.mcciDialogOpened = false;
    component.selectedStep = this.currentStep.name;
    component.steps = stepData.stepperSteps;
    component.currentStep = [stepData.stepperSteps[0]];
    fixture.detectChanges();
  });

});
