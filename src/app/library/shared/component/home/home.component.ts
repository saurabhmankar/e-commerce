import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../layout/dashboard/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ToastrService, UsersService],

})
export class HomeComponent implements OnInit {
  loginForm: FormGroup
  ResetForm: FormGroup
  OtpForm: FormGroup
  resetPasswordForm: FormGroup
  modalRef: BsModalRef;
  display: boolean = false;

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private auth: AuthService,
    private router: Router,
    private userS: UsersService,
  ) { }


  ngOnInit() {
    this.loginForm = new FormGroup({

      "email": new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      "password": new FormControl('', [
        Validators.required])


    })
    this.ResetForm = new FormGroup({

      "email": new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    })
    this.OtpForm = new FormGroup({

      "otp": new FormControl('', [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    })

    this.resetPasswordForm = new FormGroup({

      "password": new FormControl('', [
        Validators.required,
      ]),
      "confirmPassword": new FormControl('', [
        Validators.required])

    })
  }
  showSuccess() {
    this.toastr.success('Login Successfull', 'Welcome to Dashboard');
  }

  // onSend() {
  //   console.log("Mail in Reset Form" + JSON.stringify(this.ResetForm.value));
  //   this.userS.checkUserMail(this.ResetForm.value).subscribe((res) => {
  //     this.modalRef.hide();
  //     console.log(res);

  //   })
  // }


  onLogin() {
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(res => {
      console.log("Response", res);
      var user = res.userData.first_name;
      var role = res.role;
      var userid = res.userData.roleid;
      let token = res.token;
      console.log(role);
      this.modalRef.hide();
      this.showSuccess();
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('userid', userid);
      var logintoken = localStorage.getItem("Token");
      console.log(logintoken);

      if (role == "user") {
        this.router.navigate(['/userdashboard/userdashboard'])

      } else if (role == "admin") {
        this.router.navigate(['/dashboard'])
      }
      else if (role == "superadmin") {
        this.showDialog();
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template2: TemplateRef<any>) {
    this.modalRef.hide();
    this.modalRef = this.modalService.show(template2);
  }

  openModal3(template3: TemplateRef<any>) {
    // this.modalRef.hide();
    console.log("Mail in Reset Form" + JSON.stringify(this.ResetForm.value));
    this.userS.checkUserMail(this.ResetForm.value).subscribe((res) => {
      this.modalRef.hide();
      console.log("Mail response",res.email);
      localStorage.setItem('email',res.email);
      this.modalRef = this.modalService.show(template3);
    })
  }

  openModal4(template4: TemplateRef<any>) {
    console.log(JSON.stringify(this.OtpForm.value));
    let item={
      otp:this.OtpForm.value.otp,
      email:localStorage.getItem('email')

    }
    this.userS.checkUserOtp(item).subscribe((res) => {
      this.modalRef.hide();
      console.log("OTP sent response", res);
      this.modalRef = this.modalService.show(template4);
      // console.log("email", res[0].email);
      // localStorage.setItem('email', res[0].email);

    })
  }


  showDialog() {
    this.display = true;
  }

  admin() {
    this.router.navigate(['/dashboard']);
    this.display = false;

  }

  user() {
    this.router.navigate(['/userdashboard/userdashboard'])
    this.display = false;
  }

  onOtp() {
    console.log(JSON.stringify(this.OtpForm.value));
    this.userS.checkUserOtp(this.OtpForm.value).subscribe((res) => {
      console.log("OTP sent response", res);
    })

  }

  onReset() {
    console.log("Form Value", this.resetPasswordForm.value);
    if (this.resetPasswordForm.value.password == this.resetPasswordForm.value.confirmPassword) {
      let item = {
        pwd: this.resetPasswordForm.value.password,
        email: localStorage.getItem('email')
      }
      this.userS.resetPassword(item).subscribe((res) => {
        console.log("OTP sent response", res);
        localStorage.clear();
        this.modalRef.hide();
      })
    }

  }


  onFinished(){
    console.log("Time is over");

    let item = {
      email : localStorage.getItem("email")
    }
    this.userS.deleteOtp(item).subscribe((res)=>{
      console.log("Response");

    })
  }

}
