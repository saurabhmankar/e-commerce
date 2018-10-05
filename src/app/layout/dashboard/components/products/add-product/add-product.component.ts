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
// export class AddProductComponent implements OnInit {
// fileToUpload: File = null;
// imageUrl:String="/assests/images/backg.jpg"
// productForm:FormGroup
//   constructor(private product:ProductService,private router:Router) { }
// ngOnInit(){
//   this.productForm = new FormGroup({
//     "productImage": new FormControl(''),
//     "name": new FormControl('',[Validators.required]),
//     "description": new FormControl('',[Validators.required]),
//     "p_cost": new FormControl('',[Validators.required]),
//     "s_cost": new FormControl('',[Validators.required]),
//     "status":new FormControl('',[Validators.required]),
//     // "confirm_password": new FormControl(''),

//   })
  
  
// }
// handleFileInput(file:FileList){
//   this.fileToUpload =file.item(0);

//   //show image preview
//   var reader=new FileReader();
//   reader.onload=(event:any)=>{
//     this.imageUrl=event.target.result;

//   }
//       reader.readAsDataURL(this.fileToUpload);
//       console.log("Image:"+this.fileToUpload.name);
    
// }
// onSubmit() {
//   console.log(this.productForm.value);
//   console.log(this.fileToUpload);
//   this.product.addProduct(this.productForm.value)
//     .subscribe((res: any) => {
//       res = res.data;
//       console.log("response :: ", res);
//       this.productForm.reset();
//       alert("Product added Successfully!");
      

//     })

// }
// }
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

  // onFileChange(event) {
  //   if(event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     this.productForm.get('productImage').setValue(file);
  //   }
  // }

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

  // clearFile() {
  //   this.productForm.get('productImage').setValue(null);
  //   this.fileInput.nativeElement.value = '';
  // }


}