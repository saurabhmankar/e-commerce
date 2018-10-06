import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../dashboard/services/blog.service';

@Component({
  selector: 'app-showblogs',
  templateUrl: './showblogs.component.html',
  styleUrls: ['./showblogs.component.css']
})
export class ShowblogsComponent implements OnInit {
  blogs:any;
   count = 1;
   setColor(btn, color) {
      var property = document.getElementById(btn);
      if (this.count == 0) {
          property.style.backgroundColor = "white"
          this.count = 1;        
      }
      else {
          property.style.backgroundColor = "red"
          this.count = 0;
      }
  }

  constructor(private blog:BlogService) { }

  ngOnInit() {
      this.getDetails()
    
        }
        getDetails(){
    
          this.blog.listBlog().subscribe(res => {
            this.blogs = res;
            console.log("Blog",this.blog);
          });
        }
        openForm() {
          document.getElementById("myForm").style.display = "block";
      }
      
      closeForm() {
          document.getElementById("myForm").style.display = "none";
      }
        
  }


