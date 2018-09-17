import { UsersService } from './../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  updateForm:FormGroup
constructor(private route:ActivatedRoute,private user:UsersService, private router: Router){}
  ngOnInit(){
  this.updateForm = new FormGroup({
    "name": new FormControl(''),
    "lastname": new FormControl(''),
    "email": new FormControl(''),
   
    // "confirm_password": new FormControl(''),

  })

}
onUpdate() {
  this.route.params.subscribe(params => {
    console.log(this.updateForm.value)
    this.user.editUsers(this.updateForm.value,params['id']).subscribe(res => {
      console.log("successfully edited");

    })

  });
  this.router.navigate(['/dashboard/listUsers'])
}
}
