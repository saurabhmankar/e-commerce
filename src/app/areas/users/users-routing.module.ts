import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes:Routes = [
  {path:"",loadChildren:"./modules/dishes/dishes.module#DishesModule"},
 
]
 
@NgModule({
  exports:[RouterModule],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UsersRoutingModule { }
