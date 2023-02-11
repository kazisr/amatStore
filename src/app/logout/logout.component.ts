import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentocationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('logout component called')
    this.authentocationService.logOut();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Logged Out',
      showConfirmButton: false,
      timer: 1500
    })

    this.router.navigate(['']);
  }

}
