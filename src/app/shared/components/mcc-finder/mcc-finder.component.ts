// Angular Core
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgZone } from '@angular/core';

// Services
import { MccFinderService } from './mcc-finder.service';
import { AppShareDataService } from '../../service/AppShareData.service';

// Kendo
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { NotificationService } from '@progress/kendo-angular-notification';
import {
  PageSizeItem,
  GridDataResult,
  CellClickEvent,
  GridComponent,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';

// RxJs
import { filter } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Constants
import * as c from './mcc-finder.constant';

// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../root-store/app.reducers';
import * as loadAction from '../../../root-store/actions/loading.actions';

//  Models
import { Message } from '../../models/message.model';
import { GridResponse, SourceType } from './mcc-finder.model';

@Component({
  selector: 'app-mcc-finder',
  templateUrl: './mcc-finder.component.html',
  styleUrls: ['./mcc-finder.component.scss'],
  providers: [MccFinderService, NotificationService, AppShareDataService],
  encapsulation: ViewEncapsulation.None,
})
export class MccFinderComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private mccFinderService: MccFinderService,
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private appShareDataService: AppShareDataService,
    private lc: NgZone
  ) { }

  message$: Subscription;
  message: Message;
  inputError = false;
  @ViewChild('notificationTemplate', { read: TemplateRef })
  public notificationTemplate: TemplateRef<any>;
  notificationMsg: string;
  mccData: Array<GridResponse> = [];
  mccGrid = false;
  srcString: string;
  expandedRow: Array<number> = [];
  srcStringMinLength: number;
  specialCharacterError: boolean;
  public pageSize = 6;
  public skip = 0;
  public type = 'numeric';
  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{ field: 'mcc', dir: 'asc' }];
  public sourceType: Array<SourceType> = [
    {
      name: c.sourceType.b2cName,
      code: c.sourceType.b2cCode,
      checked: false,
      disable: false
    },
    {
      name: c.sourceType.b2bName,
      code: c.sourceType.b2bCode,
      checked: false,
      disable: false
    }    
  ];
  selectedSourceTypeArray: Array<string> = [];
  results: any = [];
  selectedRowData: any;
  selectedRowIndex: number;
  @Input() b2bOption;
  @Input() b2cOption;
  @Output() selectedMccRow = new EventEmitter();
  @ViewChild('grid') grid: GridComponent;
  isDisabled: boolean;
  loading$: Subscription;
  loading: boolean;
  querySearched = false;
  mySelection: number[] = [0];
  public gridView: GridDataResult;
  inputSrcBox: boolean;
  public rowExpand: boolean;
  showPagination = false;
  timeout: any = null;
  typingTimer;
  doneTypingInterval = 1000;
  showLoader = false;
  searchOnce = true;
  transType: any;

  ngOnInit(): void {
    this.loading = false;
    this.isDisabled = true;
    this.srcStringMinLength = 2;
    this.specialCharacterError = false;
    this.appShareDataService.messageMatrixSubject.subscribe((msg) => {
      if (msg) {
        this.showNotification(msg);
      }
    });

    this.loading$ = this.store
      .select('load')
      .subscribe(({ isLoading }) => (this.loading = isLoading));
    this.message$ = this.store.select('msg')
      .subscribe(({ message }) => {
        if (message) {
          this.showNotification(message);
        }
      });

    this.appShareDataService.loadingSubject.subscribe((value) => {
      this.showLoader = value;
    });
  }

  inputErrorCheck(val) {
    if (this.selectedSourceTypeArray.length === 0) {
      this.inputError = val;
    }
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
    this.message$.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.b2bOption > this.b2cOption || this.b2bOption === this.b2cOption) {
      this.sourceType[1].checked = true;
      this.sourceType[0].checked = false;
      this.selectedSourceTypeArray.push(this.sourceType[1].code);
    }
    if (this.b2bOption < this.b2cOption) {
      this.sourceType[0].checked = true;
      this.sourceType[1].checked = false;
      this.selectedSourceTypeArray.push(this.sourceType[0].code);
    }
  }

  onCellClick(event): void { }

  // Expand-Collapse Grid Row
  expandCollapseRow(event, rowindex: number): void {
    this.rowExpand = this.expandedRow.filter((rowIndex) => rowIndex === rowindex).length > 0;
    if (this.rowExpand) {
      // this.isDisabled = true;
      this.grid.collapseRow(rowindex);
      this.expandedRow = this.expandedRow.filter((rowIndex) => rowIndex !== rowindex);
      this.grid.wrapper.nativeElement.querySelector(
        `.k-grid-table tbody #title_${rowindex} .more-less`
      ).innerHTML = '<span>More</span>&nbsp;&darr;';
    } else {
      // this.isDisabled = false;
      this.grid.expandRow(rowindex);
      this.expandedRow.push(rowindex);
      this.grid.wrapper.nativeElement.querySelector(
        `.k-grid-table tbody #title_${rowindex} .more-less`
      ).innerHTML = '<span>Less</span>&nbsp;&uarr;';
    }
  }

  // Grid Sorting
  sortChange(event: any): void {
    this.expandedRow.forEach((rowIndex) => {
      this.grid.collapseRow(rowIndex);
    });
    this.expandedRow = [];
    this.selectedRowIndex = null;
  }

  // Validate Search Textbox
  validateTxt(e) {
    if ((e.keyCode > 96 && e.keyCode < 123) || (e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 8 || e.keyCode === 32) {
      this.specialCharacterError = false;
      return true;
    } else {
      this.specialCharacterError = true;
      return false;
    }
  }

  // Grid Row Select
  selectRow(data: any, row: number, col: number): void {
    this.isDisabled = false;
    this.selectedRowIndex = row;
    this.selectedRowData = data;
    this.selectRowState(row);
  }

  okButton(): void {
    this.selectedMccRow.emit(this.selectedRowData);
  }

  // Change state of selected row
  selectRowState(row): void {
    this.isDisabled = false;
  }

  // Commented: Input search enter function
  // mccSrc(event, eventTarget): void {
  //   this.srcString = this.srcString.trim();
  //   if (this.srcString.length > this.srcStringMinLength) {
  //     this.tooltipDir.hide();
  //     this.mccData = [];
  //     this.getGrid();
  //     this.inputSrcBox = false;
  //   } else {
  //     this.tooltipDir.show(eventTarget);
  //     this.inputSrcBox = true;
  //     let leftMargin;
  //     const popup: HTMLElement = document.querySelector(
  //       '.k-widget.k-window.k-dialog'
  //     );
  //     if (popup) {
  //       leftMargin = popup.offsetLeft + event.target.offsetLeft;
  //     } else {
  //       leftMargin = event.target.offsetLeft;
  //     }
  //     const tooltipWrapper = document.getElementsByClassName(
  //       'k-tooltip-wrapper'
  //     ) as HTMLCollectionOf<HTMLElement>;
  //     setTimeout(() => {
  //       tooltipWrapper[0].style.left = `${leftMargin}px`;
  //     });
  //     setTimeout(() => {
  //       this.inputSrcBox = false;
  //     }, 3000);
  //   }
  // }

  // Close Popup
  public closePopup(): void {
    this.inputSrcBox = false;
  }

  // Get Grid Data
  getGrid(): void {
    this.selectedRowIndex = null;
    this.store.dispatch(loadAction.isLoading());
    const code = this.sourceType.find((row) => row.checked)
      ? this.sourceType.find((row) => row.checked).code
      : null;
    this.mccFinderService.getMCCDataByQueryandType(this.srcString, code).subscribe((res) => {
      this.querySearched = true;
      if (res && res[0] && res[0].result && res[0].result.length > 0) {
        this.mccData = res[0].result;
        this.showPagination = this.mccData.length > 6 ? true : false;
        this.loadItems();
        this.store.dispatch(loadAction.stopLoading());
      }
    });
  }

  // Load items in grid
  private loadItems(): void {
    this.gridView = {
      data: this.mccData.slice(this.skip, this.skip + this.pageSize),
      total: this.mccData.length,
    };
  }

  // public onPageChange(state: any): void {
  //   this.pageSize = state.take;
  // }

  // Load items on page change
  // public pageChange(event: PageChangeEvent): void {
  //   this.skip = event.skip;
  //   this.loadItems();
  // }

  // Function called when new row is selected
  selectionChanged(data: any): void {
    this.selectedRowIndex = data.selectedRows[0].index;
    this.selectedRowData = data.selectedRows[0].dataItem;
    // Called when next row is selected
    // Called once
  }

  cellClicked(): void {
    // Called when row is clicked.
    // Called everytime, row is clicked
  }

  // Select checkbox functionality
  selectedSourceType(code: string, val: boolean): void {
    this.selectedSourceTypeArray = [];
    this.sourceType.forEach((row) => {
      if (row.code === code) {
        row.checked = val;
      } else {
        row.checked = false;
      }
    });
    if (val) {
      this.selectedSourceTypeArray.push(code);
    }
    this.clearSearchText();
    if (this.selectedSourceTypeArray.length === 0) {
      this.srcString = null;
    }
  }

  // valuechange() {
  //   this.srcString = this.srcString.trim();
  //   if (this.srcString.length > this.srcStringMinLength) {
  //     this.inputSrcBox = false;
  //     const code = this.sourceType.find((row) => row.checked)
  //       ? this.sourceType.find((row) => row.checked).code
  //       : null;
  //     const searchQuery = Observable.create((observer) => {
  //       observer.next(this.srcString);
  //     });
  //     searchQuery
  //       .pipe(
  //         debounceTime(1000),
  //         distinctUntilChanged(),
  //         switchMap((query) => this.mccFinderService.getMCCIData(query, code))
  //       )
  //       .subscribe((res) => {
  //         this.mccData = [];
  //         this.selectedRowData = this.selectedRowIndex = null;
  //         this.querySearched = true;
  //         if (res && res[0] && res[0].result && res[0].result.length > 0) {
  //           this.mccData = res[0].result;
  //           this.showPagination = this.mccData.length > 6 ? true : false;
  //           this.loadItems();
  //           this.store.dispatch(loadAction.stopLoading());
  //         }
  //       });
  //   } else {
  //     this.inputSrcBox = true;
  //   }
  // }

  searchKeyup(e): void {
    if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106)) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.srcString = this.srcString ? this.srcString.trim() : '';
        if (this.srcString.length >= 3) {
          this.appShareDataService.loadingSubject.next(true);
          this.fetchResult();
        }
      }, this.doneTypingInterval);

      // The below code will run once, so as to get
      // user feel that data is getting fetched. We can remove below 'if' condition
      // if not required while real testing
      if (this.searchOnce) {
        this.srcString = this.srcString ? this.srcString.trim() : '';
        if (this.srcString.length === 3) {
          this.searchOnce = false;
          this.fetchResult();
        }
      }
    }
  }

  getCode(): string {
    const code = this.sourceType.find((row) => row.checked)
      ? this.sourceType.find((row) => row.checked).code
      : null;
    return code;
  }

  fetchResult(): void {
    const code = this.getCode();
    this.mccFinderService.getMCCDataByQueryandType(this.srcString, code)
      .subscribe((res) => {
        this.appShareDataService.loadingSubject.next(false);
        this.mccData = [];
        this.selectedRowData = this.selectedRowIndex = null;
        this.querySearched = true;
        if (res && res.result && res.result.length > 0) {
          this.mccData = res.result;
          this.showPagination = this.mccData.length > 6 ? true : false;
          this.loadItems();
          this.store.dispatch(loadAction.stopLoading());
        }
      });
  }

  // Clear text in input box
  clearSearchText(): void {
    this.mccData = [];
    this.srcString = null;
    this.querySearched = false;
  }

  // Show notiifcation
  showNotification(data: any): void {
    this.notificationMsg = data.descriptiondha;
    this.notificationService.show({
      content: this.notificationMsg,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 800 },
      type: { style: data.msgType, icon: true },
      closable: true,
    });
  }
}
