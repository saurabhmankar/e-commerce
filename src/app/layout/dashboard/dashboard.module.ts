import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { DashboardRoutigModule } from './dashboard-routig.module';
import { DashboardComponent } from './dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { ProductService } from './services/product.service';
import { UsersService } from './services/users.service';


@NgModule({
  imports: [
    CommonModule,DashboardRoutigModule,ReactiveFormsModule,FormsModule],
    providers:[ProductService,UsersService],
  declarations: [DashboardComponent,AddProductComponent,AddUsersComponent,EditProductComponent, ListProductComponent,ListUsersComponent, EditUsersComponent]
})
export class DashboardModule { }
