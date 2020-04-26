import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicMerchantProfileComponent } from './basic-merchant-profile.component';

describe('BasicMerchantProfileComponent', () => {
  let component: BasicMerchantProfileComponent;
  let fixture: ComponentFixture<BasicMerchantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicMerchantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicMerchantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
