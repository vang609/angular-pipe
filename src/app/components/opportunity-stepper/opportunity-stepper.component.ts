import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { StateService } from '../../shared/service/state.service';

@Component({
  selector: 'app-opportunity-stepper',
  templateUrl: './opportunity-stepper.component.html',
  styleUrls: ['./opportunity-stepper.component.scss']
})
export class OpportunityStepperComponent implements OnInit, OnChanges {

  @Input() currentStep: number;
  @Output() selectedStepNumber = new EventEmitter<string>();
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

  constructor(private stateService: StateService) { }
  public defaultItem: { text: string, value: number } = { text: 'All', value: null };

  public listItems: Array<{ text: string, value: number }> = [
    { text: 'Clover Flex', value: 1 },
    { text: 'Clover Go', value: 2 },
    { text: 'Clover Mini', value: 3 },
    { text: 'Clover Station', value: 4 },
    { text: 'FD130', value: 5 }
  ];

  ngOnChanges() {
    this.currentStep = 1;
  }

  ngOnInit() {
    this.contactVal = '9803371148';
    this.zipVal = '28262';
    this.contactMask = '(999) 000-00-00';
    this.ZipMask = '00000';
    this.mcciDialogOpened = false;
    this.selectedStep = this.currentStep;
    this.stateService.getState().subscribe(s => s.forEach(element => {
      this.state.push(element.name);
    }));
    this.steps = [
      { name: 1, head: 'Basic Merchant Profile', desc: 'Who is Merchant? Their Name & Address', formValid: false, activateStep: true },
      {
        name: 2, head: 'Processing Profile', desc: 'Information about business type & Processing Type ', formValid: false,
        activateStep: true
      },
      { name: 3, head: 'Annual Volume', desc: 'Information regarding estimated annual Volume', formValid: false, activateStep: true },
      { name: 4, head: 'Account Features', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 5, head: 'Equipment', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 6, head: 'Pricing', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 7, head: 'Summary', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 8, head: 'Proposal Document Page', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true }
    ];
  }

  stepClck(row) {
    this.selectedStep = row;
    this.selectedStepNumber.next(row);
  }

  openMcciBox() {
    this.mcciDialogOpened = !this.mcciDialogOpened;
  }

  productlist() {
    alert('Search Product!');
  }

}
