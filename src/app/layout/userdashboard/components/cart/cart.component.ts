import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  carts: any;
  quantityCount: number = 1;
  quantity: number;
  total:number=0;
  



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
      console.log('Cart Response',res);
      if(res.length==0){
      let  btn = document.getElementById("checkout") as HTMLButtonElement;
      let tcost =document.getElementById("tcost") as HTMLElement;
      let emptyCart =document.getElementById("emptyCart") as HTMLElement;


        console.log("getting [] in response");
        btn.style.visibility='hidden';
        tcost.style.visibility='hidden';
        emptyCart.style.visibility='visible';
        
      }
      this.carts = res;
      // this.carts.forEach((value,index)=> {
      //   this.total=+this.carts[index].totalCost;
      
      // });
      
      this.total=0;
      this.carts.forEach(element => {
        this.total=this.total+element.totalCost;
      });
      
    
      console.log("Total Cost of all Product in cart is"+this.total);
      
      
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
