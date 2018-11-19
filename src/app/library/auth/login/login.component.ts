import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      "first_name": new FormControl('', [Validators.required, Validators.maxLength(15)]),
      "last_name": new FormControl('', [Validators.required, Validators.maxLength(15)]),
      "display_name": new FormControl('', [Validators.required, Validators.maxLength(20)]),
      "email": new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
      + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")])),
      "password": new FormControl('', Validators.required),
      // "confirm_password": new FormControl(''),

    })
  }
  showSuccess() {
    this.toastr.success('Registration Successfull', 'you can login again now.');
  }
  showWarning() {
    this.toastr.error('Registration Failed', 'User with same email id already exist');
  }
  onSubmit() {
    console.log(this.registrationForm.value)
    let form = this.registrationForm.value;
  
    if(form.first_name.trim()==""|| form.last_name.trim()=="",form.display_name.trim()==""){
      this.toastr.warning("Space not allowed","Chutiya space mat daal")
    }
    else{
      this.auth.signUp(this.registrationForm.value).subscribe(res => {
        //  console.log("successully registered");
        console.log("Response of Reg:", res);
        console.log(res.status);
        this.registrationForm.reset();
  
        if (res.status == '200') {
          this.showSuccess();
          this.router.navigate([''])
        }
        if(res.status == '400') {
          console.log("In error")
          this.showWarning();
        }
  
  
      });
    }

  }


}
