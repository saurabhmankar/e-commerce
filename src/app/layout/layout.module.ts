import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from 'primeng/card';
import { EditProductComponent } from './dashboard/components/products/edit-product/edit-product.component';
import { ListProductComponent } from './dashboard/components/products/list-product/list-product.component';
import { ListUsersComponent } from './dashboard/components/users/list-users/list-users.component';
import { EditUsersComponent } from './dashboard/components/users/edit-users/edit-users.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
// import { AddProductComponnt } from './dashboard/components/products/add-product/add-product.component';

@NgModule({
  imports: [
    CommonModule,LayoutRoutingModule,TooltipModule,CardModule,
  ],
  declarations: []
})
export class LayoutModule { }
