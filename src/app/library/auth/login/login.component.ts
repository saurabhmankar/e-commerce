import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registrationForm:FormGroup
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      "first_name": new FormControl('', [Validators.required, Validators.maxLength(15)]),
      "last_name": new FormControl('', [Validators.required, Validators.maxLength(15)]),
      "display_name": new FormControl('', [Validators.required, Validators.maxLength(20)]),
      "email": new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      "password": new FormControl('', Validators.required),
      // "confirm_password": new FormControl(''),

    })
  }

  onSubmit() {
   console.log(this.registrationForm.value)
   this.auth.signUp(this.registrationForm.value).subscribe(res =>{
     console.log("successully registered");
     this.registrationForm.reset();

   });
   this.router.navigate([''])

  }
  

}
