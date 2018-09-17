import { UsersService } from './../../../services/users.service';
import { Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  userForm:FormGroup
  constructor(private product:ProductService,private router:Router,private users:UsersService
  ) { }
ngOnInit(){
  this.userForm = new FormGroup({
    "name": new FormControl(''),
    "lastname": new FormControl(''),
    "email": new FormControl(''),

    // "confirm_password": new FormControl(''),

  })

}
onSubmit() {
  console.log(this.userForm.value);
  this.users.addUsers(this.userForm.value)
    .subscribe((res: any) => {
      res = res.data;
      console.log("response :: ", res);
      this.userForm.reset();
      

    })

}
}
