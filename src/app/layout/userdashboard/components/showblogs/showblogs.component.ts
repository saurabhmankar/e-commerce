import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../dashboard/services/blog.service';

@Component({
  selector: 'app-showblogs',
  templateUrl: './showblogs.component.html',
  styleUrls: ['./showblogs.component.css']
})
export class ShowblogsComponent implements OnInit {
  blogs:any;

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
  
  }


