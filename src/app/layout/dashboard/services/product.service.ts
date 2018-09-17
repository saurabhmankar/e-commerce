import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http :HttpClient) { }

  addProduct(data:any):Observable<any>{
  return this.http.post("http://localhost:3000/api/addProduct",data);

  }

  listProduct():Observable<any>{
    return this
    .http
    .get('http://localhost:3000/api/listProduct')
  }

  editProduct(data, id): Observable<any>{
 
    return this
      .http
      .put('http://localhost:3000/api/edit/' + id,data);
      
  }

  delete(id) {
    return this
      .http
      .delete('http://localhost:3000/api/delete/' + id)


  }

}
