import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserdashboardComponent} from './userdashboard.component'
import {ShowblogsComponent} from '../userdashboard/components/showblogs/showblogs.component'
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { BlogdetailComponent } from './components/blogdetail/blogdetail.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path:'', component:UserdashboardComponent},
  {path:'showblogs', component:ShowblogsComponent},
  {path:'showproducts', component:ShowproductsComponent},
  {path:'readmore/:id', component:BlogdetailComponent},
  {path:'cart', component:CartComponent}
  // {path:'userdashboard', component:UserdashboardComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class UserdashboardRoutingModule { }
