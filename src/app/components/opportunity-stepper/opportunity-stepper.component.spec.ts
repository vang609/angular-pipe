import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityStepperComponent } from './opportunity-stepper.component';

describe('OpportunityStepperComponent', () => {
  let component: OpportunityStepperComponent;
  let fixture: ComponentFixture<OpportunityStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ OpportunityStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create opportunity stepper component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges', () => {
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call stepClck Function', () => {
    component.stepClck(1);
    expect(component.stepClck).toBeTruthy();
  });

  it('should call productlist Function', () => {
    component.productlist();
    expect(component.productlist).toBeTruthy();
  });

  it('should call openMcciBox Function', () => {
    component.openMcciBox();
    expect(component.openMcciBox).toBeTruthy();
  });

});
