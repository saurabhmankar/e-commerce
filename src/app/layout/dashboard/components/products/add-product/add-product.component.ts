import { Router } from '@angular/router';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
fileToUpload: File = null;
imageUrl:String="/assests/images/backg.jpg"
productForm:FormGroup
  constructor(private product:ProductService,private router:Router) { }
ngOnInit(){
  this.productForm = new FormGroup({
    "name": new FormControl('',[Validators.required]),
    "description": new FormControl('',[Validators.required]),
    "p_cost": new FormControl('',[Validators.required]),
    "s_cost": new FormControl('',[Validators.required]),
    "status":new FormControl('',[Validators.required]),
    // "confirm_password": new FormControl(''),

  })

}
handleFileInput(file:FileList){
  this.fileToUpload =file.item(0);

  //show image preview
  var reader=new FileReader();
  reader.onload=(event:any)=>{
    this.imageUrl=event.target.result;

  }
  reader.readAsDataURL(this.fileToUpload);
}
onSubmit() {
  console.log(this.productForm.value);
  this.product.addProduct(this.productForm.value)
    .subscribe((res: any) => {
      res = res.data;
      console.log("response :: ", res);
      this.productForm.reset();
      alert("Product added Successfully!");
      

    })

}
}
