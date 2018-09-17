// import { DishesRouting } from './dishes.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbComponent } from './component/ab/ab.component';
import { AbcComponent } from './component/abc/abc.component';
import { AbcdComponent } from './component/abcd/abcd.component';
import {DishesRouting} from './dishes.routing';

@NgModule({
  imports: [
    CommonModule,
    DishesRouting,
    
  ],
  declarations: [AbComponent, AbcComponent, AbcdComponent]
})
export class DishesModule { }
