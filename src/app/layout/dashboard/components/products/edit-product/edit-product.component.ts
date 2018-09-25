import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { FormGroup, FormControl,Validators} from '@angular/forms';
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
    "name": new FormControl('',[Validators.required]),
    "description": new FormControl('',[Validators.required]),
    "p_cost": new FormControl('',[Validators.required]),
    "s_cost": new FormControl('',[Validators.required]),
    "status":new FormControl('',[Validators.required])
    
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
