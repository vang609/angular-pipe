import { takeUntil } from 'rxjs/operators';
import { SaveFormService } from './../service/save-form/save-form.service';
import { SharedataService } from '../service/sharedata.service';
import * as stepper from '../shared/constant/stepper.constant';
import { OpportunityStepperComponent } from '../components/opportunity-stepper/opportunity-stepper.component';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss'],
  providers: [SharedataService]
})
export class OpportunityComponent implements OnInit, AfterContentChecked {
  currentStepperStep: any;
  lastStep: any;
  stepperConst;
  formValid: boolean;
  formData;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('stepperComponent') stepperComponent: OpportunityStepperComponent;
  constructor(private router: Router,
    private sharedataService: SharedataService,
    private changeDetectorRef: ChangeDetectorRef,
    private saveFormService: SaveFormService) { }

  ngOnInit() {
    this.formValid = false;
    this.stepperConst = stepper.stepperSteps;
    this.lastStep = stepper.stepperSteps[stepper.stepperSteps.length - 1];
    this.currentStepperStep = stepper.stepperSteps[0];
    this.sharedataService.$formValid.subscribe(data => {
      if (data) {
        this.formValid = data.valid;
        this.formData = data.value;
      }
    });

    this.sharedataService.$dbaLenError.subscribe((data: boolean) => {
      if (data === false) {
        this.btnNavigation(false);
      }
    });
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  selectedStep(step) {
    this.currentStepperStep = step;
  }

  // Next Previous Button Click
  nextPrev(next: boolean) { // If next step then pass true; If previous step then pass false;
    if (next) {
      this.stepperComponent.stepClick(this.stepperConst[this.currentStepperStep.name], this.currentStepperStep, next);
      this.formValid = false;
    } else {
      this.stepperComponent.stepClick(this.stepperConst[this.currentStepperStep.name - 2], this.currentStepperStep, next);
      this.formValid = true;
    }
  }

  btnNavigation(flag: boolean) {
    this.sharedataService.saveFData();
    this.nextPrev(flag);
  }

  saveContinue() {
    this.sharedataService.saveFData();
    const formData = this.sharedataService.getFormDataArray(this.currentStepperStep.routeName);
    this.saveFormService.saveForm(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success && success.statusCode && success.statusCode === 200 && !('validationRules' in success)) {
          if (this.currentStepperStep.name === this.lastStep.name) {
            console.log('Finished');
          } else {
            this.nextPrev(true);
          }
        } else {
          console.log('Validation Failed');
        }
      });
  }

}
