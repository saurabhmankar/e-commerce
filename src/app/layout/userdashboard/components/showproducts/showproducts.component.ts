import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  products:any

  constructor(private product:ProductService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getDetails()
  
  }
  showSuccess() {
    this.toastr.success('Check in Cart','Product Added Successfully');
  }
  getDetails(){

    this.product.listProduct().subscribe(res => {
      this.products = res;
      console.log("products",this.products);
    });
  }
  addtoCart(pid,pcost){
console.log("Pid:"+pid);
console.log("pcost:"+pcost);
var uid=localStorage.getItem("userid");
console.log("Uid:"+uid);
var product={
  productid:pid,
  userid:uid,
  productCost:pcost
}
this.product.addToCart(product)
    .subscribe((res: any) => {
      // res = res.data;
      console.log("response :: ", res);
      this.showSuccess();
      
    })
  


  }
  }


