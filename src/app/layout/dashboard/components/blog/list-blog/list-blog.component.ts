import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';


@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {

  blogs:any;
  constructor(private blog:BlogService,private router :Router) { }

  ngOnInit() {
    this.getDetails()
  
      }
      getDetails(){
  
        this.blog.listBlog().subscribe(res => {
          this.blogs = res;
          console.log("Blog",this.blog);
        });
      }

      delete(id){
        this.blog.delete(id).subscribe(res => {
          console.log('Deleted');
          window.location.reload();
        });
        // this.router.navigate(['/dashboard/listBlog'])
      }
}

