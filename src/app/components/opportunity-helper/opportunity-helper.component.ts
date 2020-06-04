import { Component, OnInit } from '@angular/core';
import { SharedataService } from './../../service/sharedata.service';

@Component({
  selector: 'app-opportunity-helper',
  templateUrl: './opportunity-helper.component.html',
  styleUrls: ['./opportunity-helper.component.scss']
})
export class OpportunityHelperComponent implements OnInit {

  currentstep = 'Basic Merchant Profile';

  constructor( private sharedataService: SharedataService
              ) { }


  ngOnInit() {
    this.sharedataService.$activeStep.subscribe((row: any) => {
      this.currentstep = row.head;
    });
  }

}
