import { GridResponse, SourceType } from "./mcc-finder.model";
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
  ElementRef,
} from "@angular/core";

// Services
import { MccFinderService } from "./mcc-finder.service";
import { ShareDataService } from "../../service/shareData.service ";

// Kendo
import { TooltipDirective } from "@progress/kendo-angular-tooltip";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import { NotificationService } from "@progress/kendo-angular-notification";
import {
  PageSizeItem,
  GridDataResult,
  CellClickEvent,
  GridComponent,
  PageChangeEvent,
} from "@progress/kendo-angular-grid";

// RxJs
import { filter } from "rxjs/operators";
import { debounceTime } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription, Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";

// Constants
import * as c from "./mcc-finder.constant";

// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../root-store/app.reducers";
import * as loadAction from "../../../root-store/actions/loading.actions";

//  Models
import { Message } from "../../models/message.model";

@Component({
  selector: "app-mcc-finder",
  templateUrl: "./mcc-finder.component.html",
  styleUrls: ["./mcc-finder.component.scss"],
  providers: [MccFinderService, NotificationService, ShareDataService],
  encapsulation: ViewEncapsulation.None,
})
export class MccFinderComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private mccFinderService: MccFinderService,
    private notificationService: NotificationService,
    private store: Store<AppState>,
    private shareDataService: ShareDataService
  ) {}

  message$: Subscription;
  message: Message;

  @ViewChild("notificationTemplate", { read: TemplateRef })
  public notificationTemplate: TemplateRef<any>;
  notificationMsg: string;
  mccData: Array<GridResponse> = [];
  mccGrid = false;
  srcString: string;
  expandedRow: Array<number> = [];
  srcStringMinLength: number;
  public pageSize = 6;
  public skip = 0;
  public type = "numeric";
  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{ field: "mcc", dir: "asc" }];
  public sourceType: Array<SourceType> = [
    {
      name: c.sourceType.b2bName,
      code: c.sourceType.b2bCode,
      checked: false,
      disable: false,
    },
    {
      name: c.sourceType.b2cName,
      code: c.sourceType.b2cCode,
      checked: false,
      disable: false,
    },
  ];
  selectedSourceTypeArray: Array<string> = [];
  results: any = [];
  selectedRowData: any;
  selectedRowIndex: number;
  @Input() b2bOption: boolean;
  @Input() b2cOption: boolean;
  @ViewChild("grid") grid: GridComponent;
  @ViewChild(TooltipDirective)
  public tooltipDir: TooltipDirective;
  isDisabled: boolean;
  loading$: Subscription;
  loading: boolean;
  querySearched = false;
  mySelection: number[] = [0];
  public gridView: GridDataResult;
  inputSrcBox: boolean;
  public rowExpand: boolean;
  showPagination = false;
  errorMsg: string;


  ngOnInit(): void {
    this.loading = false;
    this.isDisabled = true;
    this.srcStringMinLength = 2;

    this.shareDataService.messageMatrixSubject.subscribe((msg) => {
      if (msg) {
        this.showNotification(msg);
      }
    });

    this.loading$ = this.store
      .select("load")
      .subscribe(({ isLoading }) => (this.loading = isLoading));
    this.message$ = this.store.select("msg").subscribe(({ message }) => {
      if (message) {
        this.showNotification(message);
      }
    });
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
    this.message$.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.b2bOption) {
      this.sourceType[1].checked = this.b2bOption;
      this.sourceType[0].disable = true;
      this.selectedSourceTypeArray = [];
      this.selectedSourceTypeArray.push(this.sourceType[1].code);
    }
    if (this.b2cOption) {
      this.sourceType[0].checked = this.b2cOption;
      this.sourceType[1].disable = true;
      this.selectedSourceTypeArray = [];
      this.selectedSourceTypeArray.push(this.sourceType[0].code);
    }
  }

  onCellClick(event: CellClickEvent): void {}

  // Expand-Collapse Grid Row
  expandCollapseRow(event, rowindex: number): void {
    this.rowExpand =
      this.expandedRow.filter((rowIndex) => rowIndex === rowindex).length > 0;
    if (this.rowExpand) {
      // this.isDisabled = true;
      this.grid.collapseRow(rowindex);
      this.expandedRow = this.expandedRow.filter(
        (rowIndex) => rowIndex !== rowindex
      );
      this.grid.wrapper.nativeElement.querySelector(
        `.k-grid-table tbody #title_${rowindex} .more-less`
      ).innerHTML = "<span>More</span>&nbsp;&darr;";
    } else {
      // this.isDisabled = false;
      this.grid.expandRow(rowindex);
      this.expandedRow.push(rowindex);
      this.grid.wrapper.nativeElement.querySelector(
        `.k-grid-table tbody #title_${rowindex} .more-less`
      ).innerHTML = "<span>Less</span>&nbsp;&uarr;";
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

  // Grid Row Select
  selectRow(data: any, row: number, col: number): void {
    this.isDisabled = false;
    this.selectedRowIndex = row;
    this.selectedRowData = data;
    this.selectRowState(row);
  }

  okButton(): void {
    console.log("Ok press");
  }

  // Change state of selected row
  selectRowState(row): void {
    this.isDisabled = false;
  }

  mccSrc(event, eventTarget): void {
    if (this.srcString.length > this.srcStringMinLength) {
      this.tooltipDir.hide();
      this.mccData = [];
      this.getGrid();
      this.inputSrcBox = false;
    } else {
      this.tooltipDir.show(eventTarget);
      this.inputSrcBox = true;
      let leftMargin;
      const popup: HTMLElement = document.querySelector(
        ".k-widget.k-window.k-dialog"
      );
      if (popup) {
        leftMargin = popup.offsetLeft + event.target.offsetLeft;
      } else {
        leftMargin = event.target.offsetLeft;
      }
      const tooltipWrapper = document.getElementsByClassName(
        "k-tooltip-wrapper"
      ) as HTMLCollectionOf<HTMLElement>;
      setTimeout(() => {
        tooltipWrapper[0].style.left = `${leftMargin}px`;
      });
    }
  }

  // Close Popup
  public closePopup(): void {
    this.tooltipDir.hide();
    this.inputSrcBox = false;
  }

  // Get Grid Data
  getGrid(): void {
    this.selectedRowIndex = null;
    this.store.dispatch(loadAction.isLoading());
    const code = this.sourceType.find((row) => row.checked)
      ? this.sourceType.find((row) => row.checked).code
      : null;
    this.mccFinderService.getMCCIData(this.srcString, code).subscribe((res) => {
      console.log('res => ')
      console.log(res)
      if (res && res[0] && res[0].result && res[0].result.length > 0) {
        this.querySearched = true;
        this.mccData = res[0].result;
        this.showPagination = this.mccData.length > 6 ? true : false;
        this.loadItems();
        this.store.dispatch(loadAction.stopLoading());
      }
    }
    );
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
    this.sourceType.forEach((row) => {
      if (row.code === code) {
        row.checked = val;
      } else {
        row.checked = false;
      }
    });
    if (val) {
      this.selectedSourceTypeArray.push(code);
      this.sourceType.forEach((row) => {
        if (row.code === code) {
          row.disable = false;
        } else {
          row.checked = false;
          row.disable = true;
        }
      });
    } else {
      this.selectedSourceTypeArray = this.selectedSourceTypeArray.filter(
        (rowCode) => rowCode !== code
      );
      this.sourceType.forEach((chckBox) => (chckBox.disable = false));
    }
    this.clearSearchText();
  }

  valuechange(newValue) {
    const mymodel = newValue;
    const hello = Observable.create((observer) => {
      observer.next(newValue);
    });
    hello
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((query) => this.mccFinderService.getMCCIData(query, "N"))
      )
      .subscribe((i) => {
        if (i && i[0] && i[0].result && i[0].result.length > 0) {
          this.querySearched = true;
          this.mccData = i[0].result;
          this.loadItems();
          // this.store.dispatch(loadAction.stopLoading());
        }
      });
  }

  // Clear text in input box
  clearSearchText(): void {
    this.mccData = [];
    // this.srcString = null;
    this.querySearched = false;
  }

  // Show notiifcation
  showNotification(data: any): void {
    this.notificationMsg = data.msgDescription;
    this.notificationService.show({
      content: this.notificationMsg,
      position: { horizontal: "center", vertical: "top" },
      animation: { type: "fade", duration: 800 },
      type: { style: data.msgType, icon: true },
      closable: true,
    });
  }
}
