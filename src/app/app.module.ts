import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './root-store/app.reducers';
import { environment } from '../environments/environment';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule, ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { LayoutModule } from '@progress/kendo-angular-layout';

// Custom Components
import { OpportunityComponent } from './oppurtunity/opportunity.component';
import { OpportunityStepperComponent } from './components/opportunity-stepper/opportunity-stepper.component';
import { OpportunityHelperComponent } from './components/opportunity-helper/opportunity-helper.component';
import { BasicMerchantProfileComponent } from './components/basic-merchant-profile/basic-merchant-profile.component';
import { MerchantProcessingComponent } from './components/merchant-processing/merchant-processing.component';
import { MainContainerComponent } from './main-container/main-container.component';

// Custom Services
import { BasicMerchantProfileService } from '../app/components/basic-merchant-profile/basic-merchant-profile.service';

@NgModule({
  declarations: [
    AppComponent,    
    DashboardComponent,
    OpportunityComponent,
    OpportunityStepperComponent,
    OpportunityHelperComponent,
    BasicMerchantProfileComponent,
    MerchantProcessingComponent,
    MainContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    SharedModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    ComboBoxModule,
    PopupModule,
    DialogsModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    TooltipModule,
    LayoutModule
  ],
  providers: [
    BasicMerchantProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
