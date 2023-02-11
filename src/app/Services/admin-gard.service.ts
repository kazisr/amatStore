import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AdminauthenticationService} from './adminauthentication.service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGardService implements CanActivate{

  constructor(private router: Router,
              private authService: AdminauthenticationService,
              private userGuard: AuthenticationService) {
  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isAdminLoggedIn()) {
        return true;

      } else if (this.userGuard.isUserLoggedIn()) {
        this.router.navigate(['']);
        return false;
      } else {
        this.router.navigate(['adminLogin']);
        return false;
      }

    }
}
