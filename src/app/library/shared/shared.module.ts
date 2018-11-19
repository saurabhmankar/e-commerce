
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from './component/home/home.component';
import { GlobalHeaderComponent } from './component/global-header/global-header.component';
import { GlobalFooterComponent } from './component/global-footer/global-footer.component';
import { GlobalContentComponent } from './component/global-content/global-content.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
// import { CountdownTimerModule } from 'ngx-countdown-timer';


@NgModule({
  imports: [
    CommonModule,
    // CountdownTimerModule.forRoot()

  
  ],
  declarations: [ GlobalHeaderComponent, GlobalFooterComponent, GlobalContentComponent, ConfirmationComponent]
})
export class SharedModule { }
