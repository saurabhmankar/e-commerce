import { Router } from '@angular/router';
import { AuthService } from './../../../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
  
})
export class HomeComponent implements OnInit {
  loginForm:FormGroup
  modalRef: BsModalRef;
  constructor(private Toast: MessageService,private modalService: BsModalService, private auth:AuthService,private router:Router) {}


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
  test() {
    console.log("Test Calling")
    this.Toast.add({severity:'success', detail:'Test Successful'});
}
success() {
  console.log("Success Calling")
  this.Toast.add({severity:'success', detail:'Login Successful'});
}

warning() {
    this.Toast.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
                                {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
}

clear() {
    this.Toast.clear();
}



  onLogin(){
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(res =>{
      var user=res[0].first_name;//get token here...
     localStorage.setItem('token',user);
     this.success();
     if(localStorage){
       this.router.navigate(['/dashboard'])
     }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
