import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  products:any

  constructor(private product:ProductService) { }

  ngOnInit() {
    this.getDetails()
  
  }
  getDetails(){

    this.product.listProduct().subscribe(res => {
      this.products = res;
      console.log("products",this.products);
    });
  }
  }


