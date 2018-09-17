import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
productForm:FormGroup
  constructor(private product:ProductService,private router:Router) { }
ngOnInit(){
  this.productForm = new FormGroup({
    "name": new FormControl(''),
    "consumer": new FormControl(''),
    "p_cost": new FormControl(''),
    "s_cost": new FormControl(''),
    "phone": new FormControl(''),
    "status":new FormControl(''),
    "date":new FormControl('')
    // "confirm_password": new FormControl(''),

  })

}
onSubmit() {
  console.log(this.productForm.value);
  this.product.addProduct(this.productForm.value)
    .subscribe((res: any) => {
      res = res.data;
      console.log("response :: ", res);
      this.productForm.reset();
      

    })

}
}
