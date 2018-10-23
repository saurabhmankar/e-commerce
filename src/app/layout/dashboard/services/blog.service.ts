import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  BaseUrl=environment.baseUrl;

  
  constructor(private http :HttpClient) { }
  

  addBlog(data:any):Observable<any>{
  return this.http.post(this.BaseUrl+"/addBlog",data);

  }

  listBlog():Observable<any>{
    return this
    .http
    .get(this.BaseUrl+'/listBlog')
  }
  listBlogById(id):Observable<any>{
    console.log("Id at service:"+id);
    return this
    .http
    .get(this.BaseUrl+'/listBlogById?id='+id);
  }

  editBlog(data, id): Observable<any>{
    console.log("Id at edit function:"+id)
 
    return this
      .http
      .put(this.BaseUrl+'/editBlog/' + id,data);
      
  }

  delete(id) {
    return this
      .http
      .delete(this.BaseUrl+'/deleteBlog/' + id)


  }
  
  addComment(data:any):Observable<any>{
    return this.http.post(this.BaseUrl+"/api/addComment/",data);

}
listComment(id):Observable<any>{
  console.log("Id at service:"+id);
  return this
  .http
  .get(this.BaseUrl+'/api/listComment?id='+id);
}


}



