import { CharityComponent } from './charity/charity.component';
import { PatnerComponent } from './patner/patner.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefferalComponent } from './refferal/refferal.component';


 const routes :Routes =[
   {path:"faq",component:FaqComponent},
   {path:"privacyPolicy",component:PrivacyPolicyComponent},
   {path:"partner",component:PatnerComponent},
   {path:"charity",component:CharityComponent},
   {path:"refferal",component:RefferalComponent}
 ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class ServicesRoutingModule { }
