import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';

const routes :Routes =[
  {path:'', component:DashboardComponent},
  {path:'addProduct', component:AddProductComponent},
  {path:'edit/:id', component:EditProductComponent},
  {path:'listProduct', component:ListProductComponent},
  {path:'addUsers', component:AddUsersComponent},
  {path:'editUsers/:id', component:EditUsersComponent},
  {path:'listUsers', component:ListUsersComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutigModule { }
