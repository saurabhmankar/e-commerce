import { AuthGuardService } from './guard/auth-guard.service';

import { AuthInterceptorService } from './service/auth-interceptor.service';
import { AuthService } from './service/auth.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRouting } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './library/shared/component/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from '../../node_modules/primeng/toast';
import {MessageService} from '../../node_modules/primeng/api';
import { SharedModule } from './library/shared/shared.module';
import { CountdownModule } from "ngx-countdown";
import { ToastrModule } from 'ngx-toastr';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    ButtonModule,
    DialogModule,
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
    ToastModule,
  BrowserAnimationsModule,
  SharedModule,
    ToastrModule.forRoot(),
    CountdownModule,

    
  ],
  providers: [AuthService,AuthGuardService,MessageService,
  {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
