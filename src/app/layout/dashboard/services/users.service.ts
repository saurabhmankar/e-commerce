import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http :HttpClient) { }


  addUsers(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/api/addUsers",data);

  }
  listUsers():Observable<any>{
    return this.http.get("http://localhost:3000/api/listUsers");

  }
  deleteUsers(id):Observable<any>{
    console.log("fjrkf");
    return this.http.delete("http://localhost:3000/api/deleteUsers/"+id);

  }
  editUsers(data:any,id):Observable<any>{
    return this.http.put("http://localhost:3000/api/editUsers/"+id,data);

  }
}
