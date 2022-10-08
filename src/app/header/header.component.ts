import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products: any;
  CartData:any;
  cartTota:any;
  cartTotalPrice:any;
  dta:any;
  price:any;
  qty:any;
  TotalPrice = 0;

  constructor(private http:HttpClient, private router:Router,public loginservice: AuthenticationService) { }

  ngOnInit(): void {
    this.cartItems();
    this.totalPrice();
    this.cartToTal();
    this.cartToTalPrice();
  }


  cartItems(){
    let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
    resourse.subscribe((data)=> this.CartData=data);
   }

   totalPrice(){
    let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
    resourse.subscribe((data)=> this.CartData=data);  
    

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
  if (this.loginservice.isUserLoggedIn()  ) {

    this.router.navigate(['/checkout'])
    
  } else
    this.router.navigate(['/login'])
}

}
