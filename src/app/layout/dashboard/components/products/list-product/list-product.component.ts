import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import {CardModule} from 'primeng/card';



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
products:any;
  constructor(private product:ProductService,private router :Router) { }

  ngOnInit() {
    this.getDetails()
  
      }
      getDetails(){
  
        this.product.listProduct().subscribe(res => {
          this.products = res;
          console.log("products",this.products);
        });
      }

      delete(id){
        this.product.delete(id).subscribe(res => {
          console.log('Deleted');
          window.location.reload();
       
        
        });
        
      }
}
