import { DialogsModule } from '@progress/kendo-angular-dialog';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MccFinderComponent } from './components/mcc-finder/mcc-finder.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MccContainerComponent } from './components/mcc-container/mcc-container.component';
import { DropDownsModule , ComboBoxModule} from '@progress/kendo-angular-dropdowns';
import { AppShareDataService } from './service/AppShareData.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [HeaderComponent, MccFinderComponent, MccContainerComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule,
    ButtonsModule,
    ComboBoxModule,
    PopupModule,
    NotificationModule,
    TooltipModule,
    LayoutModule
  ],
  providers: [AppShareDataService],
  exports: [HeaderComponent, MccFinderComponent, MccContainerComponent, NavigationComponent,
    DialogsModule, GridModule, FormsModule, ReactiveFormsModule, ButtonsModule, InputsModule,
    DropDownsModule, ComboBoxModule, PopupModule, NotificationModule, TooltipModule, LayoutModule]
})
export class SharedModule { }
