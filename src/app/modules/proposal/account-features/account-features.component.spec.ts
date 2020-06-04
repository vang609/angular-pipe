import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFeaturesComponent } from './account-features.component';

describe('AccountFeaturesComponent', () => {
  let component: AccountFeaturesComponent;
  let fixture: ComponentFixture<AccountFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
