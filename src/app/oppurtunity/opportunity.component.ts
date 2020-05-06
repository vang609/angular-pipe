import * as stepper from './../shared/constant/stepper.constant';
import { OpportunityStepperComponent } from './../components/opportunity-stepper/opportunity-stepper.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {
  currentStepperStep: any;
  stepperConst;
  @ViewChild('stepperComponent') stepperComponent: OpportunityStepperComponent;
  constructor(private router: Router) { }

  ngOnInit() {
    this.stepperConst = stepper.stepperSteps;
    this.currentStepperStep = {
      name: 1
    };
  }

  selectedStep(step) {
    this.currentStepperStep = step;
  }

  // Next Previous Button Click
  nextPrev(next: boolean) { // If next step then pass true; If previous step then pass false;
    this.stepperComponent.stepClick(this.stepperConst[next ? this.currentStepperStep.name : this.currentStepperStep.name - 2]);
  }

}
