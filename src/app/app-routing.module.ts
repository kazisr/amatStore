import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminGardService } from './Services/admin-gard.service';
import { AuthGaurdService } from './Services/auth-gard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGaurdService]},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminDash', component: AdminDashComponent, canActivate:[AdminGardService] },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
