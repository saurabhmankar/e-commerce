import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../service/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPaswordComponent } from './forget-pasword/forget-pasword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers:[AuthService],
  declarations: [LoginComponent, ForgetPaswordComponent, ResetPasswordComponent]
})
export class AuthModule { }
