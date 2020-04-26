import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityStepperComponent } from './opportunity-stepper.component';

describe('OpportunityStepperComponent', () => {
  let component: OpportunityStepperComponent;
  let fixture: ComponentFixture<OpportunityStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
