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
      var user=res[0].first_name;
      var role=res[0].role;
      var userid=res[0]._id;
      console.log(role);
      this.modalRef.hide();
      this.showSuccess();
     localStorage.setItem('token',user);
     localStorage.setItem('userid',userid);
     var logintoken=localStorage.getItem("Token");
     console.log(logintoken);
    
     if(role=="user"){
       this.router.navigate(['/userdashboard/userdashboard'])
      
     }else if(role=="admin"){
      this.router.navigate(['/dashboard']) 
     }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  

}
