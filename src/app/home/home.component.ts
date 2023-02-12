import { HttpClient } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { User } from '../login/user';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  CartData:any;
  cartTota:any;
  cartTotalPrice:any;
  dta:any;
  price:any;
  qty:any;
  TotalPrice = 0;
  userFromDB:any;

  user:User = new User();


  constructor(private http:HttpClient,
              private router:Router,
              public loginservice: AuthenticationService,
              private _changeDetectorRef: ChangeDetectorRef,
              ) { }

  ngOnInit(): void {
    let resourse = this.http.get("http://localhost:8080/product/find/all");
    resourse.subscribe((data)=> this.products=data);

    resourse = this.http.get("http://localhost:8080/user/find/"+this.loginservice.getUser());
    resourse.subscribe((data)=> this.userFromDB=data);

    this.cartItems();
    this.totalPrice();
    let ttp = this.TotalPrice;

    this.cartToTal();
    this.cartToTalPrice();


  }

  cartToTal(){
    let cartTotalItem  = this.http.get("http://localhost:8080/cart/tota");
    cartTotalItem.subscribe((data)=> this.cartTota=data);
  }

  cartToTalPrice(){
    let cartTotalPrice  = this.http.get("http://localhost:8080/cart/totalPrice");
    cartTotalPrice.subscribe((data)=> this.cartTotalPrice=data);
  }


  pr = {
    "productId":0,
    "productName":"",
    "productImgUrl":"",
    "productPrice":"",
    "productAvailable":""

  };



   cartItems(){
    let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
    resourse.subscribe((data)=> this.CartData=data);
   }


  addToCart(pr:any){
    pr.productQuantity = 1;
    this.http.post<any>('http://localhost:8080/cart/product/add', pr).subscribe({
        next: data => {


        },
        error: error => {
            console.error('There was an error!  aay haaay', error);
        }
    })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully added to Cart',
      showConfirmButton: false,
      timer: 1500
    })

    this.cartItems();
    this.cartToTal();
    this.cartToTalPrice();
  }

  updateCart(pr:any){
    this.http.post<any>('http://localhost:8080/cart/product/add', pr).subscribe({
        next: data => {


        },
        error: error => {
            console.error('There was an error!  aay haaay', error);
        }
    })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully updated the Cart',
      showConfirmButton: false,
      timer: 1500
    })

    this.cartItems();
    this.cartToTal();
    this.cartToTalPrice();
    this._changeDetectorRef.detectChanges()
  }



  totalPrice(){
    let resourse = this.http.get("http://localhost:8080/cart/product/find/all");
    resourse.subscribe((data)=> this.CartData=data);


  }

  deleteCartDataByid(id:number){
    this.http.post<any>('http://localhost:8080/cart/product/delete/', id).subscribe({
      next: data => {

        console.log(id);

      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Successfully Deleted',
    showConfirmButton: false,
    timer: 1500
  })

 this.cartItems();
 this.cartToTal();
 this.cartToTalPrice();

 this._changeDetectorRef.detectChanges()
}

checkLogin() {
 if (this.cartTota>0) {
  if (this.loginservice.isUserLoggedIn()) {
    this.router.navigate(['/checkout'])
  } else {
    this.router.navigate(['/login'])
  }
}
else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Your cart is empty',
    showConfirmButton: false,
    timer: 1500
  })
}

 }



}
