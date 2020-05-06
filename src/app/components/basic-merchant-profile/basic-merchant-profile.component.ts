import { StateService } from './../../shared/service/state.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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
  isWFcustomer: boolean;
  @ViewChild('ssnInput') ssnInput;
  @ViewChild('tinInput') tinInput;
  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.isWFcustomer = true;
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

  isWFcustomerFunc(val) {
    this.isWFcustomer = val;
  }

}
