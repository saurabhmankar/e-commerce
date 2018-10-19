import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    return this.http.post("http://localhost:10010/addProduct", data);
  }

  listProduct(): Observable<any> {
    return this
      .http
      .get('http://localhost:10010/listProduct')
  }

  editProduct(data, id): Observable<any> {

    return this
      .http
      .put('http://localhost:10010/editProduct/' + id, data);

  }

  delete(id) {
    return this
      .http
      .delete('http://localhost:10010/deleteProduct/' + id)


  }
  addToCart(data: any): Observable<any> {
    return this.http.post("http://localhost:10010/addToCart", data);

  }

  listCart(id): Observable<any> {
    console.log("Id at service:" + id);
    return this
      .http
      .get('http://localhost:10010/listCart?id=' + id);
  }

  deleteCart(ids) {
    return this
      .http
      .post('http://localhost:10010/deleteFromCart', ids);


  }
  UpdateProductQuantity(item: any): Observable<any> {
    return this.http.post("http://localhost:10010/UpdateCart", item);
  }



  makeCharge(data: any): Observable<any> {
    return this.http.post("http://localhost:10010/makeCharge", data);
  }

}