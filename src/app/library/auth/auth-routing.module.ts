import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPaswordComponent } from './forget-pasword/forget-pasword.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes :Routes=[
  {path:"", component:LoginComponent},
  {path:"forgetPassword", component:ForgetPaswordComponent},
  {path:"resetPassword", component:ResetPasswordComponent},
  

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AuthRoutingModule { }
