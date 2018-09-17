import { PackageImport } from './core/config/package.import';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DishesComponent } from './modules/components/dishes/dhes.component';



@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
      PackageImport
  ],
  //  exports:[ PackageImport],
  // declarations:[PackageImport]
})
export class UsersModule { }
