import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any

  constructor(private product: ProductService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getProductFromCart();
  }
  showSuccess() {
    this.toastr.success('Successfull!','Product Romoved From Cart');
  }

  getProductFromCart() {
    var userid = localStorage.getItem("userid");
    this.product.listCart(userid).subscribe(res => {
      console.log('Cart Response');
      this.carts = res;
      console.log(this.carts);
    })

  }
  
  Remove(cid) {
    console.log("UserId:" + cid);
    var ids = {
      productid: cid,
      userid: localStorage.getItem("userid")
    }
    this.product.deleteCart(ids).subscribe(res => {
      console.log(res);
      this.getProductFromCart();
      this.showSuccess();
    }

    )

  }
}
