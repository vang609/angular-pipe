import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridResponse } from './mcc-finder.model';
import { appReducers } from '../../../root-store/app.reducers';
import { StoreModule } from '@ngrx/store';
import { ShareDataService } from '../../service/shareData.service ';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MccFinderService } from './mcc-finder.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MccFinderComponent } from './mcc-finder.component';
import { UserServiceMock } from '../../../../assets/mock/service/mock-mcc-finder.service';
import * as data from './mcc-finder.mockup';
import { Observable, of } from 'rxjs';
import { PopupService } from '@progress/kendo-angular-popup';
import { GridComponent } from '@progress/kendo-angular-grid';

const grid = jasmine.createSpyObj(GridComponent , ['expandRow', 'collapseRow']);

describe('MccFinderComponent', () => {
  let component: MccFinderComponent;
  let fixture: ComponentFixture<MccFinderComponent>;
  let notificationService: NotificationService;
  let mccFinderService: MccFinderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot(appReducers)],
      declarations: [MccFinderComponent, TooltipDirective, GridComponent],
      providers: [MccFinderService, NotificationService, ShareDataService, PopupService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MccFinderComponent);
    component = fixture.componentInstance;
    component.srcString = data.mockup.searchStr;
    component.mccData = data.gridResp;
    component.loading = false;
    component.isDisabled = true;
    component.srcStringMinLength = 2;
    component.sourceType = data.sourceTypeData;
    notificationService = TestBed.inject(NotificationService);
    mccFinderService = TestBed.inject(MccFinderService);
    fixture.detectChanges();
  });

  it('should create MCC Finder Component', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges when B2B is selected', () => {
    component.b2bOption = true;
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call ngOnChanges when B2C is selected', () => {
    component.b2cOption = true;
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call selectRow Function', () => {
    component.selectRow(data.gridResp[0], 1, 1);
    expect(component.selectRow).toBeTruthy();
  });

  it('should call sortChange Function', () => {
    component.sortChange({});
    expect(component.sortChange).toBeTruthy();
  });

  it('should call clearSearchText Function', () => {
    component.clearSearchText();
    expect(component.clearSearchText).toBeTruthy();
  });

  it('should call okButton Function', () => {
    component.okButton();
    expect(component.okButton).toBeTruthy();
  });

  it('should call closePopup Function', () => {
    component.inputSrcBox = false;
    component.closePopup();
    expect(component.closePopup).toBeTruthy();
  });

  it('should have fetch data', async(() => {
    component.getGrid();
    spyOn(mccFinderService, 'getMCCIData').withArgs('test', 'N').and.returnValues(of(data.gridResp));
    expect(component.mccData.length).toBeGreaterThanOrEqual(0);
  }));

  it('should call expand collapse function to expand row', async(() => {
    component.expandCollapseRow(data.gridResp[0], 0);
    component.rowExpand = false;
    component.grid.expandRow(0);
    component.expandedRow.push(0);
    expect(component.expandCollapseRow).toBeTruthy();
  }));

  it('should able to select row', () => {
    component.selectionChanged(data.selectedRow);
  });

  // it('should call onPageChange function', () => {
  //   component.onPageChange(data.pageChangeEvent);
  //   expect(component.onPageChange).toBeTruthy();
  // });

  // it('should call pageChange function', () => {
  //   component.pageChange(data.pageChangeEvent);
  //   expect(component.pageChange).toBeTruthy();
  // });

  it('should call selectedSourceType function if checkbox is selected', () => {
    component.selectedSourceType('N', true);
    expect(component.selectedSourceType).toBeTruthy();
  });

  it('should call selectedSourceType function if checkbox is unselected', () => {
    component.selectedSourceType('N', false);
    expect(component.selectedSourceType).toBeTruthy();
  });

  it('should call showNotification function', () => {
    component.showNotification(data.notification);
    expect(component.showNotification).toBeTruthy();
  });

  it('should call inputErrorCheck function', () => {
    component.inputErrorCheck(true);
    expect(component.inputErrorCheck).toBeTruthy();
  });

  it('should call cellClicked function', () => {
    component.cellClicked();
    expect(component.cellClicked).toBeTruthy();
  });

  it('should call searchKeyup function', () => {
    component.searchKeyup({});
    expect(component.searchKeyup).toBeTruthy();
  });

  it('table should be filled', () => {
    component.grid = grid;
    expect(component.mccData.length).toBeGreaterThan(0);
  });

});
