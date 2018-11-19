import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../../layout/dashboard/services/users.service'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [UsersService]
})
export class ConfirmationComponent implements OnInit {
  emailID: any;
  constructor(private route: ActivatedRoute, private user: UsersService, private toastr: ToastrService,private router: Router) {


  }
  Confirm() {

    this.user.confirmMail(this.emailID).subscribe(res => {
    if(res){
      this.toastr.success("Email confirmed","");
      this.router.navigate(['/']);
    }
      console.log("MailId Confirmed");
    })
  }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.emailID = params["id"];
      console.log("Email ID", this.emailID);

    });
  }

}
