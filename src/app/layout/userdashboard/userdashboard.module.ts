import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserdashboardComponent} from './userdashboard.component'
import{UserdashboardRoutingModule} from './userdashboard-routing.module';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { ShowblogsComponent } from './components/showblogs/showblogs.component'
import { ProductService } from '../dashboard/services/product.service';
import { BlogService } from '../dashboard/services/blog.service';
import {CardModule} from 'primeng/card';


@NgModule({
  imports: [
    CommonModule,UserdashboardRoutingModule,CardModule
  ],
  declarations: [UserdashboardComponent, ShowproductsComponent, ShowblogsComponent],
  providers:[ProductService,BlogService]
})
export class UserdashboardModule { 
  
}
