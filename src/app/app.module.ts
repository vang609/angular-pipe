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
// Custom Components
import { OpportunityComponent } from './opportunity/opportunity.component';
import { OpportunityStepperComponent } from './components/opportunity-stepper/opportunity-stepper.component';
import { OpportunityHelperComponent } from './components/opportunity-helper/opportunity-helper.component';
import { BasicMerchantProfileComponent } from './components/basic-merchant-profile/basic-merchant-profile.component';
import { MerchantProcessingComponent } from './components/merchant-processing/merchant-processing.component';

// Custom Services
import { BasicMerchantProfileService } from '../app/components/basic-merchant-profile/basic-merchant-profile.service';
import { MerchantProcessingService } from '../app/components/merchant-processing/merchant-processing.service';
import { AccountFeaturesComponent } from './modules/proposal/account-features/account-features.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OpportunityComponent,
    OpportunityStepperComponent,
    OpportunityHelperComponent,
    BasicMerchantProfileComponent,
    MerchantProcessingComponent,
    AccountFeaturesComponent
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
    SharedModule
  
  ],
  providers: [
    BasicMerchantProfileService,
    MerchantProcessingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
