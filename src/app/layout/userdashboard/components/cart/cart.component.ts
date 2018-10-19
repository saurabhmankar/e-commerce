import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any;
  quantityCount: number = 1;
  quantity: number;


  constructor(private router:Router,private product: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getProductFromCart();
  }
  showSuccess() {
    this.toastr.success('Successfull!', 'Product Romoved From Cart');
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


  IncreaseQuantity(productId,quantity){
    console.log(productId,quantity);
    let item = {
      productid : productId ,
      userid : localStorage.getItem('userid'),
      quantity : quantity + 1
    } 
    console.log(item);
    this.product.UpdateProductQuantity(item).subscribe(res => {
      this.getProductFromCart(); 
        console.log('Product Quantity Increased');
    });

  }

  DecreaseQuantity(cartId,productId,quantity){
    console.log(cartId,productId,quantity);
    let item = {
      productid : productId ,
      userid : localStorage.getItem('userid'),
      quantity : quantity - 1
    } 
    
    console.log(item);
    if(item.quantity == 0){
      console.log("CartId",cartId)
      this.Remove(cartId);
      console.log("Cart Deleted",cartId)

    }
    else {
      console.log("Quantity Greater a than 1")
      this.product.UpdateProductQuantity(item).subscribe(res => {
        console.log('Product Quantity Decreased');
        this.getProductFromCart();
        });
    }


  }
  
  

}
