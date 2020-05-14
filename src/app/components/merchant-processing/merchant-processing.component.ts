import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedataService } from './../../service/sharedata.service';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit {

  value = 0;
  autoCorrect = false;
  isActive = true;
  mccfindercontent: string;
  mccCodeContent: string;
  isLocation = true;
  isSelected = true;
  isTransactionsYes = true;
  isDial = true;
  totalEstimatedValue = '$ X,XXX.XX';
  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;

  merchantProcessingForm: FormGroup;
  b2c = 0.00;
  b2b = 0.00;
  cardPresent = 0.00;
  cardNotPresent = 0.00;
  averageTicket = 0.00;
  isLocSelected = true;
  location: boolean;
  transactionsVal: boolean;
  communMethod: any;
  procType: any;
  procOption: any;
  dial: boolean;
  frameRelay: boolean;
  frameOrInternet: boolean;
  datawire: boolean;
  lease: boolean;

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

  constructor(private fb: FormBuilder, private sharedataService: SharedataService) { }

  ngOnInit(): void {
    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;

    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;
    const basicMerchantFormData = this.sharedataService.getFormDataArray('basic-merchant-profile');
    setTimeout(() => {
      if (basicMerchantFormData) {
        alert('DBA ' + basicMerchantFormData.dbaName +  '\nCNN' + basicMerchantFormData.cnn);
      }
    }, 1000);

    this.merchantProcessingForm = this.fb.group({
      b2c: [0.00],
      b2b: [0.00],
      mccCodeContent: ['', Validators.required],
      location: [this.isLocSelected],
      communMethod: [this.isDial],
      averageTicket: [0.00],
      cardPresent: [0.00],
      cardNotPresent: [0.00],
      transactionsVal: [this.isTransactionsYes],
      procType: [''],
      procOption: [''],
      frameRelay: [''],
      frameOrInternet: [''],
      datawire: [''],
      lease:  ['']

    });
  }


  numOfLocation(val: boolean) {
    this.isLocation = val;
  }

  mccFinderCode($event): void {
    console.log('Search MCC Finder');
  }

  saveProcessing($event): void {
    this.mccCodeContent.trim();
    if (this.mccCodeContent.length > 0) {
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

  submitMerchProc($event): void{
    console.log('Merchant Processing Form Submittd!');
    console.warn(this.merchantProcessingForm.value);
  }
}





