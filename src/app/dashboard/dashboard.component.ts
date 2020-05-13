import { StateService } from './../shared/service/state.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  steps: any = [];
  selectedStep;
  state = [];
  public contactVal: string = "9803371148";
  public zipVal: string = "28262";
  public contactMask: string = "(999) 000-00-00";
  public ZipMask: string = "00000";
  public mcciDialogOpened = false;

  ptitle = "Product Type";
  psubtitle = "Product Listing";
  pcount = 8;
  pprice = "$ XXX.XX";
  public isDisabled = true;
  
  constructor(private stateService: StateService) { }
  public defaultItem: { text: string, value: number } = { text: "All", value: null };

  public listItems: Array<{ text: string, value: number }> = [
    {text: "Clover Flex", value: 1},
    {text: "Clover Go", value: 2},
    {text: "Clover Mini", value: 3},
    {text: "Clover Station", value: 4},
    {text: "FD130", value: 5}
  ]; 

  ngOnInit() {
    this.selectedStep = 0;
    this.stateService.getState().subscribe(s => s.forEach(element => {
      this.state.push(element.name);
    }));
    this.steps = [
      { name: 0, head: 'Basic Merchant Profile', desc: 'Who is Merchant? Their Name & Address', formValid: false, activateStep: true },
      { name: 1, head: 'Processing Profile', desc: 'Information about Business type & Processing Type ', formValid: false, activateStep: true },
      { name: 2, head: 'Annual Volume', desc: 'Information regarding estimated annual Volume', formValid: false, activateStep: true },
      { name: 3, head: 'Account Features', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 4, head: 'Equipment', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 5, head: 'Pricing', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 6, head: 'Summary', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true },
      { name: 7, head: 'Proposal Document Page', desc: 'Lorem ipsum dolor sit amet, consectetur', formValid: false, activateStep: true }
    ];
  }

  stepClck(row) {
    this.selectedStep = row;
  }

  openMcciBox() {
    this.mcciDialogOpened = !this.mcciDialogOpened;
  }

  productlist(){
    alert('Search Product!');
  }
}
