import { ServicesRoutingModule } from './services-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharityComponent } from './charity/charity.component';
import { FaqComponent } from './faq/faq.component';
import { PatnerComponent } from './patner/patner.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefferalComponent } from './refferal/refferal.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesRoutingModule
  ],
  declarations: [CharityComponent, FaqComponent, PatnerComponent, PrivacyPolicyComponent, RefferalComponent]
})
export class ServicesModule { }
