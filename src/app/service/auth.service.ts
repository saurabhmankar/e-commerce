import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'

// import { JwtHelper } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  BaseUrl=environment.baseUrl;

  constructor( private http :HttpClient) { }
  // public jwtHelper: JwtHelper

  signUp(data:any ): Observable<any> {
    console.log("data",data)
   return this.http.post(this.BaseUrl+'/register',data);
 }

 login(data:any):Observable<any>{
  // console.log("fbrhfbnj",data);
  return this.http.post(this.BaseUrl+'/login',data);
}

getToken() {
  return localStorage.getItem("token")
}
isAdminLoggednIn() {
  if(sessionStorage.getItem('role')=='admin'||sessionStorage.getItem('role')=='superadmin' && this.getToken() !== null){
  return true
  }else{
    return false
  }
}
isUserLoggednIn() {
  if(sessionStorage.getItem('role')=='user'||sessionStorage.getItem('role')=='superadmin' && this.getToken() !== null){
    return true
    }else{
      return false
    }
}
isLoggednIn() {
  return this.getToken() !== null;
}


 
}
