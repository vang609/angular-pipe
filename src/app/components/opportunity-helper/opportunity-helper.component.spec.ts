import { stepperSteps } from './../../shared/constant/stepper.constant';
import { SharedataService } from './../../service/sharedata.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpportunityHelperComponent } from './opportunity-helper.component';

describe('OpportunityHelperComponent', () => {
  let component: OpportunityHelperComponent;
  let fixture: ComponentFixture<OpportunityHelperComponent>;
  let sharedataService: SharedataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunityHelperComponent],
      providers: [SharedataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityHelperComponent);
    component = fixture.componentInstance;
    component.currentstep = 'Basic Merchant Profile';
    sharedataService = TestBed.inject(SharedataService);
    fixture.detectChanges();
  });

  it('should create opportunity helper component', () => {
    expect(component).toBeTruthy();
  });
});
