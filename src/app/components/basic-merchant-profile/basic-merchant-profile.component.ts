import { state } from './basic-merchant-profile.mockup';
import { element } from 'protractor';
import { SharedataService } from './../../service/sharedata.service';
import { StateService } from './../../shared/service/state.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicMerchantProfileService } from './basic-merchant-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as stepper from './../../shared/constant/stepper.constant';
import { ShareDataService } from '../../shared/service/shareData.service ';


@Component({
  selector: 'app-basic-merchant-profile',
  templateUrl: './basic-merchant-profile.component.html',
  styleUrls: ['./basic-merchant-profile.component.scss']
})
export class BasicMerchantProfileComponent implements OnInit {
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

  ssnValidators = [];
  tinValidators = [];

  showInvalidSSNmessage = false;
  showInvalidTINmessage = false;

  showLoader = false;

  constructor(private stateService: StateService,
    private sharedataService: SharedataService,
    private fb: FormBuilder,
    private basicMerchantProfileService: BasicMerchantProfileService,
    private shareDataService: ShareDataService
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
    setTimeout(() => {
      if (this.ssnInput) { this.ssnInput.input.nativeElement.placeholder = 'Please enter SSN Number'; }
      if (this.tinInput) { this.tinInput.input.nativeElement.placeholder = 'Please enter TIN Number'; }
    });

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
      Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      formType: this.formType
    });

    this.switchSSNtoEIN(this.isSSNorEIN);
    this.formControlValueChanged();
    const val = this.sharedataService.getFormDataArray(this.formType.routeName);
    if (val !== null) {
      this.setFormValues([val]);
    }
    this.shareDataService.loadingSubject.subscribe((value) => {
      this.showLoader = value;
    });
    this.merchantProcessingForm.valueChanges.subscribe(form => {
      this.sharedataService.sendFormValid(this.merchantProcessingForm);
    });
  }

  getState(): void {
    this.stateService.getState().subscribe(s =>
      s.forEach(element => {
        this.state.push(element.name);
      })
    );
  }

  ssnKeyedIn(event: any): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.showInvalidSSNmessage = true;
      setTimeout(() => {
        this.showInvalidSSNmessage = false;
      }, 3000);
    }
  }

  tinKeyedIn(event: any): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.showInvalidTINmessage = true;
      setTimeout(() => {
        this.showInvalidTINmessage = false;
      }, 3000);
    }
  }

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
    this.isWFcustomer = val;
  }

  fetchMerchantDetials(): void {
    if (this.merchantProcessingForm.get('ssn').enabled ||
      this.merchantProcessingForm.get('tin').enabled) {
      const enteredTaxId = this.merchantProcessingForm.get('ssn').value
        || this.merchantProcessingForm.get('tin').value;
      const attributeTaxId = this.merchantProcessingForm.get('ssn').value ? 'SSN' : 'TIN';
      const entityType = this.merchantProcessingForm.get('ssn').value ? 'individual' : 'non-individual';


      this.basicMerchantProfileService.fetchMerchantDetials(enteredTaxId) // Testing for checking with JSON
        .subscribe((merchantDetails: any) => {
          this.setFormValues(merchantDetails); // Commented for Sprint 2
          // TEST OBJECT
        });
      this.fetchBasicMerchantDetials(attributeTaxId, enteredTaxId, entityType); // Testing with real MRDS service
    }
  }

  fetchBasicMerchantDetials(attributeTaxId: string, enteredTaxId: string, entityType: string): void {
    this.basicMerchantProfileService.fetchBasicMerchantDetials(this.createBasicMerchantRequestObject(attributeTaxId, enteredTaxId), entityType)
      .subscribe((response: any) => {
        console.log(response);
        // this.setFormValues(merchantDetails); // Commented for Sprint 2

      });
  }

  createBasicMerchantRequestObject(attributeTaxId: string, enteredTaxId: string) {
    const attributeTaxId_quote = "\"" + attributeTaxId + "\"";
    return {
      [attributeTaxId_quote]: enteredTaxId
    };
  }

  setFormValues(details: any): void {
    // Properties of object recieved from MRDS may change. so accordingly 
    // patching values will be changed
    let dataObject;
    if (details.statusInfo) {
      dataObject = details.customers[0];
    } else {
      dataObject = details[0];
    }
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

}
