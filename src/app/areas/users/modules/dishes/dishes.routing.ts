import { AbComponent } from './component/ab/ab.component';

import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { AbcComponent } from './component/abc/abc.component';
import { AbcdComponent } from './component/abcd/abcd.component';


const routes:Routes = [
    {path:"",component:AbComponent},
    {path:"abc",component:AbcComponent},
    {path:"abcd",component:AbcdComponent}

   
   
   
]
@NgModule({
    exports:[RouterModule],
    imports:[RouterModule.forChild(routes)]
})
export class DishesRouting {}