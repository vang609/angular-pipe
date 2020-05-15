import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { MccContainerComponent } from './shared/components/mcc-container/mcc-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicMerchantProfileComponent } from './components/basic-merchant-profile/basic-merchant-profile.component';
import { MerchantProcessingComponent } from './components/merchant-processing/merchant-processing.component';


const routes: Routes = [
  { path: 'mccfinder', component: MccContainerComponent },
  { path: 'opportunity', component: OpportunityComponent,
  children: [
    { path: '', component: BasicMerchantProfileComponent, outlet: 'form'},
    { path: 'basic-merchant-profile', component: BasicMerchantProfileComponent, outlet: 'form'},
    { path: 'merchant-processing', component: MerchantProcessingComponent, outlet: 'form' }]
  },
  { path: '',  redirectTo: 'opportunity', pathMatch: 'full'},
  { path: '**',  redirectTo: 'opportunity'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
