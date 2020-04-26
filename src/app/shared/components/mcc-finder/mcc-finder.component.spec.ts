import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccFinderComponent } from './mcc-finder.component';
import { UserServiceMock } from '../../../../assets/mock/service/mock-mcc-finder.service';

describe('MccFinderComponent', () => {
  let component: MccFinderComponent;
  let fixture: ComponentFixture<MccFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MccFinderComponent ],
      providers : [
       { provide: UserServiceMock, useClass: UserServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fetch data', async(() => {
     component.getGrid();
     expect(component.mccData.length).toBeGreaterThan(0);
  }));

  it('should able to select row', () => {
    const data = {};
    component.selectionChanged(data);
    expect(component.selectedRowIndex).toBe(0);
  });

  it('table should be filled', () => {
    component.srcString = 'Hello';
    component.srcStringMinLength = 3;
    component.mccSrc();
    expect(component.mccData.length).toBeGreaterThan(0);
  });

  it('Notification message shoulb be shown', () => {
    component.srcString = 'He';
    component.srcStringMinLength = 3;
    component.mccSrc();
    expect(component.notificationMsg).toEqual('Please enter min 3 characters');
  });

});
