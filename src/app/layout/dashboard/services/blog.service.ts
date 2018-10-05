import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http :HttpClient) { }

  addBlog(data:any):Observable<any>{
  return this.http.post("http://localhost:10010/addBlog",data);

  }

  listBlog():Observable<any>{
    return this
    .http
    .get('http://localhost:10010/listBlog')
  }
  listBlogById(id):Observable<any>{
    console.log("Id at service:"+id);
    return this
    .http
    .get('http://localhost:10010/listBlogById?id='+id);
  }

  editBlog(data, id): Observable<any>{
    console.log("Id at edit function:"+id)
 
    return this
      .http
      .put('http://localhost:10010/editBlog/' + id,data);
      
  }

  delete(id) {
    return this
      .http
      .delete('http://localhost:10010/deleteBlog/' + id)


  }

}




