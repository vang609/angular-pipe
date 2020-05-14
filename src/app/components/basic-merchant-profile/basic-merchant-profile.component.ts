import { state } from './basic-merchant-profile.mockup';
import { element } from 'protractor';
import { SharedataService } from './../../service/sharedata.service';
import { StateService } from './../../shared/service/state.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterContentChecked, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BasicMerchantProfileService } from './basic-merchant-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as stepper from './../../shared/constant/stepper.constant';
import { ShareDataService } from '../../shared/service/shareData.service ';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-basic-merchant-profile',
  templateUrl: './basic-merchant-profile.component.html',
  styleUrls: ['./basic-merchant-profile.component.scss']
})
export class BasicMerchantProfileComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {
  state = [];
  public contactVal: string;
  public zipVal: string;
  public contactMask: string;
  public ZipMask: string;
  public mcciDialogOpened = false;
  formType = stepper.stepperSteps[0];
  ptitle: string;
  psubtitle: string;
  pcount: number;
  pprice: string;
  public isDisabled = true;
  isWFcustomer = true;
  isSSNorEIN = true;
  @ViewChild('ssnInput') ssnInput;
  @ViewChild('tinInput') tinInput;
  merchantProcessingForm: FormGroup;
  ssnVal = [];
  tinVal = [];
  ssnValidators = [];
  tinValidators = [];

  showInvalidSSNmessage = false;
  showInvalidTINmessage = false;

  showLoader = false;
  isShowTaxIDDialog = false;
  notificationMsg: string;
  message$: Subscription;
  loading$: Subscription;

  showNonWellsFargoMsg = false;

  constructor(private stateService: StateService,
    private sharedataService: SharedataService,
    private fb: FormBuilder,
    private basicMerchantProfileService: BasicMerchantProfileService,
    private shareDataService: ShareDataService,
    private changeDetectorRef: ChangeDetectorRef
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
    this.getState();


    this.merchantProcessingForm = this.fb.group({
      wellsCustomer: [this.isWFcustomer],
      ssnOrein: [this.isSSNorEIN],
      ssn: ['', this.ssnValidators],
      tin: ['', this.tinValidators],
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
      Validators.pattern('^[ a-zA-Z0-9-_]+$')]],
      cnn: [''],
      formType: this.formType
    });

    this.switchSSNtoEIN(this.isSSNorEIN);
    this.formControlValueChanged();
    const val = this.sharedataService.getFormDataArray(this.formType.routeName);
    if (val !== null) {
      this.setFormValues([val]);
    }
    this.loading$ = this.shareDataService.loadingSubject.subscribe((value) => {
      this.showLoader = value;
    });
    this.message$ = this.shareDataService.messageMatrixSubject.subscribe((msg) => {
      if (msg) {
        this.isShowTaxIDDialog = true;
        this.notificationMsg = msg;
      } else {
        this.isShowTaxIDDialog = false;
        this.notificationMsg = '';
      }
    });

    this.merchantProcessingForm.valueChanges.subscribe(data => {
      this.sharedataService.sendFormValid(this.merchantProcessingForm);
    });
  }

  ngAfterViewInit() {
    if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
    if (this.tinInput) { this.tinInput.input.nativeElement.placeholder = 'Please enter TIN Number'; }
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
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

  formChange(e) {
    this.sharedataService.sendFormValid(this.merchantProcessingForm);
  }
  // ssnKeyedIn(event: any): void {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     this.showInvalidSSNmessage = true;
  //     setTimeout(() => {
  //       this.showInvalidSSNmessage = false;
  //     }, 3000);
  //   }
  // }


  maskFocus(e) {
    const cursorPos = e.input.nativeElement.value.indexOf('_');
    if (cursorPos === -1) {
      e.input.nativeElement.selectionStart = e.input.nativeElement.value.length;
      e.input.nativeElement.selectionEnd = e.input.nativeElement.value.length;
    } else {
      e.input.nativeElement.selectionStart = cursorPos;
      e.input.nativeElement.selectionEnd = cursorPos;
    }
  }

  disableArrow(e) {
    if (e.repeat) {
      return false;
    } else {
      if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || (e.keyCode > 95 && e.keyCode < 106)) {
        return true;
      } else {
        return false;
      }
    }
  }

  // maskKeyedIn(e: any, type: string) {
  //   if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || (e.keyCode > 95 && e.keyCode < 106)) {
  //     if (type === 'ssn') { this.showInvalidSSNmessage = false; }
  //     if (type === 'tin') { this.showInvalidTINmessage = false; }
  //     return true;
  //   } else {
  //     if (type === 'ssn') {
  //       this.showInvalidSSNmessage = true;
  //       setTimeout(() => {
  //         this.showInvalidSSNmessage = false;
  //       }, 3000);
  //     }
  //     if (type === 'tin') {
  //       this.showInvalidTINmessage = true;
  //       setTimeout(() => {
  //         this.showInvalidTINmessage = false;
  //       }, 3000);
  //     }
  //     return false;
  //   }
  // }

  maskKeyUp(e, type) {
    let numVal;
    let val;
    let numStr;
    let callTxtLen: number;
    let serviceCall: boolean;
    if (e.keyCode === 13) {
      return;
    }
    if (e.target.value.length < 12) {
      if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || (e.keyCode > 95 && e.keyCode < 106)) {
        if (e.keyCode > 47 && e.keyCode < 58 || (e.keyCode > 95 && e.keyCode < 106)) {
          val = e.target.value;
          const splitchar = val.split('-');
          if (type === 'ssn') {
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
            e.target.selectionStart = cursorPos.length > 5 ? cursorPos.length + 2 : (cursorPos.length > 3 ? cursorPos.length + 1 : cursorPos.length);
            e.target.selectionEnd = e.target.selectionStart;
            numStr = this.ssnVal.toString().replace(/,/gi, '');
            if (numStr.substring(5, 9)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}-${numStr.substring(5, 9)}`;
            } else if (numStr.substring(3, 5)) {
              numVal = `${numStr.substring(0, 3)}-${numStr.substring(3, 5)}`;
            } else {
              numVal = `${numStr.substring(0, 3)}`;
            }
          }
          if (type === 'tin') {
            callTxtLen = 10;
            this.showInvalidTINmessage = false;
            if (this.tinVal.length < 9) {
              this.tinVal.push(e.key);
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
            this.merchantProcessingForm.get('tin').patchValue(rVal);
            e.target.selectionStart = cursorPos.length > 2 ? cursorPos.length + 1 : cursorPos.length;
            e.target.selectionEnd = e.target.selectionStart;
            numStr = this.tinVal.toString().replace(/,/gi, '');
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
            if (type === 'ssn') {
              console.log('SSN: ' + finalVal);
              // Call EIN Service here
              // this.fetchMerchantDetials();
              // this.fetchBasicMerchantDetials('SSN', finalVal, 'individual');
            }
            if (type === 'tin') {
              console.log('EIN: ' + finalVal);
              // Call EIN Service here
              // this.fetchMerchantDetials();
              // this.fetchBasicMerchantDetials('TIN', finalVal, 'non-individual');
            }
          }
        }
        if (e.keyCode === 8) {
          const skipDivider = e.target.selectionStart;
          let inputVal = e.target.value.replace(/_/gi, '');
          inputVal = inputVal.replace(/-/gi, '');
          const inputValLen = inputVal.length;
          if (type === 'ssn') {
            this.ssnVal = this.ssnVal.slice(0, inputValLen);
          }
          if (type === 'tin') {
            this.tinVal = this.tinVal.slice(0, inputValLen);
          }
        }
      } else {
        if (type === 'ssn') {
          this.showInvalidSSNmessage = true;
          setTimeout(() => {
            this.showInvalidSSNmessage = false;
          }, 3000);
        }
        if (type === 'tin') {
          this.showInvalidTINmessage = true;
          setTimeout(() => {
            this.showInvalidTINmessage = false;
          }, 3000);
        }
        return false;
      }
    } else {
      return false;
    }
  }

  // Function to mask after last character ... commented for future reference
  // endMaskKeyUp(e, type) {
  //   if (e.target.value.length < 12) {
  //     if ((e.keyCode > 47 && e.keyCode < 58) || e.key === 'Backspace' || e.key === 'Delete') {
  //       let maskVal;
  //       if (type === 'ssn') { this.showInvalidSSNmessage = false; }
  //       if (type === 'tin') { this.showInvalidTINmessage = false; }
  //       const val = e.target.value;
  //       let unmaskVal = val.replace(/_/gi, '');
  //       unmaskVal = unmaskVal.replace(/-/gi, '');
  //       if (unmaskVal.length === 9) {
  //         const splitVal = val.split('-');
  //         if (type === 'ssn') {
  //           maskVal = `${splitVal[0].replace(/[0-9]/gi, 'X')}-${splitVal[1].replace(/[0-9]/gi, 'X')}-${splitVal[2]}`;
  //         }
  //         if (type === 'tin') {
  //           maskVal = `${splitVal[0].replace(/[0-9]/gi, 'X')}-${splitVal[1].replace(/^.{3}/g, 'XXX')}`;
  //         }
  //         this.merchantProcessingForm.get(type).patchValue(maskVal);
  //       }
  //     } else {
  //       if (type === 'ssn') {
  //         this.showInvalidSSNmessage = true;
  //         setTimeout(() => {
  //           this.showInvalidSSNmessage = false;
  //         }, 3000);
  //       }
  //       if (type === 'tin') {
  //         this.showInvalidTINmessage = true;
  //         setTimeout(() => {
  //           this.showInvalidTINmessage = false;
  //         }, 3000);
  //       }
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  // taxValueChange(type: string): void {
  //   if (type === 'ssn') {
  //     if (this.merchantProcessingForm.get('ssn').value.length > 0) {
  //       this.merchantProcessingForm.get('tin').disable();
  //     } else {
  //       this.merchantProcessingForm.get('tin').enable();
  //     }
  //   } else {
  //     if (this.merchantProcessingForm.get('tin').value.length > 0) {
  //       this.merchantProcessingForm.get('ssn').disable();
  //     } else {
  //       this.merchantProcessingForm.get('ssn').enable();
  //     }
  //   }
  // }

  isWFcustomerFunc(val: boolean): void {
    // this.isWFcustomer = val;
    if (!val) {
      this.showNonWellsFargoMsg = true;
    }
    this.fetchMerchantDetials();

    setTimeout(() => {
      if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
      if (this.tinInput) { this.tinInput.input.nativeElement.placeholder = 'Please enter EIN Number'; }
    });
  }

  fetchMerchantDetials(): void {
    if ((this.merchantProcessingForm.get('ssn').value &&
      this.merchantProcessingForm.get('ssn').value.length === 11)
      || (this.merchantProcessingForm.get('tin') &&
        this.merchantProcessingForm.get('tin').value.length === 11)) {
      if (this.merchantProcessingForm.get('ssn').enabled ||
        this.merchantProcessingForm.get('tin').enabled) {
        const enteredTaxId = this.merchantProcessingForm.get('ssn').value
          || this.merchantProcessingForm.get('tin').value;
        const attributeTaxId = this.merchantProcessingForm.get('ssn').value ? 'SSN' : 'TIN';
        const entityType = this.merchantProcessingForm.get('ssn').value ? 'individual' : 'non-individual';
        // this.basicMerchantProfileService.fetchMerchantDetials(enteredTaxId) // Testing for checking with JSON
        //   .subscribe((merchantDetails: any) => {
        //     this.clearFormValues();
        //     this.setFormValues(merchantDetails); // Commented for Sprint 2
        //     // TEST OBJECT
        //   });
        this.fetchBasicMerchantDetials(attributeTaxId, enteredTaxId, entityType); // Testing with real MRDS service
      }
    }
  }

  fetchBasicMerchantDetials(attributeTaxId: string, enteredTaxId: string, entityType: string): void {
    this.basicMerchantProfileService.fetchBasicMerchantDetials(this.createBasicMerchantRequestObject(attributeTaxId, enteredTaxId), entityType)
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
      const { SSN, TIN, name, number } = details.customers[0];
      this.merchantProcessingForm.get('ssn').patchValue(SSN);
      this.merchantProcessingForm.get('tin').patchValue(TIN);
      this.merchantProcessingForm.get('name').patchValue(name);
      this.merchantProcessingForm.get('cnn').patchValue(number);
      if (details.customers[0].addresses) {
        const { city, zipCode, state, street_address1, street_address2, street_address3 } = details.customers[0].addresses[0];
        const concatAddress = !street_address1 ? '' : street_address1 + ', ' + street_address2 + ' ' + street_address3;
        this.merchantProcessingForm.get('address').patchValue(concatAddress);
        this.merchantProcessingForm.get('zipcode').patchValue(zipCode);
        this.merchantProcessingForm.get('city').patchValue(city);
        this.merchantProcessingForm.get('state').patchValue(state);

      }
    } else {
      dataObject = details[0];
      this.merchantProcessingForm.get('ssn').patchValue(dataObject.ssn);
      this.merchantProcessingForm.get('tin').patchValue(dataObject.tin);
      this.merchantProcessingForm.get('name').patchValue(dataObject.name);
      this.merchantProcessingForm.get('mobilePhone').patchValue(dataObject.mobilePhone);
      this.merchantProcessingForm.get('businessPhone').patchValue(dataObject.businessPhone);
      this.merchantProcessingForm.get('email').patchValue(dataObject.email);
      this.merchantProcessingForm.get('address').patchValue(dataObject.address[0].country || dataObject.address);
      this.merchantProcessingForm.get('zipcode').patchValue(dataObject.zipcode);
      this.merchantProcessingForm.get('city').patchValue(dataObject.city);
      this.merchantProcessingForm.get('state').patchValue(dataObject.state);
      this.merchantProcessingForm.get('dbaName').patchValue(dataObject.dbaName);
    }
  }

  switchSSNtoEIN(value: boolean): void {
    this.isSSNorEIN = value;
    if (value) {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators.concat(Validators.required));
      this.merchantProcessingForm.get('tin').setValidators(this.tinValidators);
      this.merchantProcessingForm.get('tin').patchValue('');
      this.merchantProcessingForm.setErrors({ invalid: true });
      this.showInvalidTINmessage = false;
    } else {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators);
      this.merchantProcessingForm.get('tin').setValidators(this.tinValidators.concat(Validators.required));
      this.merchantProcessingForm.get('ssn').patchValue('');
      this.merchantProcessingForm.setErrors({ invalid: true });
      this.showInvalidSSNmessage = false;
    }

    setTimeout(() => {
      if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
      if (this.tinInput) { this.tinInput.input.nativeElement.placeholder = 'Please enter EIN Number'; }
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
        //   this.merchantProcessingForm.get('tin').setValidators(this.emailValidators);
        // }
      });
  }

  closeDialogAction(choice: string): void {
    if (choice === 'ok') {
      this.isShowTaxIDDialog = false;
    }
  }

}
