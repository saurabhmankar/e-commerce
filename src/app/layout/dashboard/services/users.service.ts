import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class UsersService {

  constructor(private http :HttpClient, private router: Router) { }


  addUsers(data:any):Observable<any>{
    return this.http.post("http://localhost:10010/addUsers",data);

  }
  listUsers():Observable<any>{
    return this.http.get("http://localhost:10010/listUsers");

  }
  deleteUsers(id):Observable<any>{
    console.log("fjrkf");
    console.log(id);
    return this.http.delete("http://localhost:10010/deleteUsers/"+id);


  }
  editUsers(data:any,id):Observable<any>{
    console.log("Id:"+id);
    //data._id=id;
    return this.http.put("http://localhost:10010/editUsers/"+id,data);

  }
}
