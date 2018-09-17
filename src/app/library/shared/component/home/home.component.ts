import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm:FormGroup
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private auth:AuthService,private router:Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      
      "email_address" : new FormControl('',[ 
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
    ]),
      "Password" : new FormControl('',),
     
        
      })
  }

  onLogin(){
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(res =>{
      var token=res;
     localStorage.setItem('token',token);
     if(localStorage){
       this.router.navigate(['/dashboard'])
     }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
