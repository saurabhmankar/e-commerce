import { AuthGuardService } from './guard/auth-guard.service';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './library/shared/component/home/home.component';
import {ConfirmationComponent} from './library/shared/component/confirmation/confirmation.component';

// import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "confirmation",
    component: ConfirmationComponent
  },
  
  {
    path: "SignUp",
    loadChildren: './library/auth/auth.module#AuthModule'
  },
  {
    path: "pages",
    loadChildren: './areas/global-pages/global-pages.module#GlobalPagesModule'
  },

  
  {
    path: 'dashboard',loadChildren:'./layout/layout.module#LayoutModule',canActivate: [AuthGuardService]
  },
  {
    path: 'userdashboard',loadChildren:'./layout/layout.module#LayoutModule',canActivateChild: [AuthGuardService]
  },
 

]

@NgModule({
  exports: [RouterModule],

  imports: [

    RouterModule.forRoot(routes)
  ]
})
export class AppRouting { }
