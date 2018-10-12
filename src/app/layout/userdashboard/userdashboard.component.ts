import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../dashboard/services/product.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
carts:any;
len:any;

  constructor(private router:Router,private toastr: ToastrService,private product:ProductService) { }

  ngOnInit() {
    this.getProductFromCart();
  

 
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/dashboard']);
  this.showSuccess();
  
  }
  showSuccess() {
    this.toastr.success('Logout Successfull','Please Login again');
  }
  getProductFromCart(){
    var userid=localStorage.getItem("userid");
    this.product.listCart(userid).subscribe(res => {
      console.log('Cart Response');
      this.carts=res;
      console.log(this.carts);
      var len=this.carts.length;
      console.log(`Cart contain`+len+'Products');
  })
}
}
