import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import Swal from 'sweetalert2';
import { AdminauthenticationService } from '../Services/adminauthentication.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private http:HttpClient, private router:Router,
    public loginservice: AdminauthenticationService,) { }

  ngOnInit(): void {
    if(sessionStorage!==null){
      this.router.navigate(['/adminDash'])
    }
  }

  checkAdminLogin() {
    if (this.loginservice.adminAuthenticate(this.username, this.password)
    ) {
      Swal.fire({  
        position: 'center',  
        icon: 'success',  
        title: 'Successfully Logged In',  
        showConfirmButton: false,  
        timer: 1500  
      })  
      this.router.navigate(['adminDash'])
      

      this.invalidLogin = false
    } else{
      this.invalidLogin = true
    }
      
  }

}
