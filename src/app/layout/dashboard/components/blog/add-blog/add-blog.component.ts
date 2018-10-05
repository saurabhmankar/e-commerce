import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
 import { ElementRef, ViewChild} from '@angular/core';
 import {FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions } from 'croppie';

 

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit{
  BlogForm: FormGroup;
  loading: boolean = false;
  fileToUpload: File = null;
//  imageUrl:String="/assets/images/blogImages/backg.jpg"

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

  widthPx = '200';
  heightPx = '200';
  imageUrl = '';
  currentImage: string;
  croppieImage: string;
  constructor(private fb: FormBuilder,private blog:BlogService,private router:Router) {
    this.createForm();
  }
  public get imageToDisplay() {
    if (this.currentImage) { return this.currentImage; }
    if (this.imageUrl) { return this.imageUrl; }
    return `http://placehold.it/${this.widthPx}x${this.heightPx}`;
  }
  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }
  ngOnInit() {
    this.currentImage = this.imageUrl;
    this.croppieImage = this.imageUrl;
  }

  // handleFileInput(file:FileList){
  //     this.fileToUpload =file.item(0);
  //     console.log(this.fileToUpload);
    
  //     //show image preview
  //     var reader=new FileReader();
  //     reader.onload=(event:any)=>{
  //       this.imageUrl=event.target.result;
         
        
    
  //     }
  //     reader.onloadend = (loadEvent) => {
  //       this.croppieImage = reader.result;
  //     };
  //     reader.readAsDataURL(this.fileToUpload);
    
  //         reader.readAsDataURL(this.fileToUpload);
  //         console.log("Image:"+this.fileToUpload.name);
  //         this.BlogForm.get('BlogImage').setValue(this.fileToUpload);
        
  //   }

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
  ngOnChanges(changes: any) {
    if (this.croppieImage) { return; }
    if (!changes.imageUrl) { return; }
    if (!changes.imageUrl.previousValue && changes.imageUrl.currentValue) {
      this.croppieImage = changes.imageUrl.currentValue;
    
    }
  }


  // modalOpened() {
  //   if (this.croppieImage) {
  //     console.log('binding image to croppie');
  //     this.ngxCroppie.bind();
  //   }
  // }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
  }

  saveImageFromCroppie() {
    this.currentImage = this.croppieImage;
  }

  cancelCroppieEdit() {
    this.croppieImage = this.currentImage;
  }



  imageUploadEvent(evt: any) {
    if (!evt.target) { return; }
    if (!evt.target.files) { return; }
    if (evt.target.files.length !== 1) { return; }
    const file = evt.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') { return; }
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      this.croppieImage = fr.result;
    };
    fr.readAsDataURL(file);
    this.BlogForm.get('BlogImage').setValue(file);
  }

}
