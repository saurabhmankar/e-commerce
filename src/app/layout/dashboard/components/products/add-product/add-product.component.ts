 import { Router } from '@angular/router';
 import { FormControl, FormGroup,Validators} from '@angular/forms';
 import { Component, OnInit } from '@angular/core';
 import { ProductService } from '../../../services/product.service';
 import { ElementRef, ViewChild} from '@angular/core';
 import {FormBuilder} from "@angular/forms";
 



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  productForm: FormGroup;
  loading: boolean = false;
  fileToUpload: File = null;
 imageUrl:String="/assets/images/backg.jpg"

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,private product:ProductService) {
    this.createForm();
  }
  handleFileInput(file:FileList){
      this.fileToUpload =file.item(0);
      console.log(this.fileToUpload);
    
      //show image preview
      var reader=new FileReader();
      reader.onload=(event:any)=>{
        this.imageUrl=event.target.result;
         
        
    
      }
          reader.readAsDataURL(this.fileToUpload);
          console.log("Image:"+this.fileToUpload.name);
          this.productForm.get('productImage').setValue(this.fileToUpload);
        
    }

  createForm() {
    this.productForm = this.fb.group({
      productImage: null,
      name: ['', Validators.required],
      description: ['', Validators.required],
      p_cost: ['', Validators.required],
      s_cost: ['', Validators.required],
      status: ['', Validators.required],
      
    });
  }


  private prepareSave(): any {
    let input = new FormData();
    input.append('productImage', this.productForm.get('productImage').value);
    input.append('name', this.productForm.get('name').value);
    input.append('description', this.productForm.get('description').value);
    input.append('p_cost', this.productForm.get('p_cost').value);
    input.append('s_cost', this.productForm.get('s_cost').value);
    input.append('status', this.productForm.get('status').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // this.http.post('apiUrl', formModel)
    console.log(formModel);
    this.product.addProduct(formModel)
    .subscribe((res: any) => {
      res = res.data;
      console.log("response :: ", res);
      alert("Product added Successfully!");
      
      

    })
    setTimeout(() => {
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  


}