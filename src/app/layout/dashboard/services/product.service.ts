import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../../environments/environment'

@Injectable()
export class ProductService {
  BaseUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    return this.http.post(this.BaseUrl+"/addProduct", data);
  }

  listProduct(): Observable<any> {
    return this
      .http
      .get(this.BaseUrl+'/listProduct')
  }

  editProduct(data, id): Observable<any> {

    return this
      .http
      .put(this.BaseUrl+'/editProduct/' + id, data);

  }

  delete(id) {
    return this
      .http
      .delete(this.BaseUrl+'/deleteProduct/' + id)


  }
  addToCart(data: any): Observable<any> {
    return this.http.post(this.BaseUrl+"/addToCart", data);

  }

  listCart(id): Observable<any> {
    console.log("Id at service:" + id);
    return this
      .http
      .get(this.BaseUrl+'/listCart?id=' + id);
  }

  deleteCart(ids) {
    return this
      .http
      .post(this.BaseUrl+'/deleteFromCart', ids);


  }
  UpdateProductQuantity(item: any): Observable<any> {
    return this.http.post(this.BaseUrl+"/UpdateCart", item);
  }



  makeCharge(data: any): Observable<any> {
    return this.http.post(this.BaseUrl+"/makeCharge", data);
  }

}