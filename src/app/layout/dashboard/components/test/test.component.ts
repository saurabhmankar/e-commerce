import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testForm: FormGroup;

  constructor(private router:Router,private users:UsersService) { }

  ngOnInit() {
    this.testForm = new FormGroup({
      "que": new FormControl('',[ 
        Validators.required]),
      "option1": new FormControl('',[ 
        Validators.required]),
        "option2": new FormControl('',[ 
          Validators.required]),
      "option3": new FormControl('',[ 
        Validators.required]),
        "option4": new FormControl('',[ 
          Validators.required]),
        "ans": new FormControl('',[ 
          Validators.required])
  
      // "confirm_password": new FormControl(''),
  
    })
  }
  onSubmit() {
    console.log(this.testForm.value);
    this.users.addQue(this.testForm.value)
      .subscribe((res: any) => {
        // res = res.data;
        console.log("Test Question res:", res);
        this.testForm.reset();
      })
      // this.router.navigate(['/dashboard/listUsers']);
  }


}
