import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  updateForm:FormGroup
  constructor(private product:ProductService,private router:Router,private route:ActivatedRoute ){ }
ngOnInit(){
  this.updateForm = new FormGroup({
    "name": new FormControl(''),
    "consumer": new FormControl(''),
    "p_cost": new FormControl(''),
    "s_cost": new FormControl(''),
    "status":new FormControl('')
    
    // "confirm_password": new FormControl(''),

  })

}
onUpdate() {
  this.route.params.subscribe(params => {
    this.product.editProduct(this.updateForm.value,params['id']).subscribe(res => {
      console.log("successfully edited");

    })

  });
  this.router.navigate(['/dashboard/listProduct'])
}
}
