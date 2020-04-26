import { OpportunityComponent } from './oppurtunity/opportunity.component';
import { MccContainerComponent } from './shared/components/mcc-container/mcc-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {path:'dashboard', component: DashboardComponent},
  {path:'mccfinder', component: MccContainerComponent},
  {path:'', component: OpportunityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
