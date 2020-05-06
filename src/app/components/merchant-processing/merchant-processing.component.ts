import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit {

value = 0.00;
autoCorrect = false;
isActive = true;
mccfindercontent: string;
mccFinderContentStr: string;

public model = {
  comnmethod: 'one',
  location: 'locationY'
};


totalEstimatedValue = '$ X,XXX.XX';

public processingType: { text: string, value: number } = { text: 'Select Processing Type', value: null };

    public processingTypes: Array<{ text: string, value: number }> = [
        { text: 'Type_1', value: 1 },
        { text: 'Type_2', value: 2 },
        { text: 'Type_3', value: 3 }
    ];

public processingOption: { text: string, value: number } = { text: 'Select Processing Option', value: null };

    public processingOptions: Array<{ text: string, value: number }> = [
        { text: 'Option_1', value: 1 },
        { text: 'Option_2', value: 2 },
        { text: 'Option_3', value: 3 }
    ];



  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;

  constructor() { }

  ngOnInit(): void {
    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;
  }

  mccFinderCode($event){
    console.log('Search MCC Finder');
  }

  saveProcessing($event){
    this.mccFinderContentStr.trim();
    if ( this.mccFinderContentStr.length > 0) {
        this.isActive = false;
    }
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
