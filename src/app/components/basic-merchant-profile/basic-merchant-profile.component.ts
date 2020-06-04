import { takeUntil } from 'rxjs/operators';
import { SharedataService } from './../../service/sharedata.service';
import { StateService } from './../../shared/service/state.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterContentChecked, ChangeDetectorRef, AfterViewInit, ElementRef } from '@angular/core';
import { BasicMerchantProfileService } from './basic-merchant-profile.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as stepper from './../../shared/constant/stepper.constant';
import * as data from './basic-merchant-profile.constant';
import { AppShareDataService } from '../../shared/service/AppShareData.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-basic-merchant-profile',
  templateUrl: './basic-merchant-profile.component.html',
  styleUrls: ['./basic-merchant-profile.component.scss'],
})
export class BasicMerchantProfileComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
  state = [];
  public contactVal: string;
  public zipVal: string;
  public contactMask: string;
  public ZipMask: string;
  public mcciDialogOpened = false;
  ssnCode = data.ssnCode;
  einCode = data.einCode;
  formType = stepper.stepperSteps[0];
  patchVal;
  formValid: boolean;
  ptitle: string;
  psubtitle: string;
  pcount: number;
  pprice: string;
  dbaNameMaxLen: number;
  public isDisabled = true;
  isWFcustomer = true;
  @ViewChild('ssnInput') ssnInput;
  @ViewChild('einInput') einInput;
  merchantProcessingForm: FormGroup;
  ssnVal = [];
  einVal = [];
  ssnValidators = [Validators.required, Validators.minLength(11), Validators.maxLength(11)];
  einValidators = [Validators.required, Validators.minLength(10), Validators.maxLength(10)];
  superMarketFlag: boolean;
  dbaNameLenFlag: boolean;
  showInvalidSSNmessage = false;
  showInvalidEINmessage = false;
  showLenSSNmessage = false;
  showLenEINmessage = false;
  showLoader = false;
  isShowTaxIDDialog = false;
  notificationMsg: string;
  message$: Subscription;
  loading$: Subscription;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showNonWellsFargoMsg = false;
  mccCode = '';
  showDBA5411 = false;

  constructor(private stateService: StateService,
    private sharedataService: SharedataService,
    private fb: FormBuilder,
    private basicMerchantProfileService: BasicMerchantProfileService,
    private appShareDataService: AppShareDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.ptitle = 'Product Type';
    this.psubtitle = 'Product Listing';
    this.pcount = 8;
    this.pprice = '$ XXX.XX';
    this.isDisabled = true;
    this.contactVal = '9803371148';
    this.zipVal = '28262';
    this.contactMask = '(999) 000-00-00';
    this.ZipMask = '00000';
    this.dbaNameMaxLen = 24; // this.sharedataService.DBALen ? this.sharedataService.DBALen : data.DBAMaxLen;
    this.superMarketFlag = this.dbaNameLenFlag = false;
    this.formValid = false;
    // this.getState();

    this.merchantProcessingForm = this.fb.group({
      wellsCustomer: [this.isWFcustomer],
      ssnOrein: [this.ssnCode, Validators.required],
      ssn: ['', this.ssnValidators],
      ein: ['', this.einValidators],
      name: ['', Validators.required],
      mobilePhone: [{ value: '', disabled: false }],
      businessPhone: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: [{ value: '', disabled: false }, Validators.required],
      zipcode: [{ value: '', disabled: false }, Validators.required
      ],
      city: [{ value: '', disabled: false }, Validators.required],
      state: [{ value: '', disabled: false }, Validators.required],
      dbaName: ['', [Validators.required,
      Validators.pattern('^[ a-zA-Z0-9-_!@&*)(+=|/<>?,:;."\\\']+$'),
      this.maxLengthWithoutMCC.bind(this),
      this.maxLengthWithMCC.bind(this)]],
      ecn: [''],
      formType: this.formType
    });
    this.formControlValueChanged();
    this.patchVal = this.sharedataService.getFormDataArray(this.formType.routeName);
    if (this.patchVal !== null) {
      this.ssnVal = this.patchVal.ssnBackup;
      this.einVal = this.patchVal.einBackup;
      this.mccCode = this.sharedataService.getMccCode();
      this.mccCode = this.mccCode && this.mccCode.substring(0, 4);
      this.setFormValues([this.patchVal]);
    }
    this.loading$ = this.appShareDataService.loadingSubject.subscribe((value) => {
      this.showLoader = value;
    });
    this.message$ = this.appShareDataService.messageMatrixSubject.subscribe((msg) => {
      if (msg) {
        this.isShowTaxIDDialog = true;
        this.notificationMsg = msg;
      } else {
        this.isShowTaxIDDialog = false;
        this.notificationMsg = '';
      }
    });

    this.merchantProcessingForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.merchantProcessingForm.valid !== this.formValid) {
          this.formValid = this.merchantProcessingForm.valid;
          this.sharedataService.sendFormValid(this.merchantProcessingForm);
        }
      });

    this.sharedataService.$saveFormData
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const sendObj = {
          send: this.merchantProcessingForm.value,
          formType: this.formType,
          ssnBackup: this.ssnVal,
          einBackup: this.einVal
        };
        this.sharedataService.setFormDataArray(sendObj);
      });

    this.sharedataService.sendFormValid(this.merchantProcessingForm);
  }

  ngAfterViewInit() {
    if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
    if (this.einInput) { this.einInput.input.nativeElement.placeholder = 'Please enter EIN Number'; }
    if (this.el && this.el.nativeElement && this.el.nativeElement.parentElement && this.merchantProcessingForm.get('dbaName').hasError('lengthWitMCC')) {
      this.el.nativeElement.parentElement.scrollTop = 800;
    }
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.mccCode = '';
    this.destroy$.unsubscribe();
    this.loading$.unsubscribe();
    this.message$.unsubscribe();
  }

  getState(): void {
    this.stateService.getState().subscribe(s =>
      s.forEach(element => {
        this.state.push(element.name);
      })
    );
  }

  resetForms(val: boolean, type: string) {
    if (this.merchantProcessingForm.get('ssnOrein').value !== type) {
      this.sharedataService.resetStepper();
      this.switchSSNtoEIN(val);
    }
  }

  maskFocus(e) {
    const cursorPos = e.input.nativeElement.value.indexOf('_');
    if (cursorPos === -1) {
      e.input.nativeElement.selectionStart = e.input.nativeElement.selectionEnd = e.input.nativeElement.value.length;
    } else {
      e.input.nativeElement.selectionStart = e.input.nativeElement.selectionEnd = cursorPos;
    }
  }

  disableArrow(e, type) {
    if (e.repeat) {
      return false;
    } else {
      if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9 || (e.keyCode > 95 && e.keyCode < 106)) {
        if (e.keyCode === 9) {
          if (type === this.ssnCode && this.ssnVal.length !== 9) {
            this.showSSNEINmsg(false, true, false, false);
            setTimeout(() => {
              this.showLenSSNmessage = false;
            }, 3000);
            return false;
          }
          if (type === this.einCode && this.einVal.length !== 9) {
            this.showSSNEINmsg(false, false, false, true);
            setTimeout(() => {
              this.showLenEINmessage = false;
            }, 3000);
            return false;
          }
          return true;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  maskKeyUp(e, type) {
    let numVal;
    const val = e.target.value;
    let numStr;
    let callTxtLen: number;
    let serviceCall: boolean;
    if (e.keyCode === 13) {
      return;
    }
    let uVal = val.replace(/_/gi, '');
    uVal = uVal.replace(/-/gi, '');
    if (uVal.length < 10) {
      if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9 || (e.keyCode > 95 && e.keyCode < 106)) {
        if (e.keyCode > 47 && e.keyCode < 58 || (e.keyCode > 95 && e.keyCode < 106)) {
          const splitchar = val.split('-');
          if (type === this.ssnCode) {
            callTxtLen = 11;
            this.showInvalidSSNmessage = false;
            if (this.ssnVal.length < 9) {
              this.ssnVal.push(e.key);
              serviceCall = true;
            } else {
              serviceCall = false;
            }
            const rVal = `${splitchar[0].replace(/[0-9]/gi, 'X')}-${splitchar[1].replace(/[0-9]/gi, 'X')}-${splitchar[2]}`;
            let cursorPos = val.replace(/_/gi, '');
            cursorPos = cursorPos.replace(/-/gi, '');
            this.merchantProcessingForm.get('ssn').patchValue(rVal);
            e.target.selectionStart = e.target.selectionEnd = cursorPos.length > 5 ? cursorPos.length + 2 : (cursorPos.length > 3 ? cursorPos.length + 1 : cursorPos.length);
            numStr = this.ssnVal.toString().replace(/,/gi, '');
            if (numStr.substring(5, 9)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}-${numStr.substring(5, 9)}`;
            } else if (numStr.substring(3, 5)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}`;
            } else {
              numVal = `${numStr.substring(0, 3)}`;
            }
          }
          if (type === this.einCode) {
            callTxtLen = 10;
            this.showInvalidEINmessage = false;
            if (this.einVal.length < 9) {
              this.einVal.push(e.key);
              serviceCall = true;
            } else {
              serviceCall = false;
            }
            const secArray = splitchar[1].substring(0, 3);
            const thirdArray = splitchar[1].substring(3, 7);
            splitchar.splice(1, 1);
            splitchar.push(secArray);
            splitchar.push(thirdArray);
            const rVal = `${splitchar[0].replace(/[0-9]/gi, 'X')}-${splitchar[1].replace(/[0-9]/gi, 'X')}${splitchar[2]}`;
            let cursorPos = val.replace(/_/gi, '');
            cursorPos = cursorPos.replace(/-/gi, '');
            this.merchantProcessingForm.get('ein').patchValue(rVal);
            e.target.selectionStart = e.target.selectionEnd = cursorPos.length > 2 ? cursorPos.length + 1 : cursorPos.length;
            numStr = this.einVal.toString().replace(/,/gi, '');
            if (numStr.substring(5, 9)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}${numStr.substring(5, 9)}`;
            } else if (numStr.substring(3, 5)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}`;
            } else {
              numVal = `${numStr.substring(0, 3)}`;
            }
          }
          if (numVal.length === callTxtLen && serviceCall) {
            const finalVal = numVal.replace(/-/gi, '');
            if (type === this.ssnCode) {
              this.merchantProcessingForm.get('ein').patchValue('qqqqqqqqqq');
              //   console.log('SSN: ' + finalVal);
              // Call EIN Service here
              this.fetchMerchantDetails(this.ssnCode);
              // this.fetchBasicMerchantDetails('SSN', finalVal, 'individual');
            }
            if (type === this.einCode) {
              this.merchantProcessingForm.get('ssn').patchValue('qqqqqqqqqqq');
              //   console.log('EIN: ' + finalVal);
              // Call EIN Service here
              this.fetchMerchantDetails(this.einCode);
              // this.fetchBasicMerchantDetails('TIN', finalVal, 'non-individual');
            }
          }
        }
        if (e.keyCode === 8) {
          let inputVal = e.target.value.replace(/_/gi, '');
          inputVal = inputVal.replace(/-/gi, '');
          if (type === this.ssnCode) {
            this.ssnVal = this.ssnVal.slice(0, inputVal.length);
            const ssn = this.merchantProcessingForm.get('ssn').value.trim();
            this.merchantProcessingForm.get('ssn').patchValue(ssn);
            if (this.ssnVal.length === 0) {
              this.clearFormValues();
            }
          }
          if (type === this.einCode) {
            this.einVal = this.einVal.slice(0, inputVal.length);
            const ein = this.merchantProcessingForm.get('ein').value.trim();
            this.merchantProcessingForm.get('ein').patchValue(ein);
            if (this.einVal.length === 0) {
              this.clearFormValues();
            }
          }
        }
      } else {
        if (type === this.ssnCode && uVal.length < 9) {
          this.showSSNEINmsg(true, false, false, false);
          setTimeout(() => {
            this.showInvalidSSNmessage = false;
          }, 3000);
        }
        if (type === this.einCode && uVal.length < 9) {
          this.showSSNEINmsg(false, false, true, false);
          setTimeout(() => {
            this.showInvalidEINmessage = false;
          }, 3000);
        }
        return false;
      }
    } else {
      return false;
    }
  }

  showSSNEINmsg(ssnValid, ssnLen, einValid, einLen) {
    this.showInvalidSSNmessage = ssnValid;
    this.showLenSSNmessage = ssnLen;
    this.showInvalidEINmessage = einValid;
    this.showLenEINmessage = einLen;
  }

  // taxValueChange(type: string): void {
  //   if (type === this.ssnCode) {
  //     if (this.merchantProcessingForm.get('ssn').value.length > 0) {
  //       this.merchantProcessingForm.get('ein').disable();
  //     } else {
  //       this.merchantProcessingForm.get('ein').enable();
  //     }
  //   } else {
  //     if (this.merchantProcessingForm.get('ein').value.length > 0) {
  //       this.merchantProcessingForm.get('ssn').disable();
  //     } else {
  //       this.merchantProcessingForm.get('ssn').enable();
  //     }
  //   }
  // }

  isWFcustomerFunc(val: boolean): void {
    // this.isWFcustomer = val;
    // console.log('val: ', val)
    if (!val) {
      this.showNonWellsFargoMsg = true;
    }
    // this.fetchMerchantDetails();

    setTimeout(() => {
      if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
      if (this.einInput) { this.einInput.input.nativeElement.placeholder = 'Please enter EIN Number'; }
    });
  }

  fetchMerchantDetails(enteredTaxId: string): void {
    // if ((this.merchantProcessingForm.get('ssn').value &&
    //   this.merchantProcessingForm.get('ssn').value.length === 11)
    //   || (this.merchantProcessingForm.get('ein') &&
    //     this.merchantProcessingForm.get('ein').value.length === 11)) {

    // if (this.merchantProcessingForm.get('ssn').enabled ||
    //   this.merchantProcessingForm.get('ein').enabled) {
    // const enteredTaxId = this.merchantProcessingForm.get('ssn').value
    //   || this.merchantProcessingForm.get('ein').value;
    // const attributeTaxId = this.merchantProcessingForm.get('ssn').value ? this.ssnCode : this.einCode;
    // const entityType = this.merchantProcessingForm.get('ssn').value ? 'individual' : 'non-individual';
    this.basicMerchantProfileService.fetchMerchantDetails(enteredTaxId) // Testing for checking with JSON
      .subscribe((merchantDetails: any) => {
        this.clearFormValues();
        this.setFormValues(merchantDetails); // Commented for Sprint 2
        // TEST OBJECT
      });
    // }
    // }
  }

  fetchBasicMerchantDetails(attributeTaxId: string, enteredTaxId: string, entityType: string): void {
    this.basicMerchantProfileService.fetchBasicMerchantDetails(this.createBasicMerchantRequestObject(attributeTaxId, enteredTaxId), entityType)
      .subscribe((merchantDetails: any) => {
        this.clearFormValues();
        this.setFormValues(merchantDetails);
      });
  }

  createBasicMerchantRequestObject(attributeTaxId: string, enteredTaxId: string) {
    return {
      [attributeTaxId]: enteredTaxId
    };
  }

  clearFormValues(): void {
    this.merchantProcessingForm.get('name').reset();
    this.merchantProcessingForm.get('mobilePhone').reset();
    this.merchantProcessingForm.get('businessPhone').reset();
    this.merchantProcessingForm.get('address').reset();
    this.merchantProcessingForm.get('email').reset();
    this.merchantProcessingForm.get('zipcode').reset();
    this.merchantProcessingForm.get('city').reset();
    this.merchantProcessingForm.get('state').reset();
    this.merchantProcessingForm.get('dbaName').reset();
  }

  setFormValues(details: any): void {
    // Properties of object recieved from MRDS may change. so accordingly 
    // patching values will be changed
    let dataObject;
    if (details.customers) {
      const { ssn, ein, name, number } = details.customers[0];
      // this.merchantProcessingForm.get('ssn').patchValue(SSN);
      // this.merchantProcessingForm.get('ein').patchValue(EIN);
      this.merchantProcessingForm.get('name').patchValue(name);
      this.merchantProcessingForm.get('ecn').patchValue(number);
      if (details.customers[0].addresses) {
        const address = [];
        const { city, zipCode, state, street_address1, street_address2, street_address3, contactPhone, mail } = details.customers[0].addresses[0];
        if (street_address1) { address.push(street_address1); }
        if (street_address2) { address.push(street_address2); }
        if (street_address3) { address.push(street_address3); }
        const concatAddress = address.toString().replace(/,/gi, ', ');
        concatAddress.trim();
        this.merchantProcessingForm.get('address').patchValue(concatAddress);
        this.merchantProcessingForm.get('zipcode').patchValue(zipCode);
        this.merchantProcessingForm.get('city').patchValue(city);
        this.merchantProcessingForm.get('state').patchValue(state);
        this.merchantProcessingForm.get('businessPhone').patchValue(contactPhone);
        this.merchantProcessingForm.get('email').patchValue(mail);
        this.merchantProcessingForm.get('dbaName').patchValue('*DBA TEST VALUE');
        this.merchantProcessingForm.get('ecn').patchValue('999999999');
      }
    } else {
      dataObject = details[0];
      this.merchantProcessingForm.get('ssn').patchValue(dataObject.send.ssn);
      this.merchantProcessingForm.get('ein').patchValue(dataObject.send.ein);
      this.merchantProcessingForm.get('name').patchValue(dataObject.send.name);
      this.merchantProcessingForm.get('mobilePhone').patchValue(dataObject.send.mobilePhone);
      this.merchantProcessingForm.get('businessPhone').patchValue(dataObject.send.businessPhone);
      this.merchantProcessingForm.get('email').patchValue(dataObject.send.email);
      this.merchantProcessingForm.get('address').patchValue(dataObject.send.address[0].country || dataObject.send.address);
      this.merchantProcessingForm.get('zipcode').patchValue(dataObject.send.zipcode);
      this.merchantProcessingForm.get('city').patchValue(dataObject.send.city);
      this.merchantProcessingForm.get('state').patchValue(dataObject.send.state);
      this.merchantProcessingForm.get('dbaName').patchValue(dataObject.send.dbaName);
      this.merchantProcessingForm.get('ssnOrein').patchValue(dataObject.send.ssnOrein);
    }
    this.formValid = this.merchantProcessingForm.valid;
  }

  switchSSNtoEIN(value): void {
    if (value) {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators.concat(Validators.required));
      this.merchantProcessingForm.get('ein').setValidators(this.einValidators);
      this.merchantProcessingForm.get('ein').patchValue('');
      this.merchantProcessingForm.get('ssn').patchValue('');
      this.merchantProcessingForm.setErrors({ invalid: true });
      this.showInvalidEINmessage = false;
      this.ssnVal = [];
    } else {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators);
      this.merchantProcessingForm.get('ein').setValidators(this.einValidators.concat(Validators.required));
      this.merchantProcessingForm.get('ssn').patchValue('');
      this.merchantProcessingForm.get('ein').patchValue('');
      this.merchantProcessingForm.setErrors({ invalid: true });
      this.showInvalidSSNmessage = false;
      this.einVal = [];
    }
    this.clearFormValues();
    setTimeout(() => {
      if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
      if (this.einInput) { this.einInput.input.nativeElement.placeholder = 'Please enter EIN Number'; }
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  formControlValueChanged() {
    this.merchantProcessingForm.get('ssnOrein').valueChanges
      .subscribe(value => {
        console.log(value);
        // if (value) {
        //   this.merchantProcessingForm.get('ssn').setValidators(Validators.required);
        // } else {
        //   this.merchantProcessingForm.get('ein').setValidators(this.emailValidators);
        // }
      });
  }

  closeDialogAction(choice: string): void {
    if (choice === 'ok') {
      this.clearFormValues();
      this.ssnVal = this.einVal = [];
      this.isShowTaxIDDialog = false;
      this.merchantProcessingForm.get('ssn').patchValue('');
      this.merchantProcessingForm.get('ein').patchValue('');
    }
  }

  closeWarning() {
    this.showNonWellsFargoMsg = false;
    this.merchantProcessingForm.get('wellsCustomer').patchValue(true);
  }

  maxLengthWithoutMCC(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length > 24 && this.mccCode === '') {
      return { 'lengthWitoutMCC': true };
    }
    return null;
  }

  maxLengthWithMCC(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length > 19 && this.mccCode === '5411') {
      return { 'lengthWitMCC': true };
    }
    return null;
  }

}






