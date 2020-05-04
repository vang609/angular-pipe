import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityFormComponent } from './opportunity-form.component';

describe('OpportunityFormComponent', () => {
  let component: OpportunityFormComponent;
  let fixture: ComponentFixture<OpportunityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create opportunity form component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges', () => {
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

});
