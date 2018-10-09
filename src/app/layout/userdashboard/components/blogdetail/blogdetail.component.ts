import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../dashboard/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {
  blogs:any;
  id:any;
  b:any;
  userid=localStorage.getItem("userid");
  

  constructor(private blog:BlogService,private route:ActivatedRoute) {
  
   }
   addComment(){
    var comment=document.getElementById("comment") as HTMLInputElement;
    var data={
      userid:this.userid,
      comment:comment.value,
      blogid:this.id
    }
    console.log(data);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.blog.listBlogById(this.id).subscribe(res => {
        console.log(res);
        var blogs = res;
        this.b = blogs[0];

  
      });
    });
    
  }
 
  

    
    
      

    
}