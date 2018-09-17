import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";

@Injectable()
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
  
    var token = localStorage.getItem(token);
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
    return next.handle(authRequest);
  
  }

}
