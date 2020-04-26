import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {
  currentStepperStep: number = 0;
  constructor() { }

  ngOnInit() {
  }

  selectedStep(step){
    this.currentStepperStep = step;
  }

}
