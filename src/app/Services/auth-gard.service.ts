import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {AdminauthenticationService} from './adminauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService,
              private adminAuth: AdminauthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else if (this.adminAuth.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }

  }

}
