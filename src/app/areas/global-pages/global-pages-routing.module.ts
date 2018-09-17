import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes :Routes =[
 {path:"",loadChildren:'./services/services.module#ServicesModule'}
]
@NgModule({
 imports: [
   CommonModule,
   RouterModule.forChild(routes)
 ],
 exports:[RouterModule],
  declarations: []
})
export class GlobalPagesRoutingModule { }
