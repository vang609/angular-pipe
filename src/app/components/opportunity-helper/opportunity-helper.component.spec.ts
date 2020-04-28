import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityHelperComponent } from './opportunity-helper.component';

describe('OpportunityHelperComponent', () => {
  let component: OpportunityHelperComponent;
  let fixture: ComponentFixture<OpportunityHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create opportunity helper component', () => {
    expect(component).toBeTruthy();
  });
});
