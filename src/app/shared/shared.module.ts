import { TooltipModule } from '@progress/kendo-angular-tooltip';
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
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ShareDataService } from './service/shareData.service ';

@NgModule({
  declarations: [HeaderComponent, MccFinderComponent, MccContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  providers: [ShareDataService],
  exports: [HeaderComponent, MccFinderComponent, MccContainerComponent]
})
export class SharedModule { }
