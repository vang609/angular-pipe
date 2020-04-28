import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
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
