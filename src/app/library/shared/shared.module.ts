
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from './component/home/home.component';
import { GlobalHeaderComponent } from './component/global-header/global-header.component';
import { GlobalFooterComponent } from './component/global-footer/global-footer.component';
import { GlobalContentComponent } from './component/global-content/global-content.component';


@NgModule({
  imports: [
    CommonModule,
  
  ],
  declarations: [ GlobalHeaderComponent, GlobalFooterComponent, GlobalContentComponent]
})
export class SharedModule { }
