import { SharedataService } from './../../service/sharedata.service';
import * as stepper from './../../shared/constant/stepper.constant';
import { Stepper } from '../../shared/models/stepper.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { StateService } from '../../shared/service/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opportunity-stepper',
  templateUrl: './opportunity-stepper.component.html',
  styleUrls: ['./opportunity-stepper.component.scss']
})
export class OpportunityStepperComponent implements OnInit, OnChanges {

  @Input() currentStep: Stepper;
  @Output() selectedStepEvent = new EventEmitter();
  steps: any = [];
  selectedStep;
  state = [];
  public contactVal: string;
  public zipVal: string;
  public contactMask: string;
  public ZipMask: string;
  public mcciDialogOpened: boolean;

  ptitle = 'Product Type';
  psubtitle = 'Product Listing';
  pcount = 8;
  pprice = '$ XXX.XX';
  public isDisabled = true;

  public defaultItem: { text: string, value: number } = { text: 'All', value: null };

  public listItems: Array<{ text: string, value: number }> = [
    { text: 'Clover Flex', value: 1 },
    { text: 'Clover Go', value: 2 },
    { text: 'Clover Mini', value: 3 },
    { text: 'Clover Station', value: 4 },
    { text: 'FD130', value: 5 }
  ];

  constructor(private stateService: StateService,
    private router: Router,
    private sharedataService: SharedataService) { }

  ngOnChanges() {
    this.currentStep = this.steps.filter(i => i.activateStep);
  }

  ngOnInit() {
    this.contactVal = '9803371148';
    this.zipVal = '28262';
    this.contactMask = '(999) 000-00-00';
    this.ZipMask = '00000';
    this.mcciDialogOpened = false;
    this.selectedStep = this.currentStep.name;
    this.stateService.getState().subscribe(s => s.forEach(element => {
      this.state.push(element.name);
    }));
    this.steps = stepper.stepperSteps;
    this.sharedataService.formValid.subscribe(data => {
      this.steps.forEach(step => {
        if (step.name === data.value.formType.name) {
          step.formValid = data.valid;
        }
      });
    });
  }

  stepClick(row, next?: boolean): void {
    const prevStep = row.name - 1;
    this.steps.forEach(step => {
      if (step.name === row.name) {
        step.activateStep = true;
      } else {
        step.activateStep = false;
      }
      if(step.name === prevStep){
        step.completedForm = true;
      }
    });
    this.selectedStep = row.name;
    this.selectedStepEvent.next(row);
    this.router.navigate(['/opportunity', { outlets: { form: row.routeName } }], { skipLocationChange: true });
  }

  openMcciBox() {
    this.mcciDialogOpened = !this.mcciDialogOpened;
  }

  productlist() {
    alert('Search Product!');
  }

}
