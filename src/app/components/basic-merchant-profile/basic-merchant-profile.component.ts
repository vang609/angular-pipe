import { StateService } from './../../shared/service/state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-merchant-profile',
  templateUrl: './basic-merchant-profile.component.html',
  styleUrls: ['./basic-merchant-profile.component.scss']
})
export class BasicMerchantProfileComponent implements OnInit {
  state = [];
  public contactVal: string = "9803371148";
  public zipVal: string = "28262";
  public contactMask: string = "(999) 000-00-00";
  public ZipMask: string = "00000";
  public mcciDialogOpened = false;

  ptitle = "Product Type";
  psubtitle = "Product Listing";
  pcount = 8;
  pprice = "$ XXX.XX";
  public isDisabled = true;
  constructor(private stateService: StateService) { }
  

  ngOnInit(): void {
    this.getState();
  }

  getState(){
    this.stateService.getState().subscribe(s => s.forEach(element => {
      this.state.push(element.name);
    }));
    console.log(this.state);
  }

}
