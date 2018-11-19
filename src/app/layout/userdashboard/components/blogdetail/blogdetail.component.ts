import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../dashboard/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import {FormBuilder} from "@angular/forms";
import { resetApplicationState } from '@angular/core/src/render3/instructions';
import { resolve } from 'q';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {
  blogs:any;
  id:any;
  b:any;
  c:any;
  userid=localStorage.getItem("userid");
  commentList: any[]
  userList= new Array
  val1: number;
  blg= new Array
  msg:string
  rating:number
  

  constructor(private blog:BlogService,private route:ActivatedRoute) {
  
   }
   handleRate(event) {
    this.msg = "You have rated " + event.value;
    this.rating=event.value;
    console.log(this.msg);
}
handleCancel(event) {
  this.msg = "Rating Cancelled";
  console.log(this.msg);
}
   addComment(){
     console.log("Rating"+this.val1);
    var comment=document.getElementById("comment") as HTMLInputElement;
    var data={
      userid:this.userid,
      comment:comment.value,
      blogid:this.id,
      rating:this.rating
    }
    this.blog.addComment(data).subscribe(res=>{
      console.log(res);
      
    })
    console.log(data);
    this.getdata();
  }
  

  ngOnInit() {
    this.getdata();

  
    
  }
 getdata(){
  this.route.params.subscribe(params => {
    this.id = params["id"];
    this.blog.listBlogById(this.id).subscribe(res => {
      console.log(res);
      var blogs = res;
      this.b = blogs[0];
    console.log(this.b.BlogImage);
    



    });
    this.blog.listComment(this.id).subscribe(res => {
      console.log(res);
      this.commentList = res;
      for(var i=0;i<this.commentList.length;i++){

        this.userList.push(this.commentList[i].userid);
         this.commentList[i].name = this.userList[i].name

      }
      
      
    
    
      
    
    



    });
  });

 }
  

    
    
      

    
}