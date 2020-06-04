import { initialState } from './../../root-store/reducers/loading.reducer';
import { SharedataService } from './../../service/sharedata.service';
import * as stepper from './../../shared/constant/stepper.constant';
import * as reponsive from '../../shared/constant/reponsive.constant';
import { Stepper } from '../../shared/models/stepper.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, HostListener } from '@angular/core';
import { StateService } from '../../shared/service/state.service';
import { Router } from '@angular/router';
import { MerchantProcessingService } from '../merchant-processing/merchant-processing.service';

@Component({
  selector: 'app-opportunity-stepper',
  templateUrl: './opportunity-stepper.component.html',
  styleUrls: ['./opportunity-stepper.component.scss']
})
export class OpportunityStepperComponent implements OnInit, OnChanges {

  @Input() currentStep: Array<Stepper>;
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
  horizontalProgress: boolean;

  public defaultItem: { text: string, value: number } = { text: 'All', value: null };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if (window.innerWidth >= reponsive.portraitWidth) {
      this.horizontalProgress = false;
    } else {
      this.horizontalProgress = true;
    }
  }

  // public listItems: Array<{ text: string, value: number }> = [
  //   { text: 'Clover Flex', value: 1 },
  //   { text: 'Clover Go', value: 2 },
  //   { text: 'Clover Mini', value: 3 },
  //   { text: 'Clover Station', value: 4 },
  //   { text: 'FD130', value: 5 }
  // ];

  constructor(private stateService: StateService,
    private router: Router,
    private sharedataService: SharedataService,
    private merchantProcessingService: MerchantProcessingService) {
    this.getScreenSize();
  }

  ngOnChanges() {
    this.currentStep = this.steps.filter(i => i.activateStep);
  }

  ngOnInit() {
    // this.contactVal = '9803371148';
    // this.zipVal = '28262';
    // this.contactMask = '(999) 000-00-00';
    // this.ZipMask = '00000';
    this.mcciDialogOpened = false;
    this.selectedStep = this.currentStep.length > 0 ? this.currentStep[0].name : '';
    this.stateService.getState().subscribe(s => s.forEach(element => {
      this.state.push(element.name);
    }));
    this.steps = stepper.stepperSteps;
    this.sharedataService.$formValid.subscribe(data => {
      if (data && data.value && data.value.formType && data.value.formType.name) {
        this.steps.forEach(step => {
          if (step && step.name && step.name === data.value.formType.name) {
            step.formValid = data.valid;
          }
        });
      }
    });
    this.sharedataService.$rStepper.subscribe(r => {
      this.steps.forEach(step => {
        step.initiated = step.completedForm = step.formValid = step.activateStep = false;
      });
      this.steps[0].initiated = this.steps[0].activateStep = true;
    });
  }

  stepClick(row, currentrow, next?: boolean): void {
    this.sharedataService.saveFData();
    this.steps.forEach(step => {
      if (step.name === row.name) {
        step.activateStep = true;
        step.initiated = true;
      } else {
        step.activateStep = false;
      }
      if (step.name === currentrow.name && next) {
        step.completedForm = true;
      }
      if (step.name === currentrow.name && !next) {
        step.initialState = true;
      }
    });
    // if ( currentrow.name === 2 ) {
    //   const  merchantProcessingProfileForm = this.sharedataService.getFormDataArray('merchant-processing');
    //   if (merchantProcessingProfileForm !== null) {
    //     console.log('....Save merchant-processing')
    //     // console.log(merchantProcessingProfileForm)
    //     // this.merchantProcessingProfileForm.setValue(val);
    //   }
    //   // this.merchantProcessingService.fetchSaveMerchantProcessing()
    // }
    this.selectedStep = row.name;
    this.selectedStepEvent.next(row);
    this.sharedataService.$activeStep.next(row);
    this.router.navigate(['/opportunity', { outlets: { form: row.routeName } }], { skipLocationChange: true });
    this.steps.forEach(e => {
      if (e.name === currentrow.name && !e.completedForm) {
        e.initialState = true;
        e.formValid = e.activateStep = false;
      }
    });
  }

  // openMcciBox() {
  //   this.mcciDialogOpened = !this.mcciDialogOpened;
  // }

  // productlist() {
  //   alert('Search Product!');
  // }

}
