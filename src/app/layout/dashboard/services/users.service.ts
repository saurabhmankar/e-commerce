import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from '../../../../environments/environment'

@Injectable()
export class UsersService {
  

  constructor(private http :HttpClient, private router: Router) { }
 BaseUrl=environment.baseUrl;
 
  addUsers(data:any):Observable<any>{
    return this.http.post(this.BaseUrl+"/addUsers",data);

  }
  listUsers():Observable<any>{
    return this.http.get(this.BaseUrl+"/listUsers");

  }
  deleteUsers(id):Observable<any>{
    console.log("fjrkf");
    console.log(id);
    return this.http.delete(this.BaseUrl+"/deleteUsers/"+id);


  }
  editUsers(data:any,id):Observable<any>{
    console.log("Id:"+id);
    //data._id=id;
    return this.http.put(this.BaseUrl+"/editUsers/"+id,data);

  }

  checkUserMail(data):Observable<any>{
    console.log("email address",data);
    return this.http.post(this.BaseUrl+'/checkUser',data);
    
  }

  checkUserOtp(data):Observable<any>{
    console.log("OTP",data);
    return this.http.post(this.BaseUrl+'/checkUserOtp',data);
  }

  resetPassword(data):Observable<any>{
    return this.http.post(this.BaseUrl+'/resetPassword',data);

  }

  deleteOtp(data):Observable<any>{
    return this.http.post(this.BaseUrl+'/deleteOtp',data);

  }
  confirmMail(data):Observable<any>{
    console.log("Confirm data",data);
    return this.http.get(this.BaseUrl+'/confirmMail/'+data);

  }
}