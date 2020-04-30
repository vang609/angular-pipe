import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit {
  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;

  constructor() { }

  ngOnInit(): void {
    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;
  }

  openMcciBox() {
    this.mcciDialogOpened = true;
    // this.closeMCCfinder = true;
  }

  closeMcciBox() {
    this.mccFinder.closePopup();
    this.closeMCCfinder = true;
  }

  closeDialogAction(choice: string): void {
    if (choice === 'ok') {
      this.mcciDialogOpened = false;
      this.closeMCCfinder = false;
    } else {
      this.closeMCCfinder = false;
    }
  }

}
