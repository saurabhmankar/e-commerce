import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';


const routes: Routes = [
  {
    path: '',
   loadChildren: './dashboard/dashboard.module#DashboardModule' }
      
  ,
  {
    path: 'userdashboard',
   loadChildren: './userdashboard/userdashboard.module#UserdashboardModule' }
      
  

]
@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class LayoutRoutingModule { }
