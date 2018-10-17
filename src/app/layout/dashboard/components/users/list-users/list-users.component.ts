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
  roles:any;
  constructor(private user:UsersService,private router :Router) { }

  ngOnInit() {
    this.getDetails()
  
      }
      getDetails(){
  
        this.user.listUsers().subscribe(res => {
          this.users = res.userData;
          this.roles= res.role;
        
          
          console.log("users",this.users);
          console.log("Roles",this.roles);

          // console.log(this.users.role[0].role);
        });
      }

      delete(id){
        this.user.deleteUsers(id).subscribe(res => {
          //console.log('Deleted');
          this.getDetails();
          // this.router.navigate(['/dashboard/listUsers']);
        });
        
        
      }

}
