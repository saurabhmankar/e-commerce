import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
// import { JwtHelper } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {

  constructor( private http :HttpClient) { }
  // public jwtHelper: JwtHelper

  signUp(data:any ): Observable<any> {
    console.log("data",data)
   return this.http.post('http://localhost:3000/api/signup',data);
 }

 login(data:any):Observable<any>{
  console.log("fbrhfbnj",data);
  return this.http.post('http://localhost:3000/api/login',data)
}

getToken() {
  return localStorage.getItem("token")
}
isLoggednIn() {
  return this.getToken() !== null;
}

 
}
