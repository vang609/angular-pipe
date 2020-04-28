import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccContainerComponent } from './mcc-container.component';

describe('MccContainerComponent', () => {
  let component: MccContainerComponent;
  let fixture: ComponentFixture<MccContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create mcc container component', () => {
    expect(component).toBeTruthy();
  });
});
