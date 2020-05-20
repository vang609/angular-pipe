import { MccFinderService } from './../../shared/components/mcc-finder/mcc-finder.service';
import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild, AfterViewInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedataService } from './../../service/sharedata.service';
import { EventEmitter, element } from 'protractor';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { MerchantProcessingService } from './merchant-processing.service';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit, AfterViewInit {

  value = 0;
  autoCorrect = false;
  isActive = true;
  mccfindercontent: string;
  mccCodeContent: string;
  isLocation = true;
  isSelected = true;
  isTransactionsYes = false;
  isDial = true;
  totalEstimatedValue = '$ X,XXX.XX';
  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;
  @ViewChild('cmm') cmm;

  merchantProcessingProfileForm: FormGroup;
  b2c = 0.00;
  b2b = 0.00;
  step = 0.5;
  cardPresent = 0.00;
  cardNotPresent = 0.00;
  averageTicket = 0.00;
  isLocSelected = true;
  dial = true;
  location: boolean;
  transactionsVal: boolean;
  communMethod: any;
  procType: any;
  procOption: any;
  frameRelay: boolean;
  frameOrInternet: boolean;
  datawire: boolean;
  lease: boolean;
  mccSrcData: Array<any>;
  mccSrcList: Array<string> = [];
  b2bVal: boolean;
  b2cVal: boolean;
  @ViewChild('mccSrc') public mccSrc: AutoCompleteComponent;

  // public processingType: { text: string, value: number } = { text: 'Select Processing Type', value: null };

  public processingTypes: Array<{ text: string, value: number }> = [];

  // public processingOption: { text: string, value: number } = { text: 'Select Processing Option', value: null };

  public processingOptions: Array<{ text: string, value: number }> = [
    { text: 'Option_1', value: 1 },
    { text: 'Option_2', value: 2 },
    { text: 'Option_3', value: 3 }
  ];

  communicationOption = ['A', 'C', 'M', 'IPN', 'L'];
  isCommunicationError = false;

  constructor(private fb: FormBuilder,
              private sharedataService: SharedataService,
              private mccFinderService: MccFinderService,
              private merchantProcessingService: MerchantProcessingService) { }


  ngOnInit(): void {
    this.mcciDialogOpened = false;
    this.closeMCCfinder = false;
    const basicMerchantFormData = this.sharedataService.getFormDataArray('basic-merchant-profile');
    setTimeout(() => {
      if (basicMerchantFormData) {
        alert('DBA ' + basicMerchantFormData.dbaName + '\nECN' + basicMerchantFormData.ecn);
      }
    }, 1000);
    this.merchantProcessingProfileForm = this.fb.group({
      b2c: [0.00],
      b2b: [0.00],
      mccCodeContent: ['', Validators.required],
      location: [this.isLocSelected],
      communsMethods: ['', Validators.required],
      averageTicket: [0.00],
      cardPresent: [0.00],
      cardNotPresent: [0.00],
      transactionsVal: [this.isTransactionsYes, Validators.required],
      processingType: ['', Validators.required],
      processingOption: ['', Validators.required],
      frameRelay: [''],
      frameOrInternet: [''],
      datawire: [''],
      lease: [''],
      numeric: [0],
      dialMethod: [this.communicationOption[0], Validators.required]
    });
    // this.merchantProcessingProfileForm.get('dialMethod').patchValue('one');
    // this.merchantProcessingProfileForm.valueChanges.subscribe(data => console.log('form changes', data));
    this.onChanges();

    this.merchantProcessingProfileForm.valueChanges.subscribe(data => {
      this.sharedataService.sendFormValid(this.merchantProcessingProfileForm);
    });
  }

  ngAfterViewInit() { }

  onChanges() {
    this.merchantProcessingProfileForm.get('transactionsVal').valueChanges
      .subscribe(selective => {
        if (selective === false) {
          this.merchantProcessingProfileForm.get('processingType').reset();
          this.merchantProcessingProfileForm.get('processingType').disable();
          this.merchantProcessingProfileForm.get('processingOption').reset();
          this.merchantProcessingProfileForm.get('processingOption').disable();
        } else {
          this.merchantProcessingProfileForm.get('processingType').enable();
          this.merchantProcessingProfileForm.get('processingOption').enable();
          this.merchantProcessingProfileForm.get('processingType').reset();
          this.merchantProcessingProfileForm.get('processingOption').reset();
        }
      });
    this.merchantProcessingProfileForm.controls.b2b.valueChanges
    .subscribe ((b2bItem: number) => {
        if ( b2bItem < 0 )  {
          this.merchantProcessingProfileForm.controls.b2b.patchValue(0.00);
          }
        if ( b2bItem > 100 ) {
            this.merchantProcessingProfileForm.controls.b2b.patchValue(0.00);
          }
        if ( b2bItem === 100 ) {
          this.merchantProcessingProfileForm.controls.b2c.patchValue(0.00);
        }
      });
    this.merchantProcessingProfileForm.controls.b2c.valueChanges
    .subscribe ((b2cItem: number) => {
        if ( b2cItem < 0 ) {
          this.merchantProcessingProfileForm.controls.b2c.patchValue(0.00);
          }
        if ( b2cItem > 100 ) {
            this.merchantProcessingProfileForm.controls.b2c.patchValue(0.00);
          }
        if ( b2cItem === 100 ) {
            this.merchantProcessingProfileForm.controls.b2b.patchValue(0.00);
          }
      });
  }

  onValueChange(value: number, type: string): void {
    if (type === 'b2b') {
      this.merchantProcessingProfileForm.get('b2c').patchValue(100 - value);
    }
    if (type === 'b2c') {
      this.merchantProcessingProfileForm.get('b2b').patchValue(100 - value);
    }
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

  mccFinderInput(val) {
    if (val.length === 4) {
      this.mccFinderService.getMCCDataByCode(val).subscribe(data => {
        this.mccSrcList = this.mccSrcData = [];
        if (data && data[0] && data[0].result) {
          this.mccSrcData = data;
          this.mccSrcList.push(data[0].result[0].mccName);
        }
      });
    } else {
      if (this.mccSrc) {
        this.mccSrc.toggle(false);
      }
    }
  }

  mccValueChange(val) {
    console.log(this.mccSrcData);
    console.log(this.mccSrcList);
  }

  mccSrcKeydown(e) {
    if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9 || (e.keyCode > 95 && e.keyCode < 106)) {
      if (e.keyCode === 8) {
        return true;
      }
      if (e.target.value.length > 3) {
        return false;
      }
      return true;
    }
    return false;
  }

  openMcciBox(e): void {
    e.focus();
    this.b2cVal = this.merchantProcessingProfileForm.get('b2c').value;
    this.b2bVal = this.merchantProcessingProfileForm.get('b2b').value;
    this.mcciDialogOpened = true;
    // this.closeMCCfinder = true;
  }

  closeMcciBox(): void {
    this.mccFinder.closePopup();
    this.closeMCCfinder = true;
  }

  popupSelectedMcc(e) {
    console.log(e);
    this.closeMCCfinder = this.mcciDialogOpened = false;
    this.merchantProcessingProfileForm.get('mccCodeContent').patchValue(e.mccName);
  }

  closeDialogAction(choice: string): void {
    if (choice === 'ok') {
      this.mcciDialogOpened = false;
      this.closeMCCfinder = false;
    } else {
      this.closeMCCfinder = false;
    }
  }

  submitMerchProc($event): void {
    console.log('Merchant Processing Form Submittd!');
    console.warn(this.merchantProcessingProfileForm.value);
  }

  // ------ Processing Type and Option ------/  
  fetchProcessingType() {
    this.merchantProcessingService.fetchProcessingType().
      subscribe((data) => {
        this.processingTypes = data;
      });
  }

  fetchProcessingOption() {
    this.merchantProcessingService.fetchProcessingOption().
      subscribe((data) => {
        this.processingOptions = data;
      });
  }

  processingTypeChanged(object: any): void {
    this.setCommunicationMethod(object.value);
  }

  processingOptionChanged(value: any): void {
    console.log(value);
  }

  // ------ Processing Type and Option ------/

  // ------ Communication Method ------/
  setCommunicationMethod(type: string) {
    switch (type) {
      case 'Card Present Gateway':
        this.merchantProcessingProfileForm.get('dialMethod').patchValue(this.communicationOption[2]);
        break;
      case 'Internet':
        this.merchantProcessingProfileForm.get('dialMethod').patchValue(this.communicationOption[2]);
        break;
      case 'Mobile':
        // this.merchantProcessingProfileForm.get('dialMethod').patchValue(this.communicationOption[2]);
        break;
      case 'Payeezy Card  Present':
      case 'Payeezy Moto':
      case 'Payeezy Internet':
        this.merchantProcessingProfileForm.get('dialMethod').patchValue(this.communicationOption[2]);
        break;
    }
  }

  communicationMethodChanged(value: string): void {
    // check if selected proessing type any of the defaultedand coomming value is 
    // not the defaulted throw error
  }

  showCommunicationError(): void {
    this.isCommunicationError = true;
  }

  closeCommunicationError(): void {
    this.isCommunicationError = false;
  }

  // ------ Communication Method ------/

}
