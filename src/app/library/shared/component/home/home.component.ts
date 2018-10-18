import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {MessageService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService,ToastrService],
  
})
export class HomeComponent implements OnInit {
  loginForm:FormGroup
  modalRef: BsModalRef;
  display: boolean = false;
  constructor(private toastr: ToastrService,private modalService: BsModalService, private auth:AuthService,private router:Router) {}


  ngOnInit() {
    this.loginForm = new FormGroup({
      
      "email" : new FormControl('',[ 
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
    ]),
      "password" : new FormControl('',[ 
        Validators.required])
     
        
      })
  }
  showSuccess() {
    this.toastr.success('Login Successfull','Welcome to Dashboard');
  }
  


  onLogin(){
     console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(res =>{
      console.log("Response",res);
      var user=res.userData.first_name;
      var role=res.role;
      var userid=res._id;
      let token=res.token;
      console.log(role);
      this.modalRef.hide();
      this.showSuccess();
     localStorage.setItem('token',token);
     localStorage.setItem('user',user);
     localStorage.setItem('userid',userid);
     var logintoken=localStorage.getItem("Token");
     console.log(logintoken);
    
     if(role=="user"){
       this.router.navigate(['/userdashboard/userdashboard'])
      
     }else if(role=="admin"){
      this.router.navigate(['/dashboard']) 
     }
     else if(role=="superadmin"){
      this.showDialog();
     }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  showDialog() {
    this.display = true;
}

admin(){
  this.router.navigate(['/dashboard']);
  this.display = false;

}

user(){
       this.router.navigate(['/userdashboard/userdashboard'])
  this.display = false;
}
  

}
