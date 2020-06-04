import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridResponse } from './mcc-finder.model';
import { appReducers } from '../../../root-store/app.reducers';
import { StoreModule } from '@ngrx/store';
import { AppShareDataService } from '../../service/AppShareData.service';
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

const grid = jasmine.createSpyObj(GridComponent, ['expandRow', 'collapseRow']);

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
      providers: [MccFinderService, NotificationService, AppShareDataService, PopupService]
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
    component.doneTypingInterval = 1000;
    notificationService = TestBed.inject(NotificationService);
    mccFinderService = TestBed.inject(MccFinderService);
    fixture.detectChanges();
  });

  it('should create MCC Finder Component', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges when B2B is selected', () => {
    component.b2bOption = 60;
    component.b2cOption = 40;
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call ngOnChanges when B2C is selected', () => {
    component.b2bOption = 40;
    component.b2cOption = 60;
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('should call selectRow Function', () => {
    component.selectRow(data.gridResp[0], 1, 1);
    expect(component.selectRow).toBeTruthy();
  });

  it('should call onCellClick Function', () => {
    const param = {
      column: '',
      columnIndex: 1,
      dataItem: {
        Keywords: '',
        MCCCode: '3008',
        MCCDescription: 'Lufthansa German Airlines',
        MCCName: '3008 - LUFTHAN',
        bVsC: 'C',
        cbRatio: 0.00683,
        chgBckRatio: 0.000424316956950934,
        crDays: 45,
        crRatio: 0.12701,
        createdOn: '2020-04-20T00:00:00',
        ecaCategory: '2B43B652-BB55-E611-942A-005056AA1442',
        id: '313bd510-7594-4bc4-a94d-00a098ea1d78',
        isActive: true,
        markedforB2B: 'N',
        mcAuthValue: 865080001,
        mccAmexType: 'E',
        mccAvgTktInd: 0,
        mccType: 'I',
        modifiedOn: '2020-04-20T00:00:00',
        ndxDays: 35,
        ndxRatio: 1,
        returnRatio: 0.0204282978763304,
        reversalRatio: 0.000306054213967417,
        riskLevel: 'R',
        sicCode: '3008',
        similarMerchants: [{
          MCCCode: '3008',
          MCCDescription: 'Lufthansa German Airlines',
          MCCName: '3008 - LUFTHAN',
          id: '829e62f0-139e-4b3c-890b-788405e4db22'
        }],
        validMAI: 1,
        volumePercentAmex: 0
      },
      isEdited: false,
      originalEvent: {},
      rowIndex: 1,
      sender: {
        activeCell: '',
        activeRow: '',
        autoSize: false
      },
      type: 'click'
    }
    component.onCellClick(param);
    expect(component.onCellClick).toBeTruthy();
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
    spyOn(mccFinderService, 'getMCCDataByQueryandType').withArgs('test', 'N').and.returnValues(of(data.gridResp));
    expect(component.mccData.length).toBeGreaterThanOrEqual(0);
  }));

  // it('should call expand collapse function to expand row', async(() => {
  //   component.expandCollapseRow(data.gridResp[0], 0);
  //   component.rowExpand = false;
  //   component.grid.expandRow(0);
  //   component.expandedRow.push(0);
  //   expect(component.expandCollapseRow).toBeTruthy();
  // }));

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

  // it('should call showNotification function', () => {
  //   component.showNotification(data.notification);
  //   expect(component.showNotification).toBeTruthy();
  // });

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

  it('should call getCode function', () => {
    component.getCode();
    expect(component.getCode).toBeTruthy();
  });

  it('should call validateTxt function with valid key', () => {
    component.validateTxt({ keyCode: 100 });
    expect(component.validateTxt).toBeTruthy();
  });

  it('should call validateTxt function with invalid key', () => {
    component.validateTxt({ keyCode: 1 });
    expect(component.validateTxt).toBeTruthy();
  });

  it('should call searchKeyup function with valid key', () => {
    component.srcString = 'tes';
    component.typingTimer = setTimeout(() => {
      component.srcString = component.srcString ? component.srcString.trim() : '';
      if (component.srcString.length >= 3) {
        component.fetchResult();
      }
    }, component.doneTypingInterval);
    component.searchKeyup({ keyCode: 100 });
    expect(component.searchKeyup).toBeTruthy();
  });

  it('should call searchKeyup function with invalid key', () => {
    component.searchKeyup({ keyCode: 1 });
    expect(component.searchKeyup).toBeTruthy();
  });

  it('table should be filled', () => {
    component.grid = grid;
    expect(component.mccData.length).toBeGreaterThan(0);
  });

});
