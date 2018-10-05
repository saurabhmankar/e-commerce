import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { DashboardRoutigModule } from './dashboard-routig.module';
import { DashboardComponent } from './dashboard.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import{ListBlogComponent} from './components/blog/list-blog/list-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { ProductService } from './services/product.service';
import { UsersService } from './services/users.service';
import {TooltipModule} from 'primeng/tooltip';
import { BlogService } from './services/blog.service';
import {CardModule} from 'primeng/card';
import { NgxCroppieModule } from 'ngx-croppie';
import {EditorModule} from 'primeng/editor';






@NgModule({
  imports: [
    CommonModule,DashboardRoutigModule,ReactiveFormsModule,FormsModule,TooltipModule,CardModule,NgxCroppieModule,EditorModule],
    providers:[ProductService,UsersService,BlogService],
  declarations: [DashboardComponent,AddProductComponent,AddUsersComponent,EditProductComponent, ListProductComponent,ListUsersComponent, EditUsersComponent,AddBlogComponent,ListBlogComponent,EditBlogComponent]
})
export class DashboardModule { }
