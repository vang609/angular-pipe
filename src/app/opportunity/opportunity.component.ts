import { SharedataService } from '../service/sharedata.service';
import * as stepper from '../shared/constant/stepper.constant';
import { OpportunityStepperComponent } from '../components/opportunity-stepper/opportunity-stepper.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
  providers: [SharedataService]
})
export class OpportunityComponent implements OnInit {
  currentStepperStep: any;
  stepperConst;
  formValid: boolean;
  formData;
  @ViewChild('stepperComponent') stepperComponent: OpportunityStepperComponent;
  constructor(private router: Router,
              private sharedataService: SharedataService) { }

  ngOnInit() {
    this.formValid = false;
    this.stepperConst = stepper.stepperSteps;
    this.currentStepperStep = {
      name: 1
    };
    this.sharedataService.formValid.subscribe(data => {
      this.formValid = data.valid;
      this.formData = data.value;
    });
  }

  selectedStep(step) {
    this.currentStepperStep = step;
  }

  // Next Previous Button Click
  nextPrev(next: boolean) { // If next step then pass true; If previous step then pass false;
    if (next) {
      this.sharedataService.setFormDataArray(this.formData);
      this.stepperComponent.stepClick(this.stepperConst[this.currentStepperStep.name]);
      this.formValid = false;
    } else {
      this.stepperComponent.stepClick(this.stepperConst[this.currentStepperStep.name - 2]);
      this.formValid = true;
    }
    // this.stepperComponent.stepClick(this.stepperConst[next ? this.currentStepperStep.name : this.currentStepperStep.name - 2]);

  }

}
