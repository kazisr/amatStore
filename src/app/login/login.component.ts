import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { User } from '../login/user';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();

  username = ''
  password = ''
  invalidLogin = false


  products: any;
  CartData:any;
  cartTota:any;
  cartTotalPrice:any;
  dta:any;
  price:any;
  qty:any;
  TotalPrice = 0;

  constructor(private router: Router,
    public loginservice: AuthenticationService, private http:HttpClient) { }

  ngOnInit() {
    this.cartItems();
    this.totalPrice();
    this.cartToTal();
    this.cartToTalPrice();
    if (sessionStorage.getItem('username')) {
      this.router.navigate(['/checkout'])
    }
  }


  cartItems(){
    let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
    resourse.subscribe((data)=> this.CartData=data);
   }

   totalPrice() {
     let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
     resourse.subscribe((data) => this.CartData = data);


   }

  cartToTal(){
    let cartTotalItem  = this.http.get("http://localhost:8080/cart/tota");
    cartTotalItem.subscribe((data)=> this.cartTota=data);
  }

  cartToTalPrice(){
    let cartTotalPrice  = this.http.get("http://localhost:8080/cart/totalPrice");
    cartTotalPrice.subscribe((data)=> this.cartTotalPrice=data);
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully Logged In',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/checkout'])


      this.invalidLogin = false
    } else{
      this.invalidLogin = true
    }

  }


  addUser(user:any){
    this.username = this.userData.userName;
    this.password = this.userData.password;
    sessionStorage.setItem('username', this.userData.userName)

    let resource = this.http.post<any>('http://localhost:8080/user/add', user).subscribe({
      next: data => {


      },
      error: error => {
        console.error('There was an error!  aay haaay', error);

      }
    })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Account creation successfull',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/checkout'])

  }


  userData = {
    "userName":"",
    "password":"",
    "userEmail":"",
    "userAddress":"",
    "userFirstName":"",
    "userLastName":"",
    "userContactNumber":"",

  }
}
