import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AdminauthenticationService } from './adminauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGardService implements CanActivate{

  constructor(private router: Router,
    private authService: AdminauthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isAdminLoggedIn()){
        return true;
  
      }else{
        this.router.navigate(['adminLogin']);
      return false;
      }
  
    }
}
