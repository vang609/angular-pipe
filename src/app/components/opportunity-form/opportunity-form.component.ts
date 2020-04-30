import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss']
})
export class OpportunityFormComponent implements OnInit, OnChanges {
  @Input() currentStep: number;
  constructor() { }

  ngOnChanges() { }

  ngOnInit() {
    this.currentStep = 1;
  }

}
