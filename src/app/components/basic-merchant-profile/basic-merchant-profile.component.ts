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
  @ViewChild('ssnInput') ssnInput;
  @ViewChild('tinInput') tinInput;
  merchantProcessingForm: FormGroup;

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
      ssn: [{ value: '', disabled: false }, Validators.required],
      tin: [{ value: '', disabled: false }, Validators.required],
      contactName: [{ value: '', disabled: this.isWFcustomer }],
      mobilePhone: [{ value: '', disabled: this.isWFcustomer }],
      businessPhone: [{ value: '', disabled: this.isWFcustomer }],
      email: [{ value: '', disabled: this.isWFcustomer }],
      address: [{ value: '', disabled: this.isWFcustomer }],
      zipcode: [{ value: '', disabled: this.isWFcustomer }],
      city: [{ value: '', disabled: this.isWFcustomer }],
      state: [{ value: '', disabled: this.isWFcustomer }],
      dbaName: ['', Validators.required]
    });
  }

  getState() {
    this.stateService.getState().subscribe(s =>
      console.log(s)
      //   s.forEach(element => {
      //   this.state.push(element.name);
      // })
    );
    // console.log(this.state);
  }

  taxValueChange(type: string): void {
    if (type === 'ssn') {
      if (this.merchantProcessingForm.get('ssn').value.length > 0) {
        this.merchantProcessingForm.get('tin').disable();
      } else {
        this.merchantProcessingForm.get('tin').enable();
      }
    } else {
      if (this.merchantProcessingForm.get('tin').value.length > 0) {
        this.merchantProcessingForm.get('ssn').disable();
      } else {
        this.merchantProcessingForm.get('ssn').enable();
      }
    }
  }

  isWFcustomerFunc(val) {
    this.isWFcustomer = val;
  }

  fetchMerchantDetials(): void {
    if (this.merchantProcessingForm.get('ssn').enabled ||
      this.merchantProcessingForm.get('tin').enabled) {
      const enteredTaxId = this.merchantProcessingForm.get('ssn').value
        || this.merchantProcessingForm.get('tin').value;

      this.basicMerchantProfileService.fetchMerchantDetials(enteredTaxId)
        .subscribe((merchantDetails: any) => {
            this.setFormValues(merchantDetails);
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

}
