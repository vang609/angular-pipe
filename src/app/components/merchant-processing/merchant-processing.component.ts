import { AppShareDataService } from '../../shared/service/AppShareData.service';
import { Router } from '@angular/router';
import { MccFinderService } from './../../shared/components/mcc-finder/mcc-finder.service';
import { MccFinderComponent } from './../../shared/components/mcc-finder/mcc-finder.component';
import { Component, OnInit, ViewChild, AfterViewInit, Output, OnDestroy, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedataService } from './../../service/sharedata.service';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { MerchantProcessingService } from './merchant-processing.service';
import * as stepper from './../../shared/constant/stepper.constant';
import * as data from './merchant-processing.constant';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProcessingTypeOption, ProcessingProfile, FormSubmit } from './merchant-processing.model';
import { sourceType } from '../../shared/components/mcc-finder/mcc-finder.constant';

@Component({
  selector: 'app-merchant-processing',
  templateUrl: './merchant-processing.component.html',
  styleUrls: ['./merchant-processing.component.scss']
})
export class MerchantProcessingComponent implements OnInit, AfterViewInit, OnDestroy {

  value = 0;
  pinDebitValue = 0;
  autoCorrect = false;
  isActive = true;
  mccfindercontent: string;
  mccCodeContent: string;
  isLocation = true;
  isSelected = true;
  isTransactionsNo = null;
  isDial = true;
  totalEstimatedValue = '$ X,XXX.XX';
  mcciDialogOpened: boolean;
  closeMCCfinder: boolean;
  @ViewChild('mccFinder') mccFinder: MccFinderComponent;
  @ViewChild('cmm') cmm;
  formValid: boolean;
  formType = stepper.stepperSteps[1];
  merchantProcessingProfileForm: FormGroup;
  patchVal;
  B2C = 0.00;
  B2B = 0.00;
  step = 0.5;
  decimals = 2;
  format = 'n2';
  CardPresent = 0.00;
  CardNotPresent = 0.00;
  AverageTicket = 0.00;
  isLocSelected = true;
  dial = true;
  location: boolean;
  TransactionSource: boolean;
  communMethod: any;
  procType: any;
  procOption: any;
  frameRelay: boolean;
  frameOrInternet: boolean;
  datawire: boolean;
  lease: boolean;
  mccSrcData: Array<any>;
  mccSrcStr: string;
  mccSrcList: Array<string> = [];
  b2bVal: boolean;
  b2cVal: boolean;
  @ViewChild('mccSrc') public mccSrc: AutoCompleteComponent;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading$: Subscription;
  message$: Subscription;
  notificationMsg = '';
  showNotification = false;
  DBAmcci: Array<number>;
  public processingTypes = [];
  public processingOptions = [];

  communicationOption = ['Dial (A)', 'Frame Relay (C)', 'Frame/Internet (M)', 'Datawire (IPN)', 'Lease (M)'];
  isCommunicationError = false;

  communicationWithRules = !null;
  communicationWithoutRules = !null;

  americanExpress: boolean;
  AcceptAmericanExpress = null;
  volumePercentAmex = null;
  AmericanExpress = 0.0;
  VisaOrMasterCard = 0.0;
  isAnnualVisaMasterCardMSG = false;
  VolumePercentAmex = false;
  isConfirmVolume = false;
  typingTimer;
  annualVisaMasterCardTyped = 0.0;
  doneTypingInterval = 600;
  Discover = 0.0;
  discoverPorcentage = 3;
  PinDebitVolume = 0.0;
  pinDebitVolume = '';
  annualPinDebitTyped = 0.0;
  TotalAnnualVolume = 0.0;
  visaOrMasterCard = 0.0;
  averageTicketValue = 0.0;
  averageTicketTimes = 0;
  isAverageTicketValueMSG = false;
  isLocDisabled = false;
  showLocationMsg = false;
  isAmexAccepted = null;
  processingObject: ProcessingTypeOption;
  showLoader = false;
  dbaName = '';
  ecn = '';
  dbaLengthChck: boolean;
  disableTypeOption = true;
  showMCCDisablePopup = false;
  isMCCENoteditable = true;
  processingTypeDefaultItem;
  processingOptionDefaultItem;
  annualVisaFlag: boolean;

  constructor(private fb: FormBuilder,
    private router: Router,
    private sharedataService: SharedataService,
    private mccFinderService: MccFinderService,
    private merchantProcessingService: MerchantProcessingService,
    private appShareDataService: AppShareDataService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.mcciDialogOpened = this.dbaLengthChck = this.closeMCCfinder = this.formValid = this.annualVisaFlag = false;
    this.DBAmcci = data.mcciChckNum;
    this.processingTypeDefaultItem = { name: 'Select Processing Type', code: null };
    this.processingOptionDefaultItem = { name: 'Select Processing Option', code: null };
    // const basicMerchantFormData = this.sharedataService.getFormDataArray(this.formType.routeName);
    const basicMerchantFormData = this.sharedataService.getFormDataArray(stepper.stepperSteps[0].routeName);

    setTimeout(() => {
      if (basicMerchantFormData) {
        this.dbaName = basicMerchantFormData.send.dbaName;
        this.ecn = basicMerchantFormData.send.ecn;
      }
    }, 1000);

    this.merchantProcessingProfileForm = this.fb.group({
      B2C: [0.00, Validators.required],
      B2B: [0.00, Validators.required],
      mccCodeContent: ['', Validators.required],
      location: [this.isLocSelected],
      AverageTicket: ['', Validators.required],
      CardPresent: [0.00, Validators.required],
      CardNotPresent: [0.00, Validators.required],
      TransactionSource: [{ value: this.isTransactionsNo }, Validators.required],
      ProcessingType: ['', Validators.required],
      ProcessingOption: ['', Validators.required],
      numeric: [1],
      CommunicationMethod: [{ value: '' }, Validators.required],
      formType: this.formType,
      AcceptAmericanExpress: [this.AcceptAmericanExpress, [Validators.required]],
      AmericanExpress: ['', Validators.required],
      VisaOrMasterCard: ['', Validators.required],
      PinDebitVolume: ['', Validators.required],
      Discover: this.Discover,
      TotalAnnualVolume: this.TotalAnnualVolume,
      isConfirm: ['', [Validators.required]],
      VolumePercentAmex: this.volumePercentAmex
    });
    // this.merchantProcessingProfileForm.get('TransactionSource').patchValue(!this.isTransactionsNo);
    this.merchantProcessingProfileForm.get('location').patchValue(this.isLocSelected);
    this.onChanges();
    this.patchVal = this.sharedataService.getFormDataArray(this.formType.routeName);
    if (this.patchVal !== null) {
      this.disableTypeOption = this.communicationWithoutRules = null;
      this.patchVal.send.ProcessingProfiles[0].mccCodeContent = this.patchVal.mccCodeContent;
      this.patchVal.send.ProcessingProfiles[0].numeric = this.patchVal.numeric;
      this.patchVal.send.ProcessingProfiles[0].isConfirm = this.patchVal.isConfirm;
      this.patchVal.send.ProcessingProfiles[0].location = this.patchVal.location;
      console.log( this.AcceptAmericanExpress, ' ...10 this.AcceptAmericanExpress')
      this.patchVal.send.ProcessingProfiles[0].AcceptAmericanExpress = this.patchVal.AcceptAmericanExpress;
      console.log( this.AcceptAmericanExpress, ' ... 11 this.AcceptAmericanExpress')
      this.patchVal.send.ProcessingProfiles[0].VolumePercentAmex = this.patchVal.VolumePercentAmex;
      this.setFormValues(this.patchVal.send.ProcessingProfiles[0], this.patchVal.processingOptions, this.patchVal.processingTypes);
      this.isConfirmVolume = this.merchantProcessingProfileForm.get('isConfirm').value;
      if (this.merchantProcessingProfileForm.get('B2C').value > 0 || this.merchantProcessingProfileForm.get('B2B').value > 0) {
        this.isMCCENoteditable = false;
      }
    }

    this.merchantProcessingProfileForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.merchantProcessingProfileForm.valid !== this.formValid) {
          this.formValid = this.merchantProcessingProfileForm.valid;
          this.sharedataService.sendFormValid(this.merchantProcessingProfileForm);
        }
      });

    this.sharedataService.$saveFormData
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const sendObj = {
          send: this.createFormSaveObject(),
          formType: this.formType,
          numeric: this.merchantProcessingProfileForm.get('numeric').value,
          mccCodeContent: this.merchantProcessingProfileForm.get('mccCodeContent').value,
          isConfirm: this.merchantProcessingProfileForm.get('isConfirm').value,
          AcceptAmericanExpress: this.merchantProcessingProfileForm.get('AcceptAmericanExpress').value,
          location: this.merchantProcessingProfileForm.get('location').value,
          VolumePercentAmex: this.merchantProcessingProfileForm.get('VolumePercentAmex').value,
          processingTypes: this.processingTypes,
          processingOptions: this.processingOptions
        };
        this.sharedataService.setFormDataArray(sendObj);
      });

    this.appShareDataService.loadingSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.showLoader = value;
      });

    this.appShareDataService.messageMatrixSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        if (msg) {
          this.showNotification = true;
          this.notificationMsg = msg;
        }
      });

    // this.sharedataService.sendFormValid(this.merchantProcessingProfileForm);

    // this.sharedataService.formSubmitSubject
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((saveClicked) => {
    //     if (saveClicked) {
    //       const object = this.createFormSaveObject();
    //       this.merchantProcessingService.saveMerchantProcessing(object)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe((response) => {
    //           if (response) {
    //             this.sharedataService.formSuccessSubject.next(response.statusCode);
    //           }
    //         });
    //     }
    //   });
  }


  ngAfterViewInit() {
    if (this.el && this.el.nativeElement && this.el.nativeElement.parentElement) {
      this.el.nativeElement.parentElement.scrollTop = 0;
    }
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  onChanges() {
    this.typingTimer = setTimeout(() => {
      this.AcceptAmericanExpress = this.merchantProcessingProfileForm.get('AcceptAmericanExpress').value;
    }, this.doneTypingInterval);
    this.merchantProcessingProfileForm.get('TransactionSource').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(selective => {
        this.processingTypes = [];
        this.processingOptions = [];
        this.resetTypeOption();
      });
  }

  onValueChange(value: number, type: string): void {
    if (type === 'B2B') {
      this.merchantProcessingProfileForm.get('mccCodeContent').reset();
      this.merchantProcessingProfileForm.get('B2C').patchValue(100 - value);
      const b2bItem = Number(this.merchantProcessingProfileForm.get('B2B').value);
      if (b2bItem < 0) {
        this.merchantProcessingProfileForm.get('B2B').patchValue(0.00);
        this.merchantProcessingProfileForm.get('B2C').patchValue(0.00);
      }
      if (b2bItem > 100) {
        this.merchantProcessingProfileForm.get('B2B').patchValue(100.00);
        this.merchantProcessingProfileForm.get('B2C').patchValue(0.00);
      }
      if (b2bItem > 0) {
        this.isMCCENoteditable = false;
      }
    }
    if (type === 'B2C') {
      this.merchantProcessingProfileForm.get('mccCodeContent').reset();
      this.merchantProcessingProfileForm.get('B2B').patchValue(100 - value);
      const b2cItem = Number(this.merchantProcessingProfileForm.get('B2C').value);
      if (b2cItem < 0) {
        this.merchantProcessingProfileForm.get('B2C').patchValue(0.00);
        this.merchantProcessingProfileForm.get('B2B').patchValue(0.00);
      }
      if (b2cItem > 100) {
        this.merchantProcessingProfileForm.get('B2C').patchValue(100.00);
        this.merchantProcessingProfileForm.get('B2B').patchValue(0.00);
      }
      if (b2cItem > 0) {
        this.isMCCENoteditable = false;
      }
    }

    if (type === 'CardPresent') {
      this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(100 - value);
      const cpItem = Number(this.merchantProcessingProfileForm.get('CardPresent').value);
      if (cpItem < 0) {
        this.merchantProcessingProfileForm.get('CardPresent').patchValue(0.00);
        this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(0.00);
      }
      if (cpItem > 100) {
        this.merchantProcessingProfileForm.get('CardPresent').patchValue(100.00);
        this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(0.00);
      }
    }
    if (type === 'CardNotPresent') {
      this.merchantProcessingProfileForm.get('CardPresent').patchValue(100 - value);
      const cnpItem = Number(this.merchantProcessingProfileForm.get('CardNotPresent').value);
      if (cnpItem < 0) {
        this.merchantProcessingProfileForm.get('cardNoPresent').patchValue(0.00);
        this.merchantProcessingProfileForm.get('CardPresent').patchValue(0.00);
      }
      if (cnpItem > 100) {
        this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(100.00);
        this.merchantProcessingProfileForm.get('CardPresent').patchValue(0.00);
      }
    }

    this.resetTypeOption();
    this.setDisableTypeOption();
  }


  isLocationFunc(val: boolean): void {
    if (!val) {
      this.showLocationMsg = true;
    }
  }

  closeWarningForLocation() {
    this.showLocationMsg = false;
    this.merchantProcessingProfileForm.get('location').patchValue(true);
  }

  numOfLocation(val: boolean) {
    this.isLocation = val;
    this.isLocDisabled = false;
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
    this.mccSrcList = this.mccSrcData = [];
    if (val.length === 4) {
      let type;
      this.mccSrcStr = val;
      const b2bVal = this.merchantProcessingProfileForm.get('B2B').value;
      const b2cVal = this.merchantProcessingProfileForm.get('B2C').value;
      this.dbaLengthChck = false;
      if (b2bVal >= b2cVal) {
        type = sourceType.b2bCode;
      } else {
        type = sourceType.b2cCode;
      }
      this.mccFinderService.getMCCDataByCode(this.mccSrcStr, type)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          if (data && data.result) {
            const { mccCode, mccName, mccType, volumePercentAmex } = data.result[0];
            this.mccSrcData = data.result;
            this.mccSrcList.push(`${mccCode} - ${mccName} (${mccType})`);
            // this.mccSrcList.push(`${data.result[0].mccCode} - ${data.result[0].mccName} (${data.result[0].mccType})`);
            this.volumePercentAmex = volumePercentAmex;
            this.merchantProcessingProfileForm.get('VolumePercentAmex').patchValue(this.volumePercentAmex);
          }
        }
        );
    } else {
      this.dbaLengthChck = false;
      if (this.mccSrc) {
        this.mccSrc.toggle(false);
      }
    }
  }

  DBANameFix() {
    this.sharedataService.DBALen = 19;
    this.sharedataService.sendDbaError(false);
    this.sharedataService.setMccCode(this.merchantProcessingProfileForm.get('mccCodeContent').value);
  }

  mccValueChange(val) {
    if (this.DBAmcci.includes(Number(this.mccSrcStr)) && this.dbaName.length > 19) {
      this.dbaLengthChck = true;
    }
    this.setDisableTypeOption();
    // this.resetTypeOption();
    this.resetFormOnMccChange();
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

  averageTicketKeyup() {
    this.setDisableTypeOption();
    this.resetTypeOption();
  }

  omit_special_char(event) {
    const k = event.charCode;  // k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }

  openMcciBox(e): void {
    this.showMCCDisablePopup = true;
    if (!this.isMCCENoteditable) {
      this.b2cVal = this.merchantProcessingProfileForm.get('B2C').value;
      this.b2bVal = this.merchantProcessingProfileForm.get('B2B').value;
      this.mcciDialogOpened = true;
    }
    // this.closeMCCfinder = true;
  }

  closeMcciBox(): void {
    this.mccFinder.closePopup();
    this.closeMCCfinder = true;
  }

  popupSelectedMcc(e) {
    this.closeMCCfinder = this.mcciDialogOpened = false;
    this.merchantProcessingProfileForm.get('mccCodeContent').patchValue(`${e.mccCode} - ${e.mccName} (${e.mccType})`);
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
  createProcessingObject(): ProcessingTypeOption {
    const processingObject = {} as ProcessingTypeOption;
    const mccCode = String(this.merchantProcessingProfileForm.get('mccCodeContent').value);
    processingObject.B2B = this.merchantProcessingProfileForm.get('B2B').value;
    processingObject.B2C = this.merchantProcessingProfileForm.get('B2C').value;
    processingObject.MccCode = mccCode.substring(0, 4);
    processingObject.AverageTicket = this.merchantProcessingProfileForm.get('AverageTicket').value;
    processingObject.CardPresent = this.merchantProcessingProfileForm.get('CardPresent').value;
    processingObject.CardNotPresent = this.merchantProcessingProfileForm.get('CardNotPresent').value;
    processingObject.ProcessingType = this.merchantProcessingProfileForm.get('ProcessingType').value;
    processingObject.TransactionSource = this.merchantProcessingProfileForm.get('TransactionSource').value;
    return processingObject;
  }

  setFormValues(val, processingOptions?, processingTypes?) {
    if (val) {
      this.merchantProcessingProfileForm.get('B2C').patchValue(val.B2C);
      this.merchantProcessingProfileForm.get('B2B').patchValue(val.B2B);
      this.merchantProcessingProfileForm.get('mccCodeContent').patchValue(val.mccCodeContent);
      this.merchantProcessingProfileForm.get('location').patchValue(val.location);
      this.merchantProcessingProfileForm.get('AverageTicket').patchValue(val.AverageTicket);
      this.merchantProcessingProfileForm.get('CardPresent').patchValue(val.CardPresent);
      this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(val.CardNotPresent);
      this.merchantProcessingProfileForm.get('TransactionSource').patchValue(val.TransactionSource);
      this.merchantProcessingProfileForm.get('numeric').patchValue(val.numeric);
      this.merchantProcessingProfileForm.get('CommunicationMethod').patchValue(val.CommunicationMethod);
      this.merchantProcessingProfileForm.get('formType').patchValue(this.formType);
      this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(val.AcceptAmericanExpress);
      this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(val.AmericanExpress);
      this.merchantProcessingProfileForm.get('VisaOrMasterCard').patchValue(val.VisaOrMasterCard);
      this.merchantProcessingProfileForm.get('PinDebitVolume').patchValue(val.PinDebitVolume);
      this.merchantProcessingProfileForm.get('Discover').patchValue(val.Discover);
      this.merchantProcessingProfileForm.get('TotalAnnualVolume').patchValue(val.TotalAnnualVolume);
      this.merchantProcessingProfileForm.get('isConfirm').patchValue(val.isConfirm);
      this.merchantProcessingProfileForm.get('VolumePercentAmex').patchValue(val.VolumePercentAmex);
      if (processingOptions && processingOptions.length > 0) {
        this.processingOptions = processingOptions;
        this.merchantProcessingProfileForm.get('ProcessingOption').patchValue(val.ProcessingOption);
      }
      if (processingTypes && processingTypes.length > 0) {
        this.processingTypes = processingTypes;
        this.merchantProcessingProfileForm.get('ProcessingType').patchValue(val.ProcessingType);
      }
    }
  }

  fetchProcessingType() {
    const dataObj = this.createProcessingObject();
    dataObj.ProcessingType = ''; // set to blank, as everytime we have to fetch data for blank ProcessingType
    this.merchantProcessingService.fetchProcessingType(dataObj).
      subscribe((data) => {
        this.processingTypes = data.result.processingType;
      });
  }

  fetchProcessingOption() {
    this.merchantProcessingProfileForm.get('ProcessingOption').patchValue(null);
    this.processingOptions = [];
    const dataObj = this.createProcessingObject();
    this.merchantProcessingService.fetchProcessingOption(dataObj).
      subscribe((data) => {
        this.processingOptions = data.result.processingOptions;
      });
  }

  processingTypeChanged(object: any): void {
    this.merchantProcessingProfileForm.get('ProcessingType').patchValue(object.code);
    this.fetchProcessingOption();
    this.setCommunicationMethod(object.name);
  }

  processingOptionChanged(object: any): void {

  }

  setDisableTypeOption(): void {
    if ((this.merchantProcessingProfileForm.get('B2B').value
      + this.merchantProcessingProfileForm.get('B2C').value === 100)
      && this.merchantProcessingProfileForm.get('mccCodeContent').valid
      && (this.merchantProcessingProfileForm.get('AverageTicket').value > 0)
      && (this.merchantProcessingProfileForm.get('CardPresent').value
        + this.merchantProcessingProfileForm.get('CardNotPresent').value) === 100) {
      this.disableTypeOption = null;
    } else {
      this.disableTypeOption = true;
    }
  }

  resetTypeOption(): void {
    this.merchantProcessingProfileForm.get('ProcessingType').patchValue(null);
    this.merchantProcessingProfileForm.get('ProcessingOption').patchValue(null);
    this.merchantProcessingProfileForm.get('CommunicationMethod').patchValue('');
  }


  // ------ Processing Type and Option ------/


  // ------ Communication Method ------/

  setCommunicationMethod(name: string) {
    switch (name.toLowerCase()) {
      case 'mobile':
      case 'internet':
      case 'card present gateway':
      case 'payeezy card present':
      case 'payeezy moto':
      case 'payeezy internet': {
        this.merchantProcessingProfileForm.get('CommunicationMethod').patchValue(this.communicationOption[2]);
        this.communicationWithRules = null;
        this.communicationWithoutRules = !null;
        break;
      }
      default: {
        this.communicationWithRules = !null;
        this.communicationWithoutRules = null;
        this.merchantProcessingProfileForm.get('CommunicationMethod').patchValue(this.communicationOption[-1]);
        break;
      }
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


  //  ====== Average Ticket


  // ====== Annual Estimate =====

  changeAmericanExpressSelected(val: boolean) {
    this.AcceptAmericanExpress = val;
    if (this.AcceptAmericanExpress) {
      this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(true);
      const americanExpressEdit = this.merchantProcessingProfileForm.get('AmericanExpress').value ? this.merchantProcessingProfileForm.get('AmericanExpress').value : this.merchantProcessingProfileForm.get('AmericanExpress').patchValue('');
      this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(americanExpressEdit);
    } else {
      this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(false);
      if (this.merchantProcessingProfileForm.get('VisaOrMasterCard').value && this.isConfirmVolume && this.merchantProcessingProfileForm.get('PinDebitVolume').value) {
        this.calculateAmericanExpress();
        this.setVolumeValues();
        this.calculateAnnualEstimatedProcessingVolume();
      }
    }
  }

  calculateAmericanExpress() {
    this.visaOrMasterCard = Number(this.merchantProcessingProfileForm.get('VisaOrMasterCard').value);
    this.AmericanExpress = Number(this.visaOrMasterCard * this.volumePercentAmex);
    this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(this.AmericanExpress);
  }

  getControlLabel(type: string) {
    let valueControl = this.merchantProcessingProfileForm.get(type).value;
    if (!valueControl) {
      valueControl = 0.00;
    }
    return valueControl;
  }

  onClickConfirmEdit(event: boolean) {
    this.isConfirmVolume = event;
    if( !this.AcceptAmericanExpress ) {
      this.merchantProcessingProfileForm.get('AcceptAmericanExpress').setErrors({'incorrect': true});
    }
    if (this.isConfirmVolume && this.merchantProcessingProfileForm.get('VisaOrMasterCard').value && this.volumePercentAmex) {
      this.merchantProcessingProfileForm.get('isConfirm').patchValue(this.isConfirmVolume);
      this.calculateAnnualVisaOrMasterKeyup();
    } else {
      this.isConfirmVolume = this.annualVisaFlag = false;
      this.merchantProcessingProfileForm.get('isConfirm').patchValue('');
      this.resetFormOnEdit();
    }
  }

    validateInputOnKeydown(e: any) {
      if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 190 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 46 || (e.keyCode > 95 && e.keyCode < 106)) {
        return true;
      }
      return false;
    }

    setVolumeValues() {
      this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(this.AmericanExpress);
      this.merchantProcessingProfileForm.get('Discover').patchValue(this.Discover);
      this.merchantProcessingProfileForm.get('TotalAnnualVolume').patchValue(this.TotalAnnualVolume);
    }

    setVisaOrMasterVolume() {
      this.visaOrMasterCard = Number(this.merchantProcessingProfileForm.get('VisaOrMasterCard').value);
      this.averageTicketValue = Number(this.merchantProcessingProfileForm.get('AverageTicket').value);
    }

    calculateAnnualVisaOrMasterKeyup() {
      if (this.visaOrMasterCard > this.averageTicketValue) {
        this.isAnnualVisaMasterCardMSG = false;
        this.annualVisaFlag = true;
        this.Discover = Number((this.discoverPorcentage / 100) * this.visaOrMasterCard);
        this.AmericanExpress = !this.merchantProcessingProfileForm.get('AcceptAmericanExpress').value ? Number(this.visaOrMasterCard) * Number(this.volumePercentAmex) : this.merchantProcessingProfileForm.get('AmericanExpress').value;
        if (this.merchantProcessingProfileForm.get('PinDebitVolume').value) {
          this.calculateAnnualEstimatedProcessingVolume();
        } else {
          this.merchantProcessingProfileForm.get('PinDebitVolume').patchValue('');
        }

        this.pinDebitVolume = this.merchantProcessingProfileForm.get('PinDebitVolume').value;
        this.setVolumeValues();

      } else {
        this.cleanAnnualEstimatedProcessingVolume();
        if (!this.merchantProcessingProfileForm.controls.VisaOrMasterCard.invalid) {
          this.isAnnualVisaMasterCardMSG = true;
          this.isConfirmVolume = false;
        }
        this.annualVisaFlag = false;
      }
    }


    onClickAnnualAmexVolume() {
      const AmericanExpress = Number(this.merchantProcessingProfileForm.get('AmericanExpress').value);
      if (AmericanExpress === 0) {
        this.merchantProcessingProfileForm.get('AmericanExpress').patchValue('');
      }
    }

    calculateAnnualAmexVolumeKeyup() {
      this.AmericanExpress = this.merchantProcessingProfileForm.get('AmericanExpress').value;
      this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(this.AmericanExpress);
      this.calculateAnnualEstimatedProcessingVolume();
    }

    calculateAnnualEstimatedProcessingVolume() {
      this.TotalAnnualVolume = 0;
      const pinDebidVolume = this.merchantProcessingProfileForm.get('PinDebitVolume').value;
      if (this.visaOrMasterCard && this.isConfirmVolume && pinDebidVolume != null   ) {
        this.TotalAnnualVolume = Number(this.visaOrMasterCard) + Number(this.Discover) + Number(this.AmericanExpress) + Number(this.merchantProcessingProfileForm.get('PinDebitVolume').value);
        this.setVolumeValues();
      } else {
        this.TotalAnnualVolume = 0;
        this.merchantProcessingProfileForm.get('PinDebitVolume').patchValue('');
        this.merchantProcessingProfileForm.get('TotalAnnualVolume').patchValue('');
      }
    }

    cleanAnnualEstimatedProcessingVolume() {
      this.TotalAnnualVolume = 0.00;
      this.Discover = 0.00;
      this.AmericanExpress = 0.00;
    }

    createFormSaveObject(): any {
      // if (this.merchantProcessingProfileForm.get('AcceptAmericanExpress').value == 'Yes') {
      //   this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(true);
      // } else {
      //   this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(false);
      // }
      const formObject = {} as FormSubmit;
      const processingProfiles = {} as ProcessingProfile;

      const mccCode = String(this.merchantProcessingProfileForm.get('mccCodeContent').value);
      processingProfiles.PrimaryLocation = 'Y';
      processingProfiles.B2B = this.merchantProcessingProfileForm.get('B2B').value;
      processingProfiles.B2C = this.merchantProcessingProfileForm.get('B2C').value;
      processingProfiles.MccId = mccCode.substring(0, 4);
      processingProfiles.AverageTicket = this.merchantProcessingProfileForm.get('AverageTicket').value;
      processingProfiles.CardPresent = this.merchantProcessingProfileForm.get('CardPresent').value;
      processingProfiles.CardNotPresent = this.merchantProcessingProfileForm.get('CardNotPresent').value;
      processingProfiles.ProcessingType = this.merchantProcessingProfileForm.get('ProcessingType').value;
      processingProfiles.ProcessingOption = this.merchantProcessingProfileForm.get('ProcessingOption').value;
      processingProfiles.CommunicationMethod = this.merchantProcessingProfileForm.get('CommunicationMethod').value;
      processingProfiles.VisaOrMasterCard = this.merchantProcessingProfileForm.get('VisaOrMasterCard').value;
      processingProfiles.Discover = this.merchantProcessingProfileForm.get('Discover').value;
      processingProfiles.AmericanExpress = this.merchantProcessingProfileForm.get('AmericanExpress').value;
      processingProfiles.PinDebitVolume = this.merchantProcessingProfileForm.get('PinDebitVolume').value;
      processingProfiles.TotalAnnualVolume = this.merchantProcessingProfileForm.get('TotalAnnualVolume').value;
      processingProfiles.AcceptAmericanExpress = this.merchantProcessingProfileForm.get('AcceptAmericanExpress').value;
      processingProfiles.TransactionSource = this.merchantProcessingProfileForm.get('TransactionSource').value;

      formObject.DBANAME = this.dbaName;
      formObject.ECN = this.ecn;
      formObject.IsMultipleLocation = false;
      formObject.LocationCount = 1;
      formObject.ProcessingProfiles = [];
      formObject.ProcessingProfiles.push(processingProfiles);

      return formObject;
    }

    resetFormOnMccChange(): void {
      this.merchantProcessingProfileForm.get('AverageTicket').patchValue('');
      this.merchantProcessingProfileForm.get('CardPresent').patchValue(0.00);
      this.merchantProcessingProfileForm.get('CardNotPresent').patchValue(0.00);
      this.merchantProcessingProfileForm.get('ProcessingType').patchValue(null);
      this.merchantProcessingProfileForm.get('ProcessingOption').patchValue(null);
      this.merchantProcessingProfileForm.get('CommunicationMethod').patchValue(this.communicationOption[-1]);
      this.merchantProcessingProfileForm.get('VisaOrMasterCard').patchValue('');
      this.merchantProcessingProfileForm.get('Discover').patchValue(0.00);
      this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(0.00);
      this.merchantProcessingProfileForm.get('PinDebitVolume').patchValue('');
      this.merchantProcessingProfileForm.get('TotalAnnualVolume').patchValue(0.00);
      this.merchantProcessingProfileForm.get('AcceptAmericanExpress').patchValue(null);
      this.merchantProcessingProfileForm.get('TransactionSource').patchValue(null);
      this.resetFormErrorMsg();
    }

    resetFormErrorMsg() {
      setTimeout(() => {
        this.merchantProcessingProfileForm.get('AverageTicket').setErrors(null);
        this.merchantProcessingProfileForm.get('VisaOrMasterCard').setErrors(null);
        this.merchantProcessingProfileForm.get('PinDebitVolume').setErrors(null);
        this.merchantProcessingProfileForm.get('AcceptAmericanExpress').setErrors(null);
        this.isConfirmVolume = false;
      }, 0);
    }

    resetFormOnEdit() {
      setTimeout(() => {
        this.merchantProcessingProfileForm.get('Discover').patchValue(0.00);
        this.merchantProcessingProfileForm.get('TotalAnnualVolume').patchValue(0.00);
        if (this.AcceptAmericanExpress) {
          this.merchantProcessingProfileForm.get('AmericanExpress').patchValue('');
        } else {
          this.merchantProcessingProfileForm.get('AmericanExpress').patchValue(0.00);
        }
      }, 0);
    }

  }
