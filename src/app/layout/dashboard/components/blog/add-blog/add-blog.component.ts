import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
 import { ElementRef, ViewChild} from '@angular/core';
 import {FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent{
  BlogForm: FormGroup;
  loading: boolean = false;
  fileToUpload: File = null;
 imageUrl:String="/assets/images/blogImages/backg.jpg"

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,private blog:BlogService,private router:Router) {
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
          this.BlogForm.get('BlogImage').setValue(this.fileToUpload);
        
    }

  createForm() {
    this.BlogForm = this.fb.group({
      BlogImage: null,
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    
      
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
    input.append('BlogImage', this.BlogForm.get('BlogImage').value);
    input.append('title', this.BlogForm.get('title').value);
    input.append('description', this.BlogForm.get('description').value);
    input.append('date', this.BlogForm.get('date').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // this.http.post('apiUrl', formModel)
    console.log(formModel);
    this.blog.addBlog(formModel)
    .subscribe((res: any) => {
      res = res.data;
      console.log("response :: ", res);
      alert("Blog added Successfully!");
      

    })
    this.router.navigate(['/dashboard/listBlog']);

    setTimeout(() => {
      alert('done!');
      this.loading = false;
    }, 1000);




  }
}
