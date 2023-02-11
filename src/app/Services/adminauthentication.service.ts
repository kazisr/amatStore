import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminauthenticationService {
  user: any;
  userNameForSession:any;
  constructor(private http: HttpClient,private router: Router) { }

  adminAuthenticate(username:any, password:any) {

    console.log(username);
    console.log(password);

    let resourse = this.http.get("http://localhost:8080/admin/find/"+username);
    resourse.subscribe((data) => this.user = data);

    if(this.user!==null){

      if (username === this.user.userName && password === this.user.password) {
        sessionStorage.setItem('adminUsername', username)
        sessionStorage.setItem('author', 'admin')
        return true;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid Password',
          showConfirmButton: false,
          timer: 1500
        })
        return false;
      }
    }
    else {
      console.log("Null");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Username',
        showConfirmButton: false,
        timer: 1500
      })
      return false;
    }

  }

  getAdmin(){
    let user = sessionStorage.getItem('adminUsername')
    let author = sessionStorage.getItem('author')
    if(user !== null && author!==null){
      return user;
    }
    return !(user === null)
  }

  isAdminLoggedIn() {
    let user = sessionStorage.getItem('adminUsername')
    return !(user === null)
  }

  adminLogOut() {
    sessionStorage.removeItem('adminUsername');
  }

}
