import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserdashboardComponent} from './userdashboard.component'
import{UserdashboardRoutingModule} from './userdashboard-routing.module';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { ShowblogsComponent } from './components/showblogs/showblogs.component'
import { ProductService } from '../dashboard/services/product.service';
import { BlogService } from '../dashboard/services/blog.service';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { BlogdetailComponent } from './components/blogdetail/blogdetail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  imports: [
    CommonModule,UserdashboardRoutingModule,CardModule,RatingModule,ReactiveFormsModule,FormsModule,ToastrModule
  ],
  declarations: [UserdashboardComponent, ShowproductsComponent, ShowblogsComponent, BlogdetailComponent, CartComponent],
  providers:[ProductService,BlogService]
})
export class UserdashboardModule { 
  
}
