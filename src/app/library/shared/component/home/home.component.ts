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
    if (this.auth.isLoggednIn()) {
      (document.getElementById('loginBtn') as HTMLElement).style.visibility = 'hidden';
      (document.getElementById('signUpBtn') as HTMLElement).style.visibility = 'hidden';

    }
    this.loginForm = new FormGroup({

      "email": new FormControl('', [
        Validators.required,
        Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
          + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
      ]),
      "password": new FormControl('', [
        Validators.required])


    })
    this.ResetForm = new FormGroup({

      "email": new FormControl('', [
        Validators.required,
        Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
          + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
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
      console.log("Response", res.userData.confirmMail);
      console.log("Response==========",res);
      if (res.msg == 'error') {
        this.toastr.error('Login Failed', 'Incorrect email or password');
        this.modalRef.hide();
      }
      else if (res.userData.confirmMail == true) {
        var user = res.userData.first_name;
        var role = res.role;
        sessionStorage.setItem('role', role);
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
      }
      else{
        this.toastr.warning("Please confirm your mail id","Aap ka din shubh ho");
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

      if (res.email == undefined) {
        // this.modalRef.hide();
        this.toastr.warning('', 'Please enter vailid email !');
      }
      else {
        this.modalRef.hide();
        console.log("Mail response", res.email);
        localStorage.setItem('email', res.email);
        this.toastr.success('Otp has been sent to your mail', 'Please check and enter otp within time limit !');

        this.modalRef = this.modalService.show(template3);
      }

    })
  }

  openModal4(template4: TemplateRef<any>) {
    console.log(JSON.stringify(this.OtpForm.value));
    let item = {
      otp: this.OtpForm.value.otp,
      email: localStorage.getItem('email')

    }
    this.userS.checkUserOtp(item).subscribe((res) => {

      if (res.length == 0) {
        this.modalRef.hide();
        this.toastr.warning('Invalid Email Entered !', 'Please enter vailid email !');

      }
      else {
        this.modalRef.hide();
        console.log("OTP sent response", res);
        this.modalRef = this.modalService.show(template4);
      }


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
        console.log("In Reset Password Response");
        if (res) {
          let item = {
            email: localStorage.getItem('email')
          }
          this.userS.deleteOtp(item).subscribe((data) => {
            console.log("OTP Delete Response", data);
          })
        }
        console.log("OTP sent response", res);
        this.modalRef.hide();
        localStorage.clear();
        this.toastr.success('Password Reset Successfully !', 'Please login again !');

      })
    }

  }


  onFinished() {
    console.log("Time is over");

    let item = {
      email: localStorage.getItem("email")
    }
    this.userS.deleteOtp(item).subscribe((res) => {
      console.log("Response", res);
      this.modalRef.hide();


    })
  }

}
