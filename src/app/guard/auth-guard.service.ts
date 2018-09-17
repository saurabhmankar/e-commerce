import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggednIn()){
      return true;
    }else{
      this.router.navigate([""]);
      return false;
    }
  }
}




  

