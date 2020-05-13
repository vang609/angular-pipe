import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit {

  public value: number = 0;
  autoCorrect = false;
  isActive = true;
  mccfindercontent: string;
  mccFinderContentStr: string;
  isLocation = true;
  isSelected = true;
  totalEstimatedValue = '$ X,XXX.XX';
  processingProfileForm: FormGroup;
  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;

  public model = {
    comnmethod: 'one',
    location: 'first_loc'
  };

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;
  }

  numOfLocation(val: boolean) {
    this.isLocation = val;
  }

  mccFinderCode($event): void {
    console.log('Search MCC Finder');
  }

  saveProcessing($event): void {
    this.mccFinderContentStr.trim();
    if (this.mccFinderContentStr.length > 0) {
      this.isActive = false;
    }
  }

  openMcciBox(): void {
    this.mcciDialogOpened = true;
    // this.closeMCCfinder = true;
  }

  closeMcciBox(): void {
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
