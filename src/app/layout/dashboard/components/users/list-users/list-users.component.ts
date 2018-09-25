import { Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users:any;
  constructor(private user:UsersService,private router :Router) { }

  ngOnInit() {
    this.getDetails()
  
      }
      getDetails(){
  
        this.user.listUsers().subscribe(res => {
          this.users = res;
          console.log("users",this.users);
        });
      }

      delete(id){
        this.user.deleteUsers(id).subscribe(res => {
          //console.log('Deleted');
          this.router.navigate(['/dashboard/listUsers']);

        
          
        });
        
        
      }

}
