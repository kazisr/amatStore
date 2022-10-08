import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: any;

  constructor(private http: HttpClient,private router: Router) { }

  authenticate(username:any, password:any) {

    console.log(username);
    console.log(password);

    let resourse = this.http.get("http://localhost:8080/user/find/"+username);
    resourse.subscribe((data)=> this.user=data);
    

    if(this.user!==null){
        
      if (username === this.user.userName && password === this.user.password) {
        sessionStorage.setItem('username', username)
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
    else{
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

  getUser(){
    let user = sessionStorage.getItem('username')
    if(user !== null){
      return user;
    }
    return !(user === null)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}