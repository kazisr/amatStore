import { HttpClient } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ListFormat } from 'typescript';
import { AuthenticationService } from '../Services/authentication.service';
import Swal from 'sweetalert2';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {


  products: any;
  CartData:any;
  cartTota:any;
  cartTotalPrice:any;
  price:any;
  qty:any;
  userFromDB:any;
  newOrderId = 0;



  constructor(private http:HttpClient,
              private router:Router,
              public loginservice: AuthenticationService,
              private _changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.getUser();
    this.cartItems();
    this.totalPrice();
    this.cartToTal();
    this.cartToTalPrice();
    this.genOrderId();
  }

  getUser(){
    let resourse = this.http.get("http://localhost:8080/user/find/"+this.loginservice.getUser());
    resourse.subscribe((data)=> this.userFromDB=data);

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

  genOrderId(){
    let resourse = this.http.get("http://localhost:8080/orders/newOrderId");
    resourse.subscribe((data)=> this.newOrderId =Number((data.toString())));
    this._changeDetectorRef.detectChanges();
    // this.newOrderIdInt = Math.floor(Math.random()*100);
    // console.log("genOrderId");
    // console.log(this.newOrderIdInt);

  }


  placeOrder(order:any){
    console.log("aay haay");
    console.log(order.orderId);
    order.items = this.CartData;
    order.grossAmount = this.cartTotalPrice.toFixed(2);

    this.http.post<any>('http://localhost:8080/orders/add', order).subscribe({
        next: data => {


        },
        error: error => {
            console.error('There was an error!  aay haaay', error);

        }
    })

    this.http.post<any>('http://localhost:8080/cart/clear',"").subscribe({
      next: data => {
      },
      error: error => {
          console.error('There was an error!  aay haaay', error);
      }
  })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully placed the oder',
      showConfirmButton: false,
      timer: 1500
    })

    this.genOrderId();

    this.router.navigate([''])

  }


  order = {
    "orderId":11,
    "userFirstName":"",
    "userLastName":"",
    "userName":"",
    "userContactNumber":"",
    "userAddress":"",
    "city":"",
    "country":"",
    "zip":"",
    "paymentMethod":"",
    "items":ListFormat,
    "grossAmount":0,

  };

}
