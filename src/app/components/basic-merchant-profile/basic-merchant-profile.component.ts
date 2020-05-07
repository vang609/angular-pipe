import { StateService } from './../../shared/service/state.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicMerchantProfileService } from './basic-merchant-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private stateService: StateService,
    private fb: FormBuilder,
    private basicMerchantProfileService: BasicMerchantProfileService) { }

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
      ssn: ['' , this.ssnValidators],
      tin: ['' , this.tinValidators],
      contactName: ['', Validators.required],
      mobilePhone: [{ value: '', disabled: false }],
      businessPhone: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: [{ value: '', disabled: false }, Validators.required],
      zipcode: [{ value: '', disabled: false }, Validators.required

      ],
      city: [{ value: '', disabled: false }, Validators.required],
      state: [{ value: '', disabled: false }, Validators.required],
      dbaName: ['', [Validators.required]]
    });

    this.switchSSNtoEIN(this.isSSNorEIN);
    this.formControlValueChanged();
  }

  getState(): void {
    this.stateService.getState().subscribe(s =>
      s.forEach(element => {
        this.state.push(element.name);
      })
    );
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

      this.basicMerchantProfileService.fetchMerchantDetials(enteredTaxId)
        .subscribe((merchantDetails: any) => {
          // this.setFormValues(merchantDetails); // Commented for Sprint 2

        });
    }
  }

  setFormValues(details: any): void {
    // Properties of object recieved from MRDS may change. so accordingly 
    // patching values will be changed
    this.merchantProcessingForm.get('contactName').patchValue(details[0].name);
    this.merchantProcessingForm.get('mobilePhone').patchValue('No value from MRDS');
    this.merchantProcessingForm.get('businessPhone').patchValue('No value from MRDS');
    this.merchantProcessingForm.get('email').patchValue('No value from MRDS');
    this.merchantProcessingForm.get('address').patchValue(details[0].address[0].street_address1
      + details[0].address[0].street_address2
      + details[0].address[0].street_address3);
    this.merchantProcessingForm.get('zipcode').patchValue(details[0].address[0].zipCode);
    this.merchantProcessingForm.get('city').patchValue(details[0].address[0].state);
    this.merchantProcessingForm.get('state').patchValue(details[0].address[0].city);
  }

  switchSSNtoEIN(value: boolean): void {
    this.isSSNorEIN = value;
    if (value) {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators.concat(Validators.required));
      this.merchantProcessingForm.get('tin').setValidators(this.tinValidators);
      this.merchantProcessingForm.get('tin').patchValue('');
      this.merchantProcessingForm.setErrors({ 'invalid': true });
    } else {
      this.merchantProcessingForm.get('ssn').setValidators(this.ssnValidators);
      this.merchantProcessingForm.get('tin').setValidators(this.tinValidators.concat(Validators.required));
      this.merchantProcessingForm.get('ssn').patchValue('');
      this.merchantProcessingForm.setErrors({ 'invalid': true });
    }
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
